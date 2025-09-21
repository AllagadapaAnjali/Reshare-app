// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock user data if not available
  const userData = user || {
    name: 'Sophia Carter',
    email: 'sophia.carter@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    joinDate: '2022'
  };

  return (
    <div className="profile-mobile">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Profile & Settings</h1>
      </div>

      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="/api/placeholder/100/100" alt="Profile" />
            <button className="edit-avatar-btn">📷</button>
          </div>
          
          <h2 className="profile-name">{userData.name}</h2>
          <p className="profile-join-date">Joined {userData.joinDate}</p>
          <p className="profile-location">📍 {userData.location}</p>
        </div>

        <div className="account-section">
          <h3>Account Information</h3>
          
          <div className="info-item">
            <div className="info-icon">👤</div>
            <div className="info-content">
              <div className="info-label">Name</div>
              <div className="info-value">{userData.name}</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-content">
              <div className="info-label">Email</div>
              <div className="info-value">{userData.email}</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📱</div>
            <div className="info-content">
              <div className="info-label">Phone</div>
              <div className="info-value">{userData.phone}</div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <div className="info-label">Location</div>
              <div className="info-value">{userData.location}</div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Settings</h3>
          
          <div className="setting-item" onClick={handleEditProfile}>
            <div className="setting-icon">👤</div>
            <span className="setting-label">Edit Profile</span>
            <span className="setting-arrow">›</span>
          </div>

          <div className="setting-item">
            <div className="setting-icon">🔔</div>
            <span className="setting-label">Notifications</span>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-icon">🔒</div>
            <span className="setting-label">Privacy</span>
            <span className="setting-arrow">›</span>
          </div>

          <div className="setting-item" onClick={() => navigate('/my-donations')}>
            <div className="setting-icon">📈</div>
            <span className="setting-label">Donation History</span>
            <span className="setting-arrow">›</span>
          </div>

          <div className="setting-item logout" onClick={handleLogout}>
            <div className="setting-icon">🚪</div>
            <span className="setting-label">Log Out</span>
            <span className="setting-arrow">›</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;