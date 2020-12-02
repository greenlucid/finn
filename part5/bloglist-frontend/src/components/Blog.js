import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, showMessage }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDetailsChange = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      await blogService.like(blog)
      const blogId = blog.id
      setBlogs(blogs.map(blog => (
        blogId === blog.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      )))
      showMessage(`You liked ${blog.title}`)
    } catch(error) {
      showMessage('There was a problem with your like')
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog, user.token)
        showMessage(`You deleted ${blog.title}`)
        const blogId = blog.id
        setBlogs(blogs.filter(blog => blog.id !== blogId))
      } catch(error) {
        showMessage('There was a problem with deleting this blog')
      }
    }
  }

  const removeButton = () => (
    <div>
      <button onClick={handleRemove}>remove</button>
    </div>
  )

  const blogDetails = () => (
    <div className="blogDetails">
      Url: <a href={blog.url}>{blog.url}</a>
      <br/>Likes: {blog.likes} {' '} <button onClick={handleLike}>like</button>
      <br/>Submitted by: {blog.user.name}
      {user.username === blog.user.username && removeButton()}
    </div>
  )

  const blogStyle = {
    borderStyle: 'double',
    borderColor: 'gray',
    borderWidth: 5,
    marginLeft: 5,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      {' '} <button onClick={handleDetailsChange}>{showDetails ? 'hide' : 'view' }</button>
      {showDetails === true && blogDetails()}
    </div>
  )
}

export default Blog
