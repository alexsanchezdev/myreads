import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Library extends Component {

  // Helper method to filter bookshelf results
  filterShelf = (status) => {
    if (this.props.books != null) {
      const shelfBooks = this.props.books.filter(book => book.shelf === status)
      return shelfBooks
    }
  }

  // Render method for the 3 bookshelf
  // Passing a handler to change the parent state to each of them, and filtering
  // the result to be shown in every shelf.
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <Bookshelf handler={this.props.handler} title="Currently reading" books={this.filterShelf("currentlyReading")} />
            <Bookshelf handler={this.props.handler} title="Want to read" books={this.filterShelf("wantToRead")} />
            <Bookshelf handler={this.props.handler} title="Read" books={this.filterShelf("read")} />
          </div>
        </div>
        <Link className="open-search" to="/search">Add a book</Link>
      </div>
    )
  }
}

Library.propTypes = {
  books: PropTypes.array.isRequired
}

export default Library