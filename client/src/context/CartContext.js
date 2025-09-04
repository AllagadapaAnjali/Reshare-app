// // src/context/CartContext.js
// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     setCartItems((prevItems) => {
//       const exists = prevItems.find((i) => i._id === item._id);
//       return exists ? prevItems : [...prevItems, item];
//     });
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((i) => i._id !== itemId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (donation) => {
    setCart((prevCart) => [...prevCart, donation]);
  };

  const removeFromCart = (donationId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== donationId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

