import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './component/Shelf'
import Search from './component/Search'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';



class BooksApp extends React.Component {
  state = {
    books: [],
    bookOnSearch: [],
  }

  shelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' },
  ]
  getbooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }
  componentDidMount() {
    this.getbooks();
  }


  UpdateShelf = (newbook, shelf) => {
    BooksAPI.update(newbook, shelf).then(books => {
      // if the book is new then add it to the state, and it's not changed to none
      if (newbook.shelf === 'none' && shelf !== 'none') {
        this.setState(state => {
          const addBooks = state.books.concat(newbook);
          return { books: addBooks }
        })
      }

      const changeShelf = this.state.books.map(book => {
        // if it's already in the state, then change it's shelf
        if (book.id === newbook.id) {
          book.shelf = shelf
        }
        return book;
      });

      this.setState({
        books: changeShelf,
      });

      // if 'none' shelve is chosen, then remove that book from the state
      if (shelf === 'none') {
        this.setState(state => {
          const removeBook = state.books.filter(book => book.id !== newbook.id);
          return { books: removeBook }
        })
      }
    });
  }

  shelfBooks(shelf) {
    return this.state.books.filter(book => book.shelf === shelf.key)
  }

  searchResults = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query).then(bookOnSearch => {
        let result = [];
        for (const resultBook of bookOnSearch) {
          for (const book of this.state.books) {
            if (resultBook.id === book.id) {
              resultBook.shelf = book.shelf
            }
          }
          result.push(resultBook)
        }
        return result
      }).then((bookOnSearch) => {
        this.setState((prevState) => ({ bookOnSearch }))
      }).catch(bookOnSearch => this.setState({ bookOnSearch: [] }))
    } else {
      this.setState({ bookOnSearch: [] })
    }
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div >
            {this.shelves.map(shelf => (
              <Shelf key={shelf.key} shelf={shelf} books={this.shelfBooks(shelf)} UpdateShelf={this.UpdateShelf} />
            ))}

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div >
        )} />

        <Route path='/search'
          render={() => (
            <Search
              searchResults={this.searchResults}
              UpdateShelf={this.UpdateShelf}
              resultBooks={this.state.bookOnSearch}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
