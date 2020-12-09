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
  const anecdotes = useSelector(
    state => state.sort((a, b) => (b.votes - a.votes))
  )
  const dispatcher = useDispatch()

  return (
    <div className='anecdotes'>
      {anecdotes.map(anecdote => (
        <Anecdote 
          anecdote={anecdote} 
          handleVote={() => dispatcher(voteAnecdote(anecdote.id))}
          key={anecdote.id}
        />
      ))}
    </div>
  )
}

export default Anecdotes