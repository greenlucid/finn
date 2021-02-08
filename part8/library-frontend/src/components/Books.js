import React, { useEffect, useState } from 'react'

import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
      born
      id
    }
    published
    genres
    id
  }
}
`

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const booksQuery = useQuery(ALL_BOOKS, {
    pollInterval: 60000
  })

  useEffect(() => {
    if (props.page === 'books')
    booksQuery.refetch()
  }, [props.page, filter]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks
  const shownBooks = filter
  ? books.filter(book => book.genres.includes(filter))
  : books

  const getGenres = () => {
    let genreList = []
    books.forEach(book => {
      book.genres.forEach(genre => {
        if (!genreList.includes(genre)) {
          genreList = genreList.concat(genre)
        }
      })
    })
    return genreList
  }

  const genres = getGenres()

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
          {shownBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setFilter(null)}>VIEW ALL</button>
      {genres.map(g => 
        <button onClick={() => setFilter(g)}>
        {g}
        </button>
      )}
    </div>
  )
}

export default Books