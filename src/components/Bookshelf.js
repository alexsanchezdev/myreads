import React, { Component } from 'react'
import Book from './Book'
import '../App.css'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

  // List all the books available in the current book shelf.
  // Detect first if books is undefined or null before mapping to return a Book
  // component for each of the book presented.
  listBooks() {
    const books = this.props.books
    if (typeof books !== 'undefined' && books !== null) {
      if (books.length > 0) {
        const bookList = books.map(book => {
          return (
            <li key={book.id}>
              <Book id={book.id} shelf={book.shelf} title={book.title} authors={book.authors} cover={book.imageLinks.thumbnail} updateParent={this.props.handler} />
            </li>
          )
        });
        return bookList
      } else {
        return <p>There are no books in this shelf.</p>
      }
    }

  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.listBooks()}
          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default Bookshelf