import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, blogs, setBlogs, showMessage}) => {
  const blankForm = {title: '', author: '', url: ''}
  const [blog, setBlog] = useState(blankForm)

  const emptyFields = () => {
    setBlog(blankForm)
  }

  const handleBlogPost = async (event) => {    
    event.preventDefault()
    try {
      const postedBlog = await blogService.create(blog, user.token)
      showMessage(`Blog "${blog.title}" was succesfully submitted`)
      setBlogs(blogs.concat(postedBlog))
      emptyFields()
      
    } catch(error) {
      showMessage('There was a problem in submitting the blog')
    }
  }
  if (!user) {
    return (<div></div>)
  } else {
  return (
      <div>
        <form onSubmit={handleBlogPost}>
          <div>
            title:
            <input 
              value={blog.title}
              type='text'
              name='Title'
              onChange={({target}) => {
                setBlog({...blog, title: target.value})
              }}
            />
          </div>
          <div>
            author:
            <input 
              value={blog.author}
              type='text'
              name='Author'
              onChange={({target}) => {
                setBlog({...blog, author: target.value})
              }}
            />
          </div>
          <div>
            url:
            <input 
              value={blog.url}
              type='text'
              name='Url'
              onChange={({target}) => {
                setBlog({...blog, url: target.value})
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default BlogForm