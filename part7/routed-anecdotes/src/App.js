import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Tabs from './components/Tabs'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
import About from './components/About'
import AnecdoteForm from './components/AnecdoteForm'
import Footer from  './components/Footer'
import SingleAnecdote from './components/SingleAnecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = id => {
    return anecdotes.find(anecdote => anecdote.id === id)
  }

  const match = useRouteMatch('/anecdotes/:id')
  const matchedAnecdote = match
    ? anecdoteById(match.params.id)
    : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const createNotification = (text, seconds) => {
    setNotification(text)
    setTimeout(() => {
      setNotification(null)
    }, seconds * 1000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Tabs />
      <Notification notification={notification}/>
      <Switch>
        <Route path='/create'>
          <AnecdoteForm addNew={addNew} createNotification={createNotification}/>
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/anecdotes/:id'>
          <SingleAnecdote anecdote={matchedAnecdote}/>
        </Route>
        <Route path='/'>
          <Anecdotes anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App