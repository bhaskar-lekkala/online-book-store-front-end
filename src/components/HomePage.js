import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

const HomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {

        const fetchBooks = async () => {
            const token = localStorage.getItem('token'); // Assuming the JWT is stored in localStorage
            const response = await fetch('http://localhost:8080/api/getBooks', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Error fetching books:', response.statusText);
                return;
            }

            const books = await response.json();
            console.log(books);
            setBooks(books);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <div className="book-list">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;



