import React, { useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

const MY_FAVORITE_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`

const ALL_FAVORITE_GENRE_BOOKS = gql`
query favoriteGenreBooks($favoriteGenre: String!) {
  allBooks(genre: $favoriteGenre) {
    id
    title
    author {
      name
      born
      id
    }
    published
    genres
  }
}
`

const Recommend = ({ show, page }) => {

  const favGenreQuery = useQuery(MY_FAVORITE_GENRE)
  const [getFavBooks, favBooksQuery] = useLazyQuery(ALL_FAVORITE_GENRE_BOOKS)

  useEffect(() => {
    console.log(favGenreQuery, favBooksQuery)
    if (favGenreQuery.data && favGenreQuery.data.me.favoriteGenre) {
      console.log('success!')
      getFavBooks({ variables: { favoriteGenre: favGenreQuery.data.me.favoriteGenre } })
    }
  }, [favGenreQuery.data]) //eslint-disable-line

  useEffect(() => {
    if (page === 'recommend' && favGenreQuery.data && favGenreQuery.data.me.favoriteGenre) {
      favBooksQuery.refetch()
    }
  }, [page]) //eslint-disable-line

  if (!show) {
    return null
  }

  if (!favBooksQuery.data) {
    return <div>loading...</div>
  }
  
  const genre = favGenreQuery.data.me.favoriteGenre
  const books = favBooksQuery.data.allBooks

  return (
    <div>
      
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>author</b></td>
            <td><b>published</b></td>
          </tr>
          {books.map(book => 
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend