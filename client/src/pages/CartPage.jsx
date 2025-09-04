// import React, { useEffect, useState } from 'react';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCart);
//   }, []);

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         cartItems.map(item => (
//           <div key={item._id} className="donation-card">
//             <h3>{item.title}</h3>
//             <p>Category: {item.category}</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Status: {item.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      setCartItems(storedCart);
    }
  }, [user]);

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map(item => (
          <div
            key={item._id}
            className="donation-card"
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              position: 'relative'
            }}
          >
            <h3>{item.title}</h3>
            <p>Category: {item.category}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Status: {item.status}</p>

            <button
              onClick={() => handleDelete(item._id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                background: '#ff4d4d',
                color: '#fff',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <FaTrash />
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;

