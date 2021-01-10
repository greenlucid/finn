const emptyForm = {
  username: '',
  password: ''
}

export const clearLoginform = () => ({
  type: 'CLEAR_LOGINFORM'
})

export const changeLoginform = (loginform) => ({
  type: 'CHANGE_LOGINFORM',
  loginform
})

const loginFormReducer = (state = emptyForm, action) => {
  switch (action.type) {
    case 'CLEAR_LOGINFORM':
    case 'SET_CREDENTIALS':
      return emptyForm
    case 'CHANGE_LOGINFORM':
      return action.loginform
    default:
      return state
  }
}

export default loginFormReducer