
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NavBar from './components/NavBar'
import Login from './components/Login'
import ErrorShow from './components/ErrorShow'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <div>
      <NavBar logged={token !== null} setPage={setPage} logout={handleLogout} />
      <ErrorShow error={error} setError={setError} />

      <Authors show={page === 'authors'} page={page} setError={setError} />
      <Books show={page === 'books'} page={page} />
      <Recommend show={page === 'recommend'} page={page} />
      <NewBook show={page === 'add'} setError={setError} />
      <Login show={page === 'login'} setToken={setToken} setError={setError} setPage={setPage} />

    </div>
  )
}

export default App