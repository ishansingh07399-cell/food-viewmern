import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import '../../styles/create-food.css';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setError('Please select a video to upload.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', videoFile);

      await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/');
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-page">
        <div className="create-header">
          <h1 className="create-title">Upload Food Reel</h1>
          <p className="create-subtitle">Share your dish with food lovers</p>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>

          {/* Video Upload Area */}
          <div
            className={`video-upload-area ${videoPreview ? 'has-video' : ''}`}
            onClick={() => fileInputRef.current.click()}
          >
            {videoPreview ? (
              <video
                className="video-preview"
                src={videoPreview}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div className="video-placeholder">
                <span className="video-upload-icon">🎬</span>
                <p className="video-upload-text">Tap to select a video</p>
                <p className="video-upload-hint">MP4, MOV — vertical preferred</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Food Name */}
          <div className="create-field">
            <label className="create-label" htmlFor="foodName">Food Name</label>
            <input
              id="foodName"
              type="text"
              className="create-input"
              placeholder="e.g. Butter Chicken"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="create-field">
            <label className="create-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="create-input create-textarea"
              placeholder="Describe your dish..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Error */}
          {error && <p className="create-error">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="create-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="create-btn-loading">
                <span className="create-spinner" /> Uploading...
              </span>
            ) : '🚀 Publish Reel'}
          </button>

        </form>
      </div>
      <BottomNav />
    </>
  );
};

export default CreateFood;
