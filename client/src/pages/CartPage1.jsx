// src/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Mock cart data if empty for demonstration
  const cartItems = cart.length > 0 ? cart : [
    {
      _id: '1',
      title: 'Canned Tomatoes',
      category: 'Food',
      quantity: '2',
      image: '/api/placeholder/60/60'
    },
    {
      _id: '2',
      title: 'Bread Loaf',
      category: 'Food',
      quantity: '1',
      image: '/api/placeholder/60/60'
    },
    {
      _id: '3',
      title: 'Apples',
      category: 'Food',
      quantity: '3',
      image: '/api/placeholder/60/60'
    },
    {
      _id: '4',
      title: 'Laundry Detergent',
      category: 'Household',
      quantity: '1',
      image: '/api/placeholder/60/60'
    }
  ];

  const totalItems = cartItems.length;

  const handleQuantityChange = (id, change) => {
    // In a real app, you'd update quantity here
    console.log(`Update quantity for item ${id} by ${change}`);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-mobile">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>My Cart</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img src={item.image || "/api/placeholder/60/60"} alt={item.title} />
              </div>
              
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-quantity">Quantity: {item.quantity}</p>
              </div>
              
              <div className="item-actions">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >
                    -
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          
          <div className="pickup-info">
            <div className="pickup-location">
              <strong>123 Main St, Anytown USA</strong>
            </div>
            <div className="pickup-availability">
              Available: Mon-Fri, 9am-5pm
            </div>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;