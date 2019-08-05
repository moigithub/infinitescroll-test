import React from 'react';
import throttle from 'lodash.throttle'
import { VariableSizeList, FixedSizeList } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import ReactResizeDetector from 'react-resize-detector'
import AutoSizer from "react-virtualized-auto-sizer"

import Book from './Book.js'

const BookList = ({ books, onLoadMore }) => {

  const loaderRef = React.createRef()

  const isItemLoaded = (index) => index < books.length - 1
  const getSize = (width) => ()=> (width > 600) ? 20: 40
  const onResize = (ref) => () => ref.current._listRef.resetAfterIndex(0, false)

  return (
    <div className="booklist"  >
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={books.length}
        loadMoreItems={onLoadMore}
        ref={loaderRef}
      >
        {({ onItemsRendered, ref }) => (
          <ReactResizeDetector handleWidth onResize={onResize(loaderRef)}>
            {({ width, height }) => {
              console.log("autosizer", width, height)
              return (
                <VariableSizeList
                  ref={ref}
                  height={400}
                  itemData={books}
                  itemCount={books.length}
                  itemSize={getSize(width)}
                  width={width}
                  onItemsRendered={onItemsRendered}
                >
                  {Book}
                </VariableSizeList >
              )
            }}
          </ReactResizeDetector>
        )}
      </InfiniteLoader>
    </div>
  )
}

export default BookList