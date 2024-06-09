// src/components/SearchPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "./SearchPage.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      axios
        .get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then((response) => setResults(response.data.docs))
        .catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  }, [query]);

  const toggleBookshelf = (book) => {
    const existingBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    const isBookInBookshelf = existingBookshelf.some(
      (item) => item.key === book.key
    );

    if (isBookInBookshelf) {
      const updatedBookshelf = existingBookshelf.filter(
        (item) => item.key !== book.key
      );
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    } else {
      localStorage.setItem(
        "bookshelf",
        JSON.stringify([...existingBookshelf, book])
      );
    }
  };

  const isInBookshelf = (book) => {
    const existingBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    return existingBookshelf.some((item) => item.key === book.key);
  };

  return (
    <div className="search-page">
      <h1>Search for Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book name..."
      />
      <div className="results">
        {results.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            toggleBookshelf={toggleBookshelf}
            isInBookshelf={isInBookshelf(book)}
          />
        ))}
      </div>
      <a href="/bookshelf" className="bookshelf-link">
        Go to My Bookshelf
      </a>
    </div>
  );
}

export default SearchPage;
