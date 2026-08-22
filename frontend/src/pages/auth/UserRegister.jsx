import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const UserRegister = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName  = e.target.lastName.value;
    const email     = e.target.email.value;
    const password  = e.target.password.value;

    await axios.post("http://localhost:3000/api/auth/user/register", {
      fullname: firstName + " " + lastName,
      email,
      password,
    }, { withCredentials: true });
  };


  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-brand-dot"></div>
          <span className="auth-brand-name">FoodView</span>
        </div>

        <span className="auth-role-badge">User</span>
        <h1 className="auth-heading">Create account</h1>
        <p className="auth-subheading">Join us and explore the food reel feed</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-input"
              placeholder="John"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-input"
              placeholder="Doe"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
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

          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/user/login">Sign in</Link>
        </p>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line"></div>
        </div>

        <p className="auth-footer">
          Own a restaurant?{' '}
          <Link to="/food-partner/register">Register as Food Partner</Link>
        </p>

      </div>
    </div>
  );
};

export default UserRegister;
