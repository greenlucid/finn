  
import React, { useEffect, useState } from 'react'
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

const SetBirthyear = ({ authors, setError }) => {
  const [ name, setName ] = useState(null)
  const [ born, setBorn ] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      if(error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0].message)
      } else {
        console.log(error)
      }
    }
  })

  const handleBirthyear = (event) => {
    event.preventDefault()
    if (!born || born.length === 0) {
      setError('You need to input a value')
    } else {
      editAuthor({ variables: {name, born} })
      setBorn('')
    }
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
    if (authorOptions.length > 0) {
      setName(authorOptions[0].value)
    }
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
    pollInterval: 60000
  })

  useEffect(() => {
    if (props.page === 'authors') {
      authorsQuery.refetch()
    }
  }, [props.page]) //eslint-disable-line

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
    <SetBirthyear authors={authors} setError={props.setError} />
    </div>
  )
}

export default Authors
