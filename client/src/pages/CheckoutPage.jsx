// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    pickupLocation: '123 Main Street, Anytown, USA',
    pickupTime: 'Tomorrow, 2:00 PM - 3:00 PM',
    specialInstructions: ''
  });

  const orderItems = [
    { title: 'Fresh Bread Loaf', quantity: 1 },
    { title: 'Carton of Milk', quantity: 1 }
  ];

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmOrder = () => {
    // Generate random order ID
    const orderId = '#' + Math.floor(Math.random() * 100000);
    navigate('/order-success', { state: { orderId, orderItems, orderData } });
  };

  return (
    <div className="checkout-mobile">
      <div className="checkout-header">
        <button className="close-btn" onClick={() => navigate(-1)}>
          ×
        </button>
        <h1>Confirm Your Order</h1>
      </div>

      <div className="checkout-content">
        <div className="pickup-details">
          <h3>Pickup Details</h3>
          
          <div className="detail-item">
            <div className="detail-icon">📍</div>
            <div className="detail-content">
              <div className="detail-label">Pickup Location</div>
              <div className="detail-value">{orderData.pickupLocation}</div>
              <button className="change-btn">Change</button>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">🕒</div>
            <div className="detail-content">
              <div className="detail-label">Pickup Time</div>
              <div className="detail-value">{orderData.pickupTime}</div>
              <button className="change-btn">Change</button>
            </div>
          </div>
        </div>

        <div className="special-instructions">
          <h3>Special Instructions</h3>
          <textarea
            name="specialInstructions"
            placeholder="e.g. Call upon arrival, leave at the front desk..."
            value={orderData.specialInstructions}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Total Items</span>
            <span>{orderItems.length}</span>
          </div>

          <div className="order-items">
            {orderItems.map((item, index) => (
              <div key={index} className="summary-item">
                <span>{item.quantity}x {item.title}</span>
              </div>
            ))}
          </div>

          <div className="estimated-pickup">
            <span>Estimated Pickup</span>
            <span>Tomorrow, 2-3 PM</span>
          </div>
        </div>

        <button className="confirm-order-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;