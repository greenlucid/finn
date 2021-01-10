import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

import { changeBlogform } from '../reducers/blogFormReducer'

const NewBlog = (props) => {
  const dispatch = useDispatch()
  const blogform = useSelector(state => state.blogform)

  const handleNewBlog = async (event) => {
    event.preventDefault()

    await props.createBlog({
      title: blogform.title,
      author: blogform.author,
      url: blogform.url
    })
  }

  const changeFormField = (newValue, field) => {
    var changedForm = { ...blogform }
    changedForm[field] = newValue
    dispatch(changeBlogform({ ...blogform, [field]: newValue }))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField
            label='title'
            value={blogform.title}
            onChange={({ target }) => changeFormField(target.value, 'title')}
          />
        </div>
        <div>
          <TextField
            label='author'
            value={blogform.author}
            onChange={({ target }) => changeFormField(target.value, 'author')}
          />
        </div>
        <div>
          <TextField
            label='url'
            value={blogform.url}
            onChange={({ target }) => changeFormField(target.value, 'url')}
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlog