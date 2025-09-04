import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DonationDetails = () => {
  const { id } = useParams(); // gets the ID from URL
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donations/${id}`);
        setDonation(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching donation details:', err);
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!donation) return <p>Donation not found.</p>;

  return (
    <div className="donation-details" style={{
      padding: '2rem',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      marginTop: '2rem'
    }}>
      <h2>{donation.title}</h2>
      <p><strong>Date:</strong> {donation.expiryDate}</p>
      <p><strong>Category:</strong> {donation.category}</p>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Description:</strong> {donation.description}</p>
      <p><strong>Condition:</strong> {donation.condition}</p>
      <p><strong>Status:</strong> {donation.status}</p>
      <p><strong>City:</strong> {donation.city}</p>
      <p><strong>State:</strong> {donation.state}</p>
    </div>
  );
};

export default DonationDetails;
