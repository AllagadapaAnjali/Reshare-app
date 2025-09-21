// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Home1.css';

const Home = () => {
  const [donations, setDonations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('New York, NY');
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donations');
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  const categories = ['All', 'Food', 'Household', 'Clothes'];

  const filteredDonations = donations.filter(donation => {
    const matchesCategory = selectedCategory === 'All' || 
      donation.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMoreInfo = (donationId) => {
    navigate(`/donation/${donationId}`);
  };

  const handleAddToCart = (donation) => {
    if (!isAuthenticated) {
      alert('Please log in to add items to cart.');
      navigate('/login');
      return;
    }
    addToCart(donation);
    alert('Item added to cart');
  };

  const handlePlaceOrder = (donation) => {
    if (!isAuthenticated) {
      alert('Please log in to place order.');
      navigate('/login');
      return;
    }
    navigate('/donation-details', { state: { donation } });
  };

  return (
    <div className="home-mobile">
      {/* Header */}
      <div className="home-header">
        <div className="header-top">
          <div className="app-title">
            <span className="app-logo">Reshare</span>
          </div>
          <div className="header-icons">
            <div className="notification-icon">🔔</div>
            <div className="cart-icon" onClick={() => navigate('/cart')}>🛒</div>
          </div>
        </div>
        
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="location-dropdown">
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="New York, NY">New York, NY</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
              <option value="Chicago, IL">Chicago, IL</option>
            </select>
          </div>
        </div>
        
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="home-content">
        <div className="donations-list">
          {filteredDonations.map(donation => (
            <div key={donation._id} className="donation-item">
              <div className="donation-image">
                <img src="/api/placeholder/80/80" alt={donation.title} />
              </div>
              
              <div className="donation-info">
                <div className="donation-category">{donation.category.toUpperCase()}</div>
                <h3 className="donation-title">{donation.title}</h3>
                <p className="donation-description">{donation.description}</p>
                
                <div className="donation-actions">
                  <button 
                    className="action-btn secondary"
                    onClick={() => handleMoreInfo(donation._id)}
                  >
                    More Info
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => handleAddToCart(donation)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="action-btn primary"
                    onClick={() => handlePlaceOrder(donation)}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Floating Post Button */}
        <button 
          className="floating-post-btn"
          onClick={() => navigate('/post')}
        >
          + Post Donation
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/messages')}>
          <div className="nav-icon">💬</div>
          <span>Messages</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/post')}>
          <div className="nav-icon">📝</div>
          <span>Post</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/cart')}>
          <div className="nav-icon">🛒</div>
          <span>Cart</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/profile')}>
          <div className="nav-icon">👤</div>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Home;