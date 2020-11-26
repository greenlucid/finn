const { isNull } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { favoriteBlog } = require('../utils/list_helper')
const helper = require('./blog_test_helper')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET', () => {
  test('to /api/blogs returns the correct amount of blogs', async () => {
    const response = 
      await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const blogList = response.body

    expect(blogList.length).toEqual(helper.initialBlogs.length)
  })

  test('to /api/blogs returns blogs with id properties and no _id', async () => {
    const response = await api.get('/api/blogs', helper.newBlog)
    const blogList = response.body

    blogList.forEach(blog => {
      expect(blog).toHaveProperty('id')
      expect(blog).not.toHaveProperty('_id')
    })
  })
})

describe('POST', () => {
  test('to /api/blogs makes blogs have an extra blog', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const blogsWithoutIds = response.body.map(blog => {
      delete blog.id
      return blog
    })

    expect(blogsWithoutIds.length).toBe(helper.initialBlogs.length + 1)
    expect(blogsWithoutIds).toContainEqual(helper.newBlog)
  })

  test('of a blog without likes property defaults it to 0', async () => {
    const newBlog = {...helper.newBlog, likes: undefined}

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const postedBlog = response.body

    expect(postedBlog.likes).toBe(0)
  })

  test('of a blog without title or url is 400 Bad Request and error', async () => {
    const newBlogWithoutUrl = {...helper.newBlog, url: undefined }
    const newBlogWithoutTitle = {...helper.newBlog, title: undefined }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('DELETE', () => {
  test('returns 204 and removes an existing blog', async () => {
    const blogToDelete = await helper.anyBlog()
    
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAfterDelete).not.toContainEqual(blogToDelete)
  })
})

describe('PUT', () => {
  test('returns 200 and new blog data', async () => {
    const blogToUpdate = await helper.anyBlog()
    const newProperties = { likes: blogToUpdate.likes + 1 }
    const expectedNewBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1}
    const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(newProperties)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(expectedNewBlog)
  })
})

afterAll(() => {
  mongoose.connection.close()
})