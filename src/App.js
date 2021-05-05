import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import BooksList from "./BooksList";
import BooksSearch from "./BooksSearch";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  updateBook = (book, shelf) => {
    const books = [...this.state.books];
    books[books.indexOf(book)].shelf = shelf;
    this.setState({
      books,
    });
    BooksAPI.update(book, shelf);
  };

  updateState = (book) => {
    this.setState((currentState) => ({
      books: currentState.books.concat([book]),
    }));
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Switch>
          {/* <Route path="/search">
            <BooksSearch
              books={books}
              onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}
              onUpdateState={(book) => {
                this.updateState(book);
              }}
            />
          </Route> */}
          <Route
            path="/search"
            render={({ history }) => (
              <BooksSearch
                books={books}
                onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}
                onUpdateState={(book) => {
                  this.updateState(book);
                  history.push("/");
                }}
              />
            )}
          />
          <Route exact path="/">
            <BooksList
              books={books}
              onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
