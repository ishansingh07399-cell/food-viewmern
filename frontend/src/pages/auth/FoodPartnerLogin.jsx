import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const FoodPartnerLogin = () => {
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    const response = await axios.post("http://localhost:3000/api/auth/food-partner/login",{
      email,
      password
    },{ withCredentials: true })
    .then(response =>{
      console.log(response.data);
      navigate("/");
    })
    .catch(error =>{
      console.log(error);
      navigate("/food-partner/login");
    })
  }
  
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

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="restaurant@example.com"
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
