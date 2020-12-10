import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatcher = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatcher(createAnecdote(anecdote))
    event.target.anecdote.value = ""
  }

  return (
    <div>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm