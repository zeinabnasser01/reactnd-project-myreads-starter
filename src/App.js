import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import BooksList from "./BooksList";
import BooksSearch from "./BooksSearch";

class BooksApp extends React.Component {
  state = {
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
          <Route path="/search">
            <BooksSearch
              books={books}
              onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}
              onUpdateState={(book) => {
                this.updateState(book);
              }}
            />
          </Route>

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
