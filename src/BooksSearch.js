import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { debounce } from "throttle-debounce";
import { toast } from "react-toastify";

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

    const debounceFunc = debounce(300, false, (query) => {
      console.log(query);
      if (query.length > 0) {
        BooksAPI.search(query).then((books) => {
          if (books.error) {
            this.setState({ showingBooks: [] });
            alert("books not found");
          } else {
            books
              .filter((book) => book.shelf === undefined)
              .map((book) => (book.shelf = "none"));

            this.setState({
              showingBooks: books,
            });
          }
        });
      } else {
        this.setState(() => ({
          showingBooks: [],
        }));
      }
    });

    debounceFunc(query);
  };

  updateBook = (book, shelf) => {
    const books = [...this.state.showingBooks];

    const selectedBook = books[books.indexOf(book)];
    selectedBook.shelf = shelf;
    if (this.props.onUpdateState) {
      console.log(book);
      this.props.onUpdateState(selectedBook);
      toast.success(`${book.title}is added to your ${book.shelf} shelf`, {
        position: "bottom-right",
      });
    }
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
