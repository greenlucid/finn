const blogRouter = require('express').Router()
const { request } = require('../app')
const app = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const newBlog = request.body

  if (newBlog.title === undefined) {
    return response.status(400).json({ error: 'Missing title'})
  } else if (newBlog.url === undefined) {
    return response.status(400).json({ error: 'Missing url'})
  }

  const blog = new Blog(request.body)
  const postedBlog = await blog.save()
  response.status(200).json(postedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const updatedFields = request.body
  logger.info(updatedFields)
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, updatedFields, {new: true})
  response.json(newBlog)
})

module.exports = blogRouter