import React, { useEffect, useState } from 'react';
import axios from 'axios';

// const API = process.env.REACT_APP_API_URL;
const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get(`${API}/api/donations`);
      const res = await axios.get(`http://localhost:5000/api/donations`);
      setDonations(res.data);
    };
    fetchData();
  }, []);

  const getCategoryCounts = () => {
    const counts = {};
    donations.forEach(d => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="stats">
        {Object.keys(categoryCounts).map(cat => (
          <p key={cat}>{cat}: {categoryCounts[cat]}</p>
        ))}
        <p>Total Donations: {donations.length}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
