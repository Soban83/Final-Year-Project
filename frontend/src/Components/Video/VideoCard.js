import React from 'react';
import './VideoList.css';

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card">
      <div className="thumbnail-container">
        <img
          src={`http://localhost:3001/uploads/${video.thumbnailPath}`} // Adjust URL if needed
          alt={video.title}
          className="video-thumbnail"
        />
        <button className="play-button" onClick={() => onClick(video)}>
          &#9658; {/* Play icon */}
        </button>
      </div>
      <div className="video-title">{video.title}</div>
    </div>
  );
};

export default VideoCard;
