import React, { Component } from 'react'
import Book from './Book';
export default class Shelf extends Component {
    render() {
        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.books.map(book => (
                                    <Book key={book.id} book={book} UpdateShelf={this.props.UpdateShelf} />
                                ))}
                            </ol>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
