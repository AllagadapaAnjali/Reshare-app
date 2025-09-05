// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';

// const CartIcon = () => {
//   return (
//     <Link to="/cart" style={{ color: '#000', textDecoration: 'none' }}>
//       <FaShoppingCart size={24} />
//     </Link>
//   );
// };

// export default CartIcon;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';

// const CartIcon = () => {
//   return (
//     <Link to="/cart" style={{ color: '#000', textDecoration: 'none' }}>
//       <FaShoppingCart size={24} />
//     </Link>
//   );
// };


// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const CartIcon = () => {
//   const { cartItems } = useCart();
//   return (
//     <Link to="/cart">
//     🛒 <span>{cartItems.length}</span>
//     </Link>
    
//   );
// };


// export default CartIcon;


import React from 'react';
import { Link } from 'react-router-dom';
// import { FaShoppingCart } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart" style={{ color: '#000', textDecoration: 'none', position: 'relative' }}>
      <FaCartPlus size={24} />
      {cart.length > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px'
          }}
        >
          {cart.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
