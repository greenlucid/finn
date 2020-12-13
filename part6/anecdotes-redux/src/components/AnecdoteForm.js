import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({createAnecdote}) => {
  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    createAnecdote(event.target.anecdote.value)
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

const mapDispatchToProps = {
  createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm