import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { changeLoginform } from '../reducers/loginFormReducer'
import { createNotification } from '../reducers/notificationReducer'
import { setCredentials } from '../reducers/userReducer'
import loginService from '../services/login'
import storage from '../utils/storage'

const Login = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector(state => state.loginform)

  const changeFormField = (value, field) => {
    const newForm = {
      username, password,
      [field]: value
    }
    dispatch(changeLoginform(newForm))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      dispatch(setCredentials(user))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(createNotification('wrong username/password', 'error'))
    }
  }

  return  (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='username'
            value={username}
            onChange={({ target }) => changeFormField(target.value, 'username')}
          />
        </div>
        <div>
          <TextField
            label='password'
            value={password}
            type='password'
            onChange={({ target }) => changeFormField(target.value, 'password')}
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

export default Login