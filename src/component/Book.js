import React, { Component } from 'react'

export default class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks &&
                            this.props.book.imageLinks.thumbnail})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={this.props.book.shelf}
                            onChange={(event) => this.props.UpdateShelf(this.props.book, event.target.value)}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none" selected>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors && this.props.book.authors.join('& ')}</div>
            </div>
        )
    }
}

