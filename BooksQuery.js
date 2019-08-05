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
  const loadMore = (fetchMore) => (startIndex, stopIndex) => {
    console.log("load more....",startIndex, stopIndex)
    fetchMore({
      variables: {
        page:  ++page,
        count: COUNT
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          books: [...prev.books, ...fetchMoreResult.books]
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