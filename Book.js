import React from 'react'

const Book = ({ book: { id, title, author } }) => (
  <li key={id} className="book">
    <div className="book__id">{id}</div>
    <div className="book__content">
      <span className="book__title"> {title}</span>
      <span className="book__author">{author}</span>
    </div>
  </li>
)

export default Book