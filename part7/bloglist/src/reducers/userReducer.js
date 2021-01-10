export const logout = () => ({
  type: 'LOGOUT'
})

export const setCredentials = (user) => ({
  type: 'SET_CREDENTIALS',
  user
})

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return null
    case 'SET_CREDENTIALS':
      return action.user
    default:
      return state
  }
}

export default userReducer