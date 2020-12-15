import React from 'react'
import { Link } from 'react-router-dom'

const ListedAnecdote = ({ anecdote }) => (
  <li key={anecdote.id}>
    <Link to={`/anecdotes/${anecdote.id}`}>
      {anecdote.content}
    </Link>
  </li>
)

const Anecdotes = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <ListedAnecdote anecdote={anecdote} key={anecdote.id}/>)}
    </ul>
  </div>
)

export default Anecdotes