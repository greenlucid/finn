import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const Login = ({ setPage, setToken, setError, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const clearFields = () => {
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
      clearFields()
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ variables: {username, password} })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        username:
        <input
          className='username'
          type='text'
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        <br/>
        password:
        <input
          className='password'
          type='password'
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
        <br/>
        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login