// src/pages/MyDonations.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyDonations.css';

const MyDonations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Posted');

  // Mock data for donations
  const postedDonations = [
    {
      id: '1',
      title: 'Leftover Pizza',
      status: 'Pending',
      image: '/api/placeholder/60/60'
    },
    {
      id: '2',
      title: 'Extra Bread',
      status: 'Claimed',
      image: '/api/placeholder/60/60'
    },
    {
      id: '3',
      title: 'Unused Cleaning Supplies',
      status: 'Completed',
      image: '/api/placeholder/60/60'
    }
  ];

  const receivedDonations = [
    {
      id: '4',
      title: 'Fresh Produce',
      status: 'Pending',
      image: '/api/placeholder/60/60'
    },
    {
      id: '5',
      title: 'Canned Goods',
      status: 'Received',
      image: '/api/placeholder/60/60'
    },
    {
      id: '6',
      title: 'Baby Clothes',
      status: 'Completed',
      image: '/api/placeholder/60/60'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffc107';
      case 'Claimed':
        return '#17a2b8';
      case 'Received':
        return '#28a745';
      case 'Completed':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const handleEdit = (id) => {
    console.log('Edit donation:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete donation:', id);
  };

  const handleConfirmReceipt = (id) => {
    console.log('Confirm receipt:', id);
    alert('Receipt confirmed!');
  };

  const handleGiveFeedback = (id) => {
    console.log('Give feedback for:', id);
    alert('Feedback feature coming soon!');
  };

  return (
    <div className="my-donations-mobile">
      <div className="donations-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>My Donations</h1>
      </div>

      <div className="donations-content">
        <div className="tab-selector">
          <button
            className={`tab ${activeTab === 'Posted' ? 'active' : ''}`}
            onClick={() => setActiveTab('Posted')}
          >
            Posted Donations
          </button>
          <button
            className={`tab ${activeTab === 'Received' ? 'active' : ''}`}
            onClick={() => setActiveTab('Received')}
          >
            Received Donations
          </button>
        </div>

        <div className="donations-list">
          {activeTab === 'Posted' && (
            <>
              {postedDonations.map((donation) => (
                <div key={donation.id} className="donation-card">
                  <div className="donation-image">
                    <img src={donation.image} alt={donation.title} />
                  </div>
                  
                  <div className="donation-details">
                    <h3 className="donation-title">{donation.title}</h3>
                    <span
                      className="donation-status"
                      style={{ backgroundColor: getStatusColor(donation.status) }}
                    >
                      {donation.status}
                    </span>
                  </div>
                  
                  <div className="donation-actions">
                    <button
                      className="action-icon edit"
                      onClick={() => handleEdit(donation.id)}
                    >
                      ✏️
                    </button>
                    <button
                      className="action-icon delete"
                      onClick={() => handleDelete(donation.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'Received' && (
            <>
              {receivedDonations.map((donation) => (
                <div key={donation.id} className="donation-card">
                  <div className="donation-image">
                    <img src={donation.image} alt={donation.title} />
                  </div>
                  
                  <div className="donation-details">
                    <h3 className="donation-title">{donation.title}</h3>
                    <span
                      className="donation-status"
                      style={{ backgroundColor: getStatusColor(donation.status) }}
                    >
                      {donation.status}
                    </span>
                  </div>
                  
                  <div className="donation-actions">
                    {donation.status === 'Pending' && (
                      <button
                        className="confirm-btn"
                        onClick={() => handleConfirmReceipt(donation.id)}
                      >
                        Confirm Receipt
                      </button>
                    )}
                    {donation.status === 'Received' && (
                      <button
                        className="feedback-btn"
                        onClick={() => handleGiveFeedback(donation.id)}
                      >
                        Give Feedback
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
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
        <div className="nav-item">
          <div className="nav-icon">💬</div>
          <span>Messages</span>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">👤</div>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default MyDonations;