export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION"
})

export const createNotification = (notification) => ({
  type: "CREATE_NOTIFICATION",
  notification
})

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    // Notification specific
    case "CLEAR_NOTIFICATION":
      return null
    case "CREATE_NOTIFICATION":
      return action.notification
    // General actions
    case "INIT_ANECDOTES":
      return `Created a new set of anecdotes with ${action.data.length} elements`
    case "DELETE_ALL_ANECDOTES":
      return 'Deleted all anecdotes'
    case "CREATE_ANECDOTE":
      return `Created '${action.data.content}'`
    case "VOTE_ANECDOTE":
      return `Voted '${action.data.content}'`
    default:
      return state
  }
}

export default notificationReducer