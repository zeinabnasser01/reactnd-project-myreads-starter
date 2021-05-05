import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BooksSearch extends Component {
  state = {
    showingBooks: [],
    query: "",
    books: this.props.books,
  };

  handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;

    this.setState(() => ({
      query: query.trim(),
    }));

    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ showingBooks: [] });
          alert("books not found");
        } else {
          this.setState({
            showingBooks: books.filter((b) =>
              b.title.toLowerCase().includes(query.toLowerCase())
            ),
          });
        }
      });
    } else {
      this.setState(() => ({
        showingBooks: [],
      }));
    }
  };

  updateBook = (book, shelf) => {
    const books = [...this.state.showingBooks];
    if (this.props.onUpdateState) {
      console.log(books);
      this.props.onUpdateState(books);
    }
    books[books.indexOf(book)].shelf = shelf;
    this.setState({
      showingBooks: books,
    });
    BooksAPI.update(book, shelf);
  };

  render() {
    const { showingBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.query === "" ? (
            <p> No results, Go back to Search field</p>
          ) : (
            <div>
              <ol className="books-grid">
                {showingBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      onUpdateBook={(book, shelf) =>
                        this.updateBook(book, shelf)
                      }
                    />
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BooksSearch;
