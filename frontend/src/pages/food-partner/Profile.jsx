import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import '../../styles/profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food-partner/profile', {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Could not load profile. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/food-partner/logout', {
        withCredentials: true,
      });
      navigate('/food-partner/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="profile-loader">
        <div className="profile-spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error-page">
        <p>{error}</p>
        <button className="profile-logout-btn" onClick={() => navigate('/food-partner/login')}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="profile-page">

        {/* Avatar + Name */}
        <div className="profile-hero">
          <div className="profile-avatar">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="profile-name">{profile.name}</h1>
          <span className="profile-badge">Food Partner</span>
        </div>

        {/* Info Cards */}
        <div className="profile-info-list">
          <div className="profile-info-item">
            <span className="profile-info-icon">📧</span>
            <div>
              <p className="profile-info-label">Email</p>
              <p className="profile-info-value">{profile.email}</p>
            </div>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-icon">👤</span>
            <div>
              <p className="profile-info-label">Contact Person</p>
              <p className="profile-info-value">{profile.contactName}</p>
            </div>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-icon">📞</span>
            <div>
              <p className="profile-info-label">Phone</p>
              <p className="profile-info-value">{profile.phone}</p>
            </div>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-icon">📍</span>
            <div>
              <p className="profile-info-label">Address</p>
              <p className="profile-info-value">{profile.address}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button
            className="profile-upload-btn"
            onClick={() => navigate('/create-food')}
          >
            🎬 Upload New Reel
          </button>
          <button className="profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
      <BottomNav />
    </>
  );
};

export default Profile;
