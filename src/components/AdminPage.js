import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/getBooks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/api/admin/books', newBook, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewBook({ title: '', author: '', price: '' });
    // Refresh the book list
    const response = await axios.get('/api/admin/books', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(response.data);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleAddBook}>
        <h2>Add New Book</h2>
        <input type="text" placeholder Continued Frontend Code />
        <input
          type="text"
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      <h2>Existing Books</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>Price: ${book.price}</p>
            {/* Add buttons for update/delete here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
