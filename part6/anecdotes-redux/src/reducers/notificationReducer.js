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
    case "CREATE_ANECDOTE":
      return `You created '${action.data}'`
    case "VOTE_ANECDOTE":
      return `You voted '${action.data.content}'`
    default:
      return state
  }
}

export default notificationReducer