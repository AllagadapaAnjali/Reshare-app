// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login1";
import Signup from "./pages/Signup";
import Home from "./pages/Home1";
import PostDonation from "./pages/PostDonation1";
import DonationDetails from "./pages/DonationDetails1";
import CartPage from "./pages/CartPage1";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyDonations from "./pages/MyDonations";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import ShipmentPage from "./pages/ShipmentPage";

import { AuthContext } from "./context/AuthContext";
import './App1.css';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login1" />;
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/post" element={<ProtectedRoute element={<PostDonation />} />} />
          <Route path="/donation/:id" element={<ProtectedRoute element={<DonationDetails />} />} />
          <Route path="/donation-details" element={<ProtectedRoute element={<DonationDetails />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
          <Route path="/order-success" element={<ProtectedRoute element={<OrderSuccessPage />} />} />
          <Route path="/order-confirmation" element={<ProtectedRoute element={<OrderSuccessPage />} />} />
          <Route path="/my-donations" element={<ProtectedRoute element={<MyDonations />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfilePage />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/shipment" element={<ProtectedRoute element={<ShipmentPage />} />} />
          
          {/* Additional utility routes */}
          <Route path="/messages" element={<ProtectedRoute element={<div style={{padding: '2rem', textAlign: 'center'}}>Messages feature coming soon!</div>} />} />
          
          {/* Catch all route */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;