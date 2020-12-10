export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION"
})

export const createNotification = (notification) => ({
  type: "CREATE_NOTIFICATION",
  notification
})

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case "CLEAR_NOTIFICATION":
      return null
    case "CREATE_NOTIFICATION":
      return action.notification
    default:
      return state
  }
}

export default notificationReducer