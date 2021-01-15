  
import React, { useState } from 'react'
import Select from 'react-select'


import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const EDIT_AUTHOR = gql`
mutation changeYear($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
    id
  }
}
`

const SetBirthyear = ({ authors }) => {
  const [ name, setName ] = useState(null)
  const [ born, setBorn ] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const handleBirthyear = (event) => {
    event.preventDefault()
    editAuthor({ variables: {name, born} })
    setBorn('')
  }

  if (!authors) {
    return (
      <div>loading...</div>
    )
  }

  const authorOptions = authors.map(author => ({
    value: author.name,
    label: author.name
  }))

  if (name === null) {
    setName(authorOptions[0].value)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleBirthyear}>
        name
        <Select
          defaultValue={authorOptions[0]}
          onChange={({ value }) => { setName(value) } }
          options={authorOptions}
        />
        <br/>born
        <input 
          type='text'
          name='born'
          value={born}
          onChange={({ target }) => { setBorn(Number(target.value)) }}
        />
        <br/><button>
          update author
        </button>
      </form>
    </div>
  )
}
const Authors = (props) => {

  const authorsQuery = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    <SetBirthyear authors={authors}/>
    </div>
  )
}

export default Authors
