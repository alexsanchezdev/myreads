import React, { Component } from 'react'
import './App.css'
import Search from './components/Search'
import Library from './components/Library'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {
    books: null
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  updateParent = (event) => {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
      console.log(this.state)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library handler={this.updateParent} books={this.state.books}/>
        )}/>
        <Route path="/search" render={() => (
          <Search handler={this.updateParent} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
