import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import './VideoList.css';

const VideoList = ({ searchQuery, sortOption }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/video/getvideos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  // Filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort videos based on the sort option
  const sortedVideos = filteredVideos.sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'date') {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    }
    return 0;
  });

  return (
    <div>
      <div className="video-list">
        {sortedVideos.map(video => (
          <VideoCard
            key={video._id}
            video={video}
            onClick={handleVideoClick}
          />
        ))}
      </div>
      {selectedVideo && (
        <div className="video-player-overlay" onClick={handleClosePlayer}>
          <video controls autoPlay className="video-player">
            <source src={`http://localhost:3001/uploads/${selectedVideo.videoPath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoList;
