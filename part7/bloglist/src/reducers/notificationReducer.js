const success = (message) => ({
  message,
  type: 'success'
})

const error = (message) => ({
  message,
  type: 'error'
})

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export const createNotification = (message, type) => ({
  type: 'CREATE_NOTIFICATION',
  notification: {
    message,
    type
  }
})

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_NOTIFICATION':
      return null
    case 'CREATE_NOTIFICATION':
      return action.notification
    case 'CREATE_BLOG':
      return success(`a new blog '${action.data.title}' by ${action.data.author} added!`)
    case 'SET_CREDENTIALS':
      return success(`${action.user.name} welcome back!`)
    case 'LIKE_BLOG':
      return success(`You liked ${action.data.title}!`)
    case 'POST_COMMENT':
      return success(`You posted a comment for ${action.data.blog.title}!`)
    default:
      return state
  }
}

export default notificationReducer