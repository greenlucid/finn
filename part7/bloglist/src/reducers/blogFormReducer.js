const emptyForm = {
  title: '',
  author: '',
  url: ''
}

export const clearBlogform = () => ({
  type: 'CLEAR_BLOGFORM'
})

export const changeBlogform = (blogform) => ({
  type: 'CHANGE_BLOGFORM',
  blogform
})

const blogFormReducer = (state = emptyForm, action) => {
  switch (action.type) {
    case 'CLEAR_BLOGFORM':
    case 'CREATE_BLOG':
      return emptyForm
    case 'CHANGE_BLOGFORM':
      return action.blogform
    default:
      return state
  }
}

export default blogFormReducer