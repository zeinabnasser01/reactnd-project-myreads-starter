import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  state = {
    book: {},
  };

  componentDidMount() {
    if (this.props.book.shelf) {
      this.setState(() => ({ book: this.props.book }));
    } else {
      BooksAPI.get(this.props.book.id).then((book) => this.setState({ book }));
    }
  }

  render() {
    const { onUpdateBook } = this.props;
    const { book } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.smallThumbnail : undefined
              })`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue="none"
              onChange={(e) => {
                const selectedValue = e.target.value;
                onUpdateBook(this.props.book, selectedValue);
              }}
              value={book.shelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option
                value="currentlyReading"
                disabled={book.shelf === "currentlyReading"}
              >
                Currently Reading
              </option>
              <option value="wantToRead" disabled={book.shelf === "wantToRead"}>
                Want to Read
              </option>
              <option value="read" disabled={book.shelf === "read"}>
                Read
              </option>
              <option value="none" disabled={book.shelf === "none"}>
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors : "authors not found"}
        </div>
      </div>
    );
  }
}

export default Book;
