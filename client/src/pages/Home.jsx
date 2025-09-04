// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import './Home.css';

// const Home = () => {
//   const [donations, setDonations] = useState([]);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/donations');
//         setDonations(response.data);
//       } catch (error) {
//         console.error('Error fetching donations:', error);
//       }
//     };
//     fetchDonations();
//   }, []);

//   const handleMoreInfo = (donationId) => {
//     navigate(`/donation/${donationId}`);
//   };

//   const handleOrder = (donation) => {
//     navigate('/shipment', { state: { donation } });
//   };

//   const handleAddToCart = (donation) => {
//     addToCart(donation);
//   };

//   return (
//     <div className="home-container">
//       <h2>Available Donations</h2>
//       <div className="donation-list">
//         {donations.length === 0 ? (
//           <p>No donations available at the moment.</p>
//         ) : (
//           donations.map((donation) => (
//             <div className="donation-card" key={donation._id}>
//               {/* <h3>{donation.item}</h3>
//               <p>{donation.description}</p>
//               <p><strong>Posted by:</strong> {donation.postedBy?.name || 'Unknown'}</p> */}
//               <h3>{donation.title}</h3>
// <p>{donation.description}</p>
// <p>
//   <strong>Category:</strong> {donation.category}<br />
//   <strong>Quantity:</strong> {donation.quantity}<br />
//   <strong>Condition:</strong> {donation.condition || 'N/A'}<br />
//   <strong>City:</strong> {donation.city}, {donation.state}
// </p>

//               <div className="button-group">
//                 <button onClick={() => handleMoreInfo(donation._id)}>More Info</button>
//                 <button onClick={() => handleAddToCart(donation)}>Add to Cart</button>
//                 <button onClick={() => handleOrder(donation)}>Place Order</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // ✅ To access user email
import './Home.css';

const Home = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('https://reshare-backend.onrender.com/api/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };
    fetchDonations();
  }, []);

  // ✅ Persist cart to localStorage on change
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const handleMoreInfo = (donationId) => {
    navigate(`/donation/${donationId}`);
  };

  const handleOrder = (donation) => {
    navigate('/shipment', { state: { donation } });
  };

  const handleAddToCart = (donation) => {
    if (!user?.email) {
      alert('Please log in to add items to cart.');
      navigate('/login');
      return;
    }

    // Prevent duplicates
    const alreadyAdded = cart.some((item) => item._id === donation._id);
    if (alreadyAdded) {
      alert('Item already in cart');
      return;
    }

    addToCart(donation);
    alert('Item added to cart');
  };

  const handleLoginRedirect = () => {
    alert('Please log in to access this feature.');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h2>Available Donations</h2>
      <p className="home-subtitle">
  Share surplus food, clothes, and household items with those who need them most.
</p>
      <div className="donation-list">
        {donations.length === 0 ? (
          <p>No donations available at the moment.</p>
        ) : (
          donations.map((donation) => (
            <div className="donation-card" key={donation._id}>
              <h3>{donation.title}</h3>
              <p>{donation.description}</p>
              <p>
                <strong>Category:</strong> {donation.category}<br />
                <strong>Quantity:</strong> {donation.quantity}<br />
                <strong>Condition:</strong> {donation.condition || 'N/A'}<br />
                <strong>City:</strong> {donation.city}, {donation.state}
              </p>

              <div className="button-group">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => handleMoreInfo(donation._id)}>More Info</button>
                    <button onClick={() => handleAddToCart(donation)}>Add to Cart</button>
                    <button onClick={() => handleOrder(donation)}>Place Order</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleLoginRedirect}>More Info</button>
                    <button onClick={handleLoginRedirect}>Add to Cart</button>
                    <button onClick={handleLoginRedirect}>Place Order</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
