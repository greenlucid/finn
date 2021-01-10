export const initBlogs = (blogs) => ({
  type: 'INIT_BLOGS',
  data: blogs
})

export const createBlog = (blog) => ({
  type: 'CREATE_BLOG',
  data: blog
})

export const deleteBlog = (blog) => ({
  type: 'DELETE_BLOG',
  data: blog
})

export const likeBlog = (blog) => ({
  type: 'LIKE_BLOG',
  data: blog
})

export const postComment = (blog, comment) => ({
  type: 'POST_COMMENT',
  data: {
    blog, comment
  }
})

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOGS':
      return []
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'LIKE_BLOG':
      return state.map(blog => (
        blog.id === action.data.id
          ? { ...blog, likes : blog.likes + 1 }
          : blog
      ))
    case 'POST_COMMENT':
      return state.map(blog => (
        blog.id === action.data.blog.id
          ? { ...blog, comments: [ ...blog.comments, action.data.comment ] }
          : blog
      ))
    default:
      return state
  }
}

export default blogsReducer