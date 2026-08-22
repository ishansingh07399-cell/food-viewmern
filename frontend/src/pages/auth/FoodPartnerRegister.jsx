import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { API_BASE_URL } from '../../config/api';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/food-partner/register`, {
        name: businessName,
        contactName,
        phone,
        email,
        password,
        address
      }, { withCredentials: true });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      navigate("/food-partner/register");
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
        <h1 className="auth-heading">Partner with us</h1>
        <p className="auth-subheading">Register your restaurant and start uploading</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="businessName">Restaurant Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              className="form-input"
              placeholder="e.g. Spice Garden"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contactName">Contact Person</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              className="form-input"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="e.g. 9876543210"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              className="form-input"
              placeholder="e.g. 123, MG Road, Bangalore"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="restaurant@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Min. 8 characters"
            />
          </div>

          <button type="submit" className="auth-btn">Register as Partner</button>
        </form>

        <p className="auth-footer">
          Already a partner?{' '}
          <Link to="/food-partner/login">Sign in</Link>
        </p>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line"></div>
        </div>

        <p className="auth-footer">
          Just a food lover?{' '}
          <Link to="/user/register">Register as Normal User</Link>
        </p>

      </div>
    </div>
  );
};

export default FoodPartnerRegister;
