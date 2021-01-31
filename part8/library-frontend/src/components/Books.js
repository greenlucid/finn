import React from 'react'

import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
    genres
    id
  }
}
`


const Books = (props) => {

  const booksQuery = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books