import React, { useState } from 'react';
import './Explore.css';
import { Navbar } from '../Components/Navbar';
import { Sidebar } from '../Components/Sidebar';
import { Footer } from '../Components/Footer';
import VideoList from '../Components/Video/VideoList';

export const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="Explore">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <div className="controls">
            <div className="seaarchcont">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar"
            />
            <button className='search' onClick={handleSearchChange}>Search</button>
            </div>
            <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
              <option value="title">Sort by Title</option>
              <option value="date">Sort by Upload Date</option>
            </select>
          </div>
          <div className="videos">
          <VideoList searchQuery={searchQuery} sortOption={sortOption} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
