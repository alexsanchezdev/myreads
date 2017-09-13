import React, { Component } from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {

  // Obtation the selected book ID to update and the shelf you want to change
  // it to. Then call parent function to update state.
  handleChange = (event) => {
    const book = { id: this.props.id }
    const shelf = event.target.value;
    BooksAPI.update(book, shelf).then( result => {
      this.props.updateParent(event);
    });
    
  }
  
  render() {
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.props.cover})` }}></div>
              <div className="book-shelf-changer">
                <select value={this.props.shelf} selected='none' onChange={(e) => {this.handleChange(e)}}>
                  <option disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
          </div>
        )
    }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  shelf: PropTypes.string,
  cover: PropTypes.string,
  id: PropTypes.string.isRequired,
  updateParent: PropTypes.func.isRequired
}

// Default prop value in case shelf is not defined, which means, we don't
// have it in our library.
Book.defaultProps = {
  shelf: 'none'
}

export default Book