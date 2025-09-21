// src/pages/DonationDetails.jsx
import React  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './DonationDetails.css';

const DonationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Get donation data from navigation state or use mock data
  const donation = location.state?.donation || {
    _id: '1',
    title: 'Freshly Baked Bread',
    description: 'A delicious assortment of freshly baked bread from our local bakery. Perfect for sandwiches, toast, or enjoying on its own.',
    category: 'Food',
    quantity: '10 loaves',
    condition: 'Fresh',
    expiryDate: '2025-09-25',
    pickupLocation: '123 Main Street, Anytown',
    pickupTime: 'Available at the main entrance',
    donorName: 'Sophia Carter',
    donorType: 'Local Bakery Owner'
  };

  const handleAddToCart = () => {
    addToCart(donation);
    alert('Item added to cart!');
  };

  const handlePlaceOrder = () => {
    navigate('/order-confirmation', { state: { donation } });
  };

  const handleContact = () => {
    alert('Contact feature coming soon!');
  };

  return (
    <div className="donation-details-mobile">
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Donation Details</h1>
      </div>

      <div className="details-content">
        <div className="donation-image-container">
          <img 
            src="/api/placeholder/300/200" 
            alt={donation.title}
            className="donation-main-image"
          />
        </div>

        <div className="donation-info-card">
          <h2 className="donation-title">{donation.title}</h2>
          <p className="donation-description">{donation.description}</p>

          <div className="details-section">
            <h3>Details</h3>
            <div className="detail-row">
              <span className="detail-label">Category</span>
              <span className="detail-value">{donation.category}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Quantity</span>
              <span className="detail-value">{donation.quantity}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Pickup Instructions</span>
              <span className="detail-value">{donation.pickupTime}</span>
            </div>
          </div>

          <div className="donor-section">
            <h3>Donor</h3>
            <div className="donor-info">
              <div className="donor-avatar">
                <img src="/api/placeholder/50/50" alt="Donor" />
              </div>
              <div className="donor-details">
                <div className="donor-name">{donation.donorName}</div>
                <div className="donor-type">{donation.donorType}</div>
              </div>
              <button className="contact-btn" onClick={handleContact}>
                Contact
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;