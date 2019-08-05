import React from 'react';
import throttle from 'lodash.throttle'
import { FixedSizeList } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import Book from './Book.js'

const BookList = ({ books, onLoadMore }) => {
  // const listRef = React.createRef()
  const isItemLoaded = (index) => index < books.length - 1


  return (
    <div >
      <h2>Books</h2>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={books.length}
        loadMoreItems={onLoadMore}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            ref={ref}
            className="List"
            height={400}
            itemData={books}
            itemCount={books.length}
            itemSize={35}
            width={300}
            onItemsRendered={onItemsRendered}
          >
            {Book}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  )
}

export default BookList