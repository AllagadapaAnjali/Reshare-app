// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="logo-container">
          <div className="logo-square">
            <span className="logo-text">reshare</span>
          </div>
        </div>
        
        <h1 className="welcome-title">Welcome to Reshare</h1>
        
        <p className="welcome-description">
          Our mission is to reduce waste and help those in need by connecting 
          people with surplus food and household items to others in their community.
        </p>
        
        <button 
          className="get-started-btn"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
      
      <div className="welcome-background">
        <div className="food-items">
          <div className="food-item bread"></div>
          <div className="food-item bowl"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;