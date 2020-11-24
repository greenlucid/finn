const { mostBlogs } = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')
const blogs = [ 
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

test('Dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  const totalLikes = listHelper.totalLikes

  test('when blogs is empty, is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when blogs only has one blog, equals the likes of that blog', () => {
    expect(totalLikes([blogs[0]])).toBe(blogs[0].likes)
  })

  test('when blogs has more than one blog, is equal to the sum of their likes', () => {
    expect(totalLikes(blogs)).toBe(36) //Hardcoded
  })
})

describe('Favorite blog', () => {
  const favoriteBlog = listHelper.favoriteBlog

  test('when blogs is empty, is empty object', () => {
    expect(favoriteBlog([])).toEqual({})
  })

  test('when blogs only has one blog, equals that blog', () => {
    expect(favoriteBlog([blogs[0]])).toEqual({
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    })
  })

  test('when blogs has more than one blog, is {blog with more likes, author, likes}', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }) // Hardcoded
  })
})

describe('Most blogs', () => {
  const mostBlogs = listHelper.mostBlogs

  test('when blogs is empty, is empty object', () => {
    expect(mostBlogs([])).toEqual({})
  })

  test('when blogs has more than one blog, is {any author with max blogs, their blogs}', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    }) // Hardcoded
  })
})

describe('Most likes', () => {
  const mostLikes = listHelper.mostLikes

  test('when blogs is empty, is empty object', () => {
    expect(mostLikes([])).toEqual({})
  })

  test('when blogs has more than one blog, is {any author with max likes, their likes}', () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    }) // Hardcoded
  })
})