// src/pages/OrderSuccessPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { orderId = '#123456', orderItems = [], orderData = {} } = location.state || {};

  // Mock data if not provided
  const mockItems = [
    { title: 'Organic Apples', quantity: 2 },
    { title: 'Whole Wheat Bread', quantity: 1 },
    { title: 'Canned Tomatoes', quantity: 1 }
  ];

  const items = orderItems.length > 0 ? orderItems : mockItems;

  const handleViewOrders = () => {
    navigate('/my-donations');
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="order-success-mobile">
      <div className="success-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>Order Confirmation</h1>
      </div>

      <div className="success-content">
        <div className="success-icon">
          <div className="checkmark">✓</div>
        </div>

        <h2>Your order has been placed!</h2>
        <p className="success-message">
          Thank you for your order. Your order ID is <strong>{orderId}</strong>
        </p>

        <div className="order-summary-card">
          <h3>Order Summary</h3>
          
          {items.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-image">
                <img src="/api/placeholder/50/50" alt={item.title} />
              </div>
              <div className="item-info">
                <div className="item-title">{item.title}</div>
                <div className="item-quantity">Quantity: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="next-steps-card">
          <h3>Next Steps</h3>
          <p>
            Please contact the donor, <strong>Sarah Miller</strong>, at{' '}
            <span className="contact-info">(555) 123-4567</span> to arrange pickup.
          </p>
          <p>
            <strong>Pickup location:</strong> 123 Main St, Anytown.
          </p>
        </div>

        <div className="action-buttons">
          <button className="view-orders-btn" onClick={handleViewOrders}>
            View My Orders
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate('/home')}>
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🔍</div>
          <span>Search</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">📝</div>
          <span>Post</span>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">📦</div>
          <span>Orders</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/profile')}>
          <div className="nav-icon">👤</div>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;