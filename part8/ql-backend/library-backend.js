const { ApolloServer, UserInputError, AuthenticationError, PubSub, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "hola"

const pubsub = new PubSub()

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = '[REDACTED]'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      const query = Book.find({})
      // TODO: args.author
      if (args.genre) {
        query.find({ genres: { $in: [args.genre] } })
      }
      return query.populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, { currentUser }) => currentUser
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const bookMatch = await Book.findOne({ title: args.title })
      if (bookMatch) {
        throw new UserInputError('Book already in the database', {
          invalidArgs: args,
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (author === null) {
        const authorDoc = new Author({ name: args.author, bookCount: 1 })
        try {
          author = await authorDoc.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        await Author.findOneAndUpdate({ name: args.author }, { bookCount: author.bookCount + 1 })
      }
      const bookDoc = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres
      })
      try {
        await bookDoc.save()
        const book = await bookDoc.populate('author').execPopulate()
        pubsub.publish('BOOK_ADDED', { bookAdded: book})
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
            invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      let author
      try {
        author = await Author.findOneAndUpdate({ name: args.name }, { born: args.born }, { new: true } )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: { 
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})