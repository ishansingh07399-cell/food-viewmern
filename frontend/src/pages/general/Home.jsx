import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/home.css';
import BottomNav from '../../components/BottomNav';

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState({});
  const [savedItems, setSavedItems] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true,
        });
        const items = Array.isArray(response.data) ? response.data : (response.data.foodItems || []);
        setFoodItems(items);
      } catch (error) {
        console.error('Error fetching food items:', error);
        if (error.response?.status === 401) {
          setErrorMsg('Please login to view food reels.');
        } else {
          setErrorMsg('Failed to load feed. Make sure backend is running.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  // Auto-play / pause videos on scroll using IntersectionObserver
  useEffect(() => {
    const observers = [];
    videoRefs.current.forEach((video) => {
      if (!video) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.7 }
      );
      observer.observe(video);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [foodItems]);

  const handleLike = async (itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/food/${itemId}/like`,
        {},
        { withCredentials: true }
      );
      const isLiked = response.data.liked;
      setLikedItems((prev) => ({ ...prev, [itemId]: isLiked }));
      setFoodItems((prev) =>
        prev.map((item) =>
          item._id === itemId
            ? { ...item, likeCount: item.likeCount + (isLiked ? 1 : -1) }
            : item
        )
      );
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleSave = async (itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/food/${itemId}/save`,
        {},
        { withCredentials: true }
      );
      const isSaved = response.data.saved;
      setSavedItems((prev) => ({ ...prev, [itemId]: isSaved }));
      setFoodItems((prev) =>
        prev.map((item) =>
          item._id === itemId
            ? { ...item, saveCount: item.saveCount + (isSaved ? 1 : -1) }
            : item
        )
      );
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  if (loading) {
    return (
      <div className="home-loader">
        <div className="home-spinner" />
        <p>Loading feed...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <>
        <div className="saved-empty">
          <span className="saved-empty-icon">🔐</span>
          <p className="saved-empty-text">{errorMsg}</p>
          <button className="saved-go-home" onClick={() => navigate('/user/login')}>
            Login as User
          </button>
          <p style={{ marginTop: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            Are you a restaurant owner?{' '}
            <span
              style={{ color: '#ff6b35', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/food-partner/login')}
            >
              Partner Login
            </span>
          </p>
        </div>
        <BottomNav />
      </>
    );
  }

  if (foodItems.length === 0) {
    return (
      <>
        <div className="saved-empty">
          <span className="saved-empty-icon">🍔</span>
          <p className="saved-empty-text">No food videos yet</p>
          <p className="saved-empty-hint">Be the first to upload a delicious food reel!</p>
          <button className="saved-go-home" onClick={() => navigate('/create-food')}>
            🎬 Upload a Reel
          </button>
        </div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <div className="home-feed">
        {foodItems.map((item, index) => (
          <div className="home-reel" key={item._id}>
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="reel-video"
              src={item.video}
              loop
              muted
              playsInline
            />

            {/* Overlay — bottom */}
            <div className="reel-overlay">
              <span className="reel-food-badge">{item.name || 'Special Dish'}</span>
              <p className="reel-description">{item.description}</p>
              <button
                className="reel-visit-btn"
                onClick={() => navigate(`/store/${item.foodPartner}`)}
              >
                🏪 Visit Store
              </button>
            </div>

            {/* Right-side actions */}
            <div className="reel-actions">
              <div
                className={`reel-action-item ${likedItems[item._id] ? 'liked' : ''}`}
                onClick={() => handleLike(item._id)}
              >
                <div className="reel-action-box">
                  <span className="reel-action-icon">
                    {likedItems[item._id] ? '❤️' : '🤍'}
                  </span>
                </div>
                <span className="reel-action-count">{item.likeCount}</span>
              </div>

              <div
                className={`reel-action-item ${savedItems[item._id] ? 'saved' : ''}`}
                onClick={() => handleSave(item._id)}
              >
                <div className="reel-action-box">
                  <span className="reel-action-icon">
                    {savedItems[item._id] ? '🔖' : '🏷️'}
                  </span>
                </div>
                <span className="reel-action-count">{item.saveCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </>
  );
};

export default Home;
