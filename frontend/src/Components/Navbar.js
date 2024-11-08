import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage to determine if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login button click
  const handleLogin = () => {
    navigate('/login');
  };

  // Handle logout button click
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='Navbar'>
      <div className="left">
        <div className="image">
          <a href="/"><img src="Logo.png" alt="Logo" /></a>
        </div>
      </div>
      <div className="middle">
        <div className="links">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/explore">Tutorial</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="account">
          <div className="button">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
