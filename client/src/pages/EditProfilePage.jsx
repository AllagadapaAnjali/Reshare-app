// src/pages/EditProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Jane Doe',
    email: user?.email || 'jane.doe@example.com',
    phone: '123-456-7890',
    location: 'San Francisco, CA'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, you'd update the user profile here
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-profile-mobile">
      <div className="edit-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Edit Profile</h1>
      </div>

      <div className="edit-content">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            <img src="/api/placeholder/100/100" alt="Profile" className="avatar-image" />
            <button className="edit-avatar-btn">📷</button>
          </div>
        </div>

        <form className="edit-form">
          <div className="form-group">
            <label>Name</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-container">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <div className="input-container">
              <span className="input-icon">📍</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="password-section">
            <button type="button" className="update-password-btn">
              Update Password
              <span className="arrow">›</span>
            </button>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;