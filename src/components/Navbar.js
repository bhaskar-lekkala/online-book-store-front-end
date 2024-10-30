import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check for token in localStorage on component mount and update state
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Convert token existence to boolean
    }, [isLoggedIn]);

    // Function to handle login and update state
    const handleLogin = () => {
        // Assuming token is set in localStorage after login
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true); // Update state immediately
            navigate('/'); // Redirect to home or any other page after login
        }
    };

    // Function to handle logout and update state
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update state immediately
        navigate('/'); // Redirect to home
    };


  return (
    <nav className="navbar">
      <h1 className="logo">BookStore</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/cart">Cart</Link></li> */}
        {/* <li><Link to="/checkout">Checkout</Link></li> */}
        {!isLoggedIn ? (
          <>
          <li><Link to="/login" onClick={handleLogin}>Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
          <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
        </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
