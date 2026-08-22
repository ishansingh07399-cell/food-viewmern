import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { API_BASE_URL } from '../../config/api';

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/user/login`, {
        email,
        password
      }, { withCredentials: true });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-brand-dot"></div>
          <span className="auth-brand-name">FoodView</span>
        </div>

        <span className="auth-role-badge">User</span>
        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">Sign in to continue to your feed</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/user/register">Create one</Link>
        </p>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line"></div>
        </div>

        <p className="auth-footer">
          Are you a food partner?{' '}
          <Link to="/food-partner/login">Login as Food Partner</Link>
        </p>

      </div>
    </div>
  );
};

export default UserLogin;
