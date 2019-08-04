import React from 'react'
import { Query } from "react-apollo"
import gql from "graphql-tag"

import BookList from './BookList'

const COUNT = 100
const KEEP_PAGES = 2
const MAX_BUFFER = COUNT * KEEP_PAGES //5 pages

const GET_BOOKS = gql`
  query getBooks($page: Int!, $count: Int!) {
    books(page: $page, count: $count) {
      id, title, author
    }
  }
`;
let page = 0

const BooksQuery = (props) => {
  const loadMore = (fetchMore) => (isDown) => {
    if (!isDown && page < KEEP_PAGES) return

    fetchMore({
      variables: {
        page: isDown ? ++page : --page-KEEP_PAGES+1,
        count: COUNT
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        let buffer
        if (isDown) {
          buffer = [...prev.books, ...fetchMoreResult.books].slice(-MAX_BUFFER)
        } else {
          buffer = [...fetchMoreResult.books, ...prev.books].slice(0, MAX_BUFFER)
        }

    console.log("page",page,"buffer", buffer[0], buffer[buffer.length-1])

        return Object.assign({}, prev, {
          books: buffer
        })

      }
    })
  }


  return (
    <Query query={GET_BOOKS} variables={{ page: 0, count: COUNT }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (
          <div  >
            <BookList
              books={data.books}
              onLoadMore={loadMore(fetchMore)} />
          </div>
        )
      }}
    </Query>
  )
}


export default BooksQuery