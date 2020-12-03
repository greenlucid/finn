import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Toggable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogToggleRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => (b.likes - a.likes)) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const showMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // Using that common React hack makes LoginForm unmount
  // React complains because it has states so I went an alt route
  return (
    <div>
      {errorMessage !== null && <h3>{errorMessage}</h3>}
      <Toggable buttonLabel="Login">
        <LoginForm user={user} setUser={setUser} showMessage={showMessage}/>
      </Toggable>
      <br/>
      <Toggable buttonLabel="New Blog" ref={blogToggleRef}>
        <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} showMessage={showMessage}
          blogToggleRef={blogToggleRef}
        />
      </Toggable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}
          user={user} showMessage={showMessage}
        />
      )}
    </div>
  )
}

export default App