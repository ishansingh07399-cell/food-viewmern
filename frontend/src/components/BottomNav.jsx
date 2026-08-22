import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/bottom-nav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </NavLink>

      <NavLink to="/saved" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">🔖</span>
        <span className="nav-label">Saved</span>
      </NavLink>

      <NavLink to="/create-food" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon nav-icon--plus">＋</span>
        <span className="nav-label">Upload</span>
      </NavLink>

      <NavLink to="/food-partner/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">👤</span>
        <span className="nav-label">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
