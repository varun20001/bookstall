// src/components/BookCard.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./BookCard.css";

function BookCard({ book, toggleBookshelf, isInBookshelf }) {
  const [isAdded, setIsAdded] = useState(isInBookshelf);

  const handleToggleBookshelf = () => {
    if (isAdded) {
      if (
        window.confirm(
          "Are you sure you want to remove this book from your bookshelf?"
        )
      ) {
        toggleBookshelf(book);
        setIsAdded(false);
        toast.info("Book removed from bookshelf.");
      }
    } else {
      toggleBookshelf(book);
      setIsAdded(true);
      toast.success("Book added to bookshelf.");
    }
  };

  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
      <button onClick={handleToggleBookshelf}>
        {isAdded ? "Remove from Bookshelf" : "Add to Bookshelf"}
      </button>
    </div>
  );
}

export default BookCard;
