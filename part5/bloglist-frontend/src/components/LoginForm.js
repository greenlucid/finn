import React, { useState } from 'react'
import loginService from '../services/login'


const LoginForm = ({user, setUser, showMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)

  const emptyFields = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
    const credentials = { username, password }
    try {
      const loginResponse = await loginService.login(credentials)
      setUser(loginResponse)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loginResponse)
      ) 
      emptyFields()
      setLogged(true)
    } catch (error) {
      showMessage('Wrong username or password')
    }
  }

  const logout = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    
    setTimeout(() => {
      setLogged(false)
      setUser(null)
    }, 200) // Makes the user wait and believe something is being loaded
  }

  if (logged || window.localStorage.getItem('loggedBloglistUser')) {
    return (
      <div>
        Welcome {user ? user.name : '...'}
        {' '}<button onClick={logout} >Logout</button>
      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type='text' value={username} name='Username'
              onChange={ ({target}) => (setUsername(target.value)) }
            />
          </div>
          <div>
            Password:
            <input
              type='password' value={password} name='Password'
              onChange={ ({target}) => (setPassword(target.value)) }
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm