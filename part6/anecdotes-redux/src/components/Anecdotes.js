import React from 'react'
import { connect } from "react-redux"
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

const Anecdotes = ({anecdotes, voteAnecdote}) => {  
  const createHandleVote = (anecdote) => () => {
    voteAnecdote(anecdote)
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

const filterAnecdotes = (anecdotes, filter) => (
  anecdotes
    .filter(anecdote => 
      anecdote.content.toLowerCase()
        .includes(filter.toLowerCase())
    )
    .sort((a, b) => (b.votes - a.votes))
)

const mapStateToProps = state => ({
  anecdotes: filterAnecdotes(state.anecdotes, state.filter)
})

const mapDispatchToProps = {
  voteAnecdote
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes