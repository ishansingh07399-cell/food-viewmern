import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { API_BASE_URL } from '../../config/api';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/food-partner/login`, {
        email,
        password
      }, { withCredentials: true });
      console.log(response.data);
      navigate("/food-partner/profile");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password. If you don't have a partner account, please register first.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-brand-dot"></div>
          <span className="auth-brand-name">FoodView</span>
        </div>

        <span className="auth-role-badge">Food Partner</span>
        <h1 className="auth-heading">Partner login</h1>
        <p className="auth-subheading">Sign in to manage your food content</p>

        {error && (
          <div style={{ color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.3)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="restaurant@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Not a partner yet?{' '}
          <Link to="/food-partner/register">Register here</Link>
        </p>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line"></div>
        </div>

        <p className="auth-footer">
          Just a food lover?{' '}
          <Link to="/user/login">Login as Normal User</Link>
        </p>

      </div>
    </div>
  );
};

export default FoodPartnerLogin;
