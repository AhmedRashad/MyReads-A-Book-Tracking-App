import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';
export default class Search extends Component {

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={event => this.props.searchResults(event.target.value)}
                            type="text"
                            placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"> {this.props.resultBooks.length > 0 ? (
                        this.props.resultBooks.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book} UpdateShelf={this.props.UpdateShelf}
                                />
                            </li>
                        ))) : <li></li>}
                    </ol>
                </div>
            </div>
        )
    }
}


