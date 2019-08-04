import React  from 'react';
import throttle from 'lodash.throttle'
import Book from './Book.js'

let lastValue = 0, isDown

const BookList = ({ books, onLoadMore }) => {

  const handleScroll = (event) => {
    event.persist()
    throttledHandleScroll(event.target)
  }

  let throttledHandleScroll = (target)=>{
    if (lastValue > target.scrollTop) {
      isDown = false
    } else if (lastValue < target.scrollTop) {
      isDown = true
    }

    lastValue = target.scrollTop

    if (isDown &&
       target.scrollTop+ target.clientHeight  >=
       target.scrollHeight- ( target.clientHeight/3)
    ) {
      onLoadMore(isDown )
    } else if(!isDown && target.scrollTop < 200){
      onLoadMore(isDown )
    }
  }
   throttledHandleScroll = throttle(throttledHandleScroll , 500)

  return (
    <div >
      <h2>Books</h2>
      <ul className="booklist" onScroll={ handleScroll}  
      >
        {books.map( book => (
          <Book key={book.id} book={book} />
        ))}
      </ul>
    </div>
  )
}

 export default BookList