// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    alert(`${provider} login not implemented yet`);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <div className="logo-square">
            <span className="logo-text">reshare</span>
          </div>
        </div>
        
        <h1 className="login-title">Welcome to Reshare</h1>
        <p className="login-subtitle">
          Join our community to share and receive leftover food and household items.
        </p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          
          <div className="forgot-password">
            <span onClick={() => alert('Forgot password feature coming soon!')}>
              Forgot password?
            </span>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="divider">
          <span>Or continue with</span>
        </div>
        
        <div className="social-buttons">
          <button 
            className="social-btn facebook-btn"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <span className="social-icon">f</span>
            Facebook
          </button>
          
          <button 
            className="social-btn google-btn"
            onClick={() => handleSocialLogin('Google')}
          >
            <span className="social-icon">G</span>
            Google
          </button>
        </div>
        
        <p className="signup-link">
          Don't have an account? 
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;