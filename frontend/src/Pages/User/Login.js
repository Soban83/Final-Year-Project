import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import {Navbar} from '../../Components/Navbar'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user._id);
        navigate('/');
      } else {
        setErrorMessage('Invalid login credentials');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Invalid login credentials');
      } else {
        setErrorMessage('Failed to connect to server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <a href="/signup">New User? Signup Now!</a>
      </form>
    </div>
    </div>
  );
};

