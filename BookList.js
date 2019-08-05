import React from 'react';
import throttle from 'lodash.throttle'
import { VariableSizeList ,FixedSizeList } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import windowSize from 'react-window-size'
import Book from './Book.js'

const BookList = ({ books, onLoadMore,windowWidth }) => {
  // const listRef = React.createRef()
  const isItemLoaded = (index) => index < books.length - 1

const getSize=()=>{
  if(windowWidth>600){
    return 25
  } else { 
    return 35
  }
}

  return (
    <div >
      <h2>Books</h2>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={books.length}
        loadMoreItems={onLoadMore}
      >
        {({ onItemsRendered, ref }) => (
          <VariableSizeList 
            ref={ref}
            className="List"
            height={400}
            itemData={books}
            itemCount={books.length}
            itemSize={getSize}
            // width={300}
            onItemsRendered={onItemsRendered}
          >
            {Book}
          </VariableSizeList >
        )}
      </InfiniteLoader>
    </div>
  )
}

export default windowSize(BookList)