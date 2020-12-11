import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, asObject } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatcher = useDispatch()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ""
    await anecdoteService.create(anecdote)
    dispatcher(createAnecdote(anecdote))
    
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