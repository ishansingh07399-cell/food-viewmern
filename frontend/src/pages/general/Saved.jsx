import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import '../../styles/home.css';

const Saved = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food/saved', {
          withCredentials: true,
        });
        setFoodItems(response.data);
      } catch (err) {
        console.error('Error fetching saved items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) {
    return (
      <div className="home-loader">
        <div className="home-spinner" />
        <p>Loading saved...</p>
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <>
        <div className="saved-empty">
          <span className="saved-empty-icon">🔖</span>
          <p className="saved-empty-text">No saved reels yet</p>
          <p className="saved-empty-hint">Tap the bookmark on any reel to save it</p>
          <button className="saved-go-home" onClick={() => navigate('/')}>
            Browse Reels
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
            <video
              className="reel-video"
              src={item.video}
              loop
              muted
              playsInline
              autoPlay
            />
            <div className="reel-overlay">
              <p className="reel-description">{item.description}</p>
              <button
                className="reel-visit-btn"
                onClick={() => navigate(`/store/${item.foodPartner}`)}
              >
                🏪 Visit Store
              </button>
            </div>
            <div className="reel-actions">
              <div className="reel-action-item">
                <span className="reel-action-icon">❤️</span>
                <span className="reel-action-count">{item.likeCount}</span>
              </div>
              <div className="reel-action-item">
                <span className="reel-action-icon">🔖</span>
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

export default Saved;
