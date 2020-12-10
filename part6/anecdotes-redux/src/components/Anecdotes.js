import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleVote}) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
)

const Anecdotes = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes
      .filter(anecdote => (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
      .sort((a, b) => (b.votes - a.votes))
  )
  const dispatcher = useDispatch()

  const createHandleVote = (anecdote) => () => {
    dispatcher(voteAnecdote(anecdote))
  }

  return (
    <div className='anecdotes'>
      {anecdotes.map(anecdote => (
        <Anecdote
          anecdote={anecdote}
          handleVote={createHandleVote(anecdote)}
          key={anecdote.id}
        />
      ))}
    </div>
  )
}

export default Anecdotes