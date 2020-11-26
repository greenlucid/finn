const Blog = require('../models/blog')

const initialBlogs = [ 
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7},
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12},
  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10},
  { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0},
  { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2}
]

const newBlog = {
  title: 'Debunking Chocolate Correlation With Obesity',
  author: 'Willy Wonka',
  url: 'https://chocolate.factcheck.gov/20201125/Chocolate-Correlation-Obesity',
  likes: 9
}

const nonExistingId = async () => {
  const nonExtistingBlog = Blog({newBlog})
  await nonExtistingBlog.save()
  await nonExtistingBlog.remove()

  return nonExtistingBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const anyBlog = async () => {
  const blog = await Blog.findOne({})
  return blog.toJSON()
}

module.exports = {
  initialBlogs,
  newBlog,
  nonExistingId,
  blogsInDb,
  anyBlog
}