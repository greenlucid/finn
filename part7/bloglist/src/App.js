import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import { initBlogs, createBlog as createBlogAction, deleteBlog, likeBlog, postComment } from './reducers/blogsReducer'
import { setCredentials, logout } from './reducers/userReducer'
import { createNotification } from './reducers/notificationReducer'
import { initUsers } from './reducers/usersReducer'

import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogView from './components/BlogView'
import Login from './components/Login'

import blogService from './services/blogs'
import usersService from './services/users'

import storage from './utils/storage'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogList from './components/BlogList'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const commentform = useSelector(state => state.commentform)

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initBlogs(blogs))
    )
    usersService.getAll().then(users =>
      dispatch(initUsers(users)))
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setCredentials(user))
    }
  }, [dispatch])

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(createBlogAction(newBlog))
    } catch(exception) {
      dispatch(createNotification(`problem with uploading ${blog.title}`, 'error'))
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(likeBlog(blogToLike))
  }

  const handleCommentPost = async (event) => {
    event.preventDefault()
    if (!commentform.text) {
      dispatch(createNotification('Cannot post empty comment', 'error'))
    }
    else {
      await blogService.postComment(commentform.blog, commentform.text)
      dispatch(postComment(commentform.blog, commentform.text))
    }
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(deleteBlog(blogToRemove))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if ( !user ) {
    return (
      <Container>
        <div>
          <h2>login to application</h2>

          <Notification />

          <Login />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <Menu user={user} handleLogout={handleLogout}/>

        <h2>blog app</h2>

        <Notification />

        <Route exact strict path='/'>
          <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
        </Route>
        <Route exact strict path='/users'>
          <UsersView users={users}/>
        </Route>
        <Route path='/users/:id'>
          <UserView user={matchedUser}/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogView blog={matchedBlog} handleLike={handleLike}
            handleCommentPost={handleCommentPost}
          />
        </Route>
      </div>
    </Container>
  )
}

export default App