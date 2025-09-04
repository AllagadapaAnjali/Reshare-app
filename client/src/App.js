import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import PostDonation from "./pages/PostDonation";
import AdminDashboard from "./pages/AdminDashboard";
import DonationDetails from "./pages/DonationDetails";
import CartPage from "./pages/CartPage";
import ShipmentPage from "./pages/ShipmentPage";
import CartIcon from "./components/CartIcon";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css';
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <nav style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f7f7'
      }}>
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '2rem' }}>ReShare</span>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/post" style={{ marginRight: '1rem' }}>Post Donation</Link>
              <Link to="/admin" style={{ marginRight: '1rem' }}>Admin Dashboard</Link>
            </>
          )}
        </div>

        <div>
          {isAuthenticated ? (
            <>
              <CartIcon />
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<ProtectedRoute element={<PostDonation />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/donation/:id" element={<ProtectedRoute element={<DonationDetails />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
          <Route path="/shipment" element={<ProtectedRoute element={<ShipmentPage />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;