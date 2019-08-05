import React from 'react'

const Book = ({data,index,style}) => {
  if(!data) {
    return (
      <div>Loading</div>
    )
  }
  const {   id, title, author  } = data[index]
  return (
    <li key={id} className="book"  style={style}>
      <div className="book__id">{id}</div>
      <div className="book__content">
        <span className="book__title"> {title}</span>
        <span className="book__author">{author}</span>
      </div>
    </li>
  )
}

export default Book