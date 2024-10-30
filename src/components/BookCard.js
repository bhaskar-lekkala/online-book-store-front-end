import React from 'react';

const BookCard = ({ book }) => {
  return (
      <div className="book-card">
          <img src={book.imageUrl} alt={book.title} className="book-image" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>Price: ${book.price}</p>
          <button>Add to Cart</button>
      </div>
  );
};

export default BookCard;
