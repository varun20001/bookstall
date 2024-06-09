// src/components/BookshelfPage.js
import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "./BookshelfPage.css";

function BookshelfPage() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const toggleBookshelf = (book) => {
    const existingBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBookshelf = existingBookshelf.filter(
      (item) => item.key !== book.key
    );
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
  };

  return (
    <div className="bookshelf-page">
      <h1>My Bookshelf</h1>
      <div className="bookshelf">
        {bookshelf.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            toggleBookshelf={toggleBookshelf}
            isInBookshelf={true}
          />
        ))}
      </div>
      <a href="/" className="back-link">
        Back to Search
      </a>
    </div>
  );
}

export default BookshelfPage;
