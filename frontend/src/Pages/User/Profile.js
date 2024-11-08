import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

export const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();


  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3001/user/deleteUser/${userData._id}`, {
          headers: {
            token: token,
          },
        });

        if (response.status === 200) {
          console.log('User account deleted successfully:', response.data);
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Failed to delete user account:', response.data);
        }
      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/getUser', {
          headers: {
            token: token,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setUserData(data);
        } else {
          console.error('Error fetching user data:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="profile-main">
        <h1 className="profile-heading">Your Profile</h1>
        <div className='profile'>
          <div className="profile-rectangle-6">
            <div className="profile-form">
            <label className="profile-label">
              Name:
              <input
                type="text"
                name="name"
                value={userData.name}
                className="profile-input"
                disabled
              />
            </label>
            <label className="profile-label">
              Email:
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled
                className="profile-input disabled"
              />
            </label>
            <label className="profile-label">
              Username:
              <input
                type="text"
                name="username"
                value={userData.username}
                disabled
                className="profile-input disabled"
              />
            </label>
            <label className="profile-label">
              Password:
              <input
                type="password"
                name="password"
                value={userData.password}
                className="profile-input"
                disabled
              />
            </label>
              <div className="profile-buttons">
                <button type="button" onClick={handleDelete} className="profile-logout-button">
                  Delete Account
                </button>
              </div>
            </div>
            <div className='profile-img'>
              <img className="element-model-house-room" alt="Element model house room" src="Logo.png" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};