import React from 'react'
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.createNotification(`New anecdote '
      ${content.length>=25 
        ? `${content.value.substring(0,20)}...`
        : content.value}' was added`,
      10
    )
    resetFields()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputtable()} />
        </div>
        <div>
          author
          <input {...author.inputtable()} />
        </div>
        <div>
          url for more info
          <input {...info.inputtable()} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetFields}>reset</button>
      
    </div>
  )
}

export default AnecdoteForm