import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class BooksList extends Component {
  render() {
    const { books, onUpdateBook } = this.props;
    return (
      <div className="list-books">
        <div className="open-search">
          <Link className="button" to="/search">
            Add a book
          </Link>
        </div>

        <div>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === "currentlyReading")
                      .map((filteredBook) => (
                        <li key={filteredBook.id}>
                          <Book
                            book={filteredBook}
                            onUpdateBook={onUpdateBook}
                          />
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === "wantToRead")
                      .map((filteredBook) => (
                        <li key={filteredBook.id}>
                          <Book
                            book={filteredBook}
                            onUpdateBook={onUpdateBook}
                          />
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === "read")
                      .map((filteredBook) => (
                        <li key={filteredBook.id}>
                          <Book
                            book={filteredBook}
                            onUpdateBook={onUpdateBook}
                          />
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksList;
