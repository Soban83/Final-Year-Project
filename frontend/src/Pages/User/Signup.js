import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Navbar } from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('beginner');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/user/signup', {
        name,
        email,
        username,
        password,
        proficiencyLevel,
      });

      if (response.status === 200) {
        console.log('Signup successful:', response.data);
        navigate('/login');
      } else {
        setErrorMessage('Signup failed');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Invalid signup data');
      } else {
        setErrorMessage('Failed to connect to server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="form-group">
            <label htmlFor="proficiencyLevel">Proficiency Level:</label>
            <select
              id="proficiencyLevel"
              value={proficiencyLevel}
              onChange={(e) => setProficiencyLevel(e.target.value)}
              disabled={loading}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          <a href="/login">Already a user? Login!</a>
        </form>
      </div>
    </div>
  );
};
