import React, { useState } from 'react';
import { useCart } from '../context/CartContext';


const ShipmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
  });
  const { clearCart } = useCart();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    alert("Order placed successfully!");
    // Clear cart
    // localStorage.removeItem("cart");
    clearCart();
  };

  return (
    <div className="shipment-form">
      <h2>Shipment Details</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleOrder(); }}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input name="address" placeholder="Full Address" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="landmark" placeholder="Landmark" onChange={handleChange} />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default ShipmentPage;
