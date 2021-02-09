import React, { useEffect, useState } from 'react'

import { gql, useQuery, useSubscription } from '@apollo/client'

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

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    published
    genres
    id
    author {
      name
    }
  }
}
`

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState([])
  const booksQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (props.page === 'books')
    booksQuery.refetch()
  }, [props.page, filter]) //eslint-disable-line

  useEffect(() => {
    if (booksQuery.data && booksQuery.data.allBooks) {
      setBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery.data])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => setBooks(books.concat(subscriptionData.data.bookAdded))
  })

  if (!props.show) {
    return null
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

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
      {genres.map((g, index) => 
        <button key={index} onClick={() => setFilter(g)}>
        {g}
        </button>
      )}
    </div>
  )
}

export default Books