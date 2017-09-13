import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {

  state = {
    query: ''
  }

  // Update the query state for searching purpose. If query is not empty, we
  // call the API for results if not we return an empty array to the state.
  // While typing, query result can be undefined or null, so we check the length
  // and type of the array before setting the state.
  updateQuery = (query) => {
    this.setState({ query })

    if (this.state.query !== '') {
      BooksAPI.search(this.state.query, 20).then(searchBooks => {
        if (typeof searchBooks !== 'undefined' && searchBooks.length > 0) {
          this.setState({ searchBooks })
        }
      })
    } else {
      this.setState({ searchBooks: [] })
    }
  }

  // If the query is empty we render an empty div to blank the screen between
  // multiple searches without closing Search component.
  // Then, obtain the search books results and filter them to check which one we
  // have already in our library. If we have it, we pass its information (title, shelf
  // id, authors, etc) to the render method, if not, we pass the search books result for
  // the specific book.
  listBooks() {

    if (this.state.query === "") {
      return <div></div>
    } else {
      if (typeof this.state.searchBooks !== 'undefined') {

        const searchBookList = this.state.searchBooks.map(searchBook => {

          const booksFromLibrary = this.props.books.filter(libraryBook => libraryBook.id === searchBook.id)

          if (booksFromLibrary.length > 0) {
            const bookToShow = booksFromLibrary[0]
            return (
              <li key={bookToShow.id}>
                <Book id={bookToShow.id} shelf={bookToShow.shelf} title={bookToShow.title} authors={bookToShow.authors} cover={bookToShow.imageLinks.thumbnail} updateParent={this.props.handler} />
              </li>
            )
          } else {
            const bookToShow = searchBook
            return (
              <li key={bookToShow.id}>
                <Book id={bookToShow.id} shelf={bookToShow.shelf} title={bookToShow.title} authors={bookToShow.authors} cover={bookToShow.imageLinks.thumbnail} updateParent={this.props.handler} />
              </li>
            )
          }
        })

        return searchBookList
      }
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.listBooks()}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired
}

export default Search