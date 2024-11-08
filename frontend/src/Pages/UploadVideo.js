import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../Components/Navbar";
import './UploadVideo.css'

export const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);

    try {
      const response = await axios.post("http://localhost:3001/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      setVideo(null);
      setThumbnail(null);
      setTitle('');
      
      document.getElementById('video').value = '';
      document.getElementById('thumbnail').value = '';
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Something went wrong! Try again.")
    }
  };

  return (
    <div className="UploadVideo">
      <Navbar />
      <div className="main-upload">
        <h2>Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="video">
            <label>Video:</label>
            <input type="file" id="video" accept="video/*" onChange={handleVideoChange} required/>
          </div>
          <div className="thumbnail">
            <label>Thumbnail:</label>
            <input type="file" id="thumbnail" accept="image/*" onChange={handleThumbnailChange} required />
          </div>
          <div className="title">
            <label>Title:</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} required />
          </div>
          <button className="submit-btn" type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};
