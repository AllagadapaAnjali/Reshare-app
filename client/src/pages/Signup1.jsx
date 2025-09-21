// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const res = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setErrors({ general: data.message || "Signup failed" });
      }
    } catch (err) {
      setErrors({ general: "Server error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    alert(`${provider} signup not implemented yet`);
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="logo-container">
          <div className="logo-square">
            <span className="logo-text">reshare</span>
          </div>
        </div>
        
        <h1 className="signup-title">Join Reshare</h1>
        <p className="signup-subtitle">
          Create an account to start sharing and receiving donations in your community.
        </p>
        
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        
        <form onSubmit={handleSignup} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`signup-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`signup-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`signup-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="divider">
          <span>Or continue with</span>
        </div>
        
        <div className="social-buttons">
          <button 
            className="social-btn facebook-btn"
            onClick={() => handleSocialSignup('Facebook')}
          >
            <span className="social-icon">f</span>
            Facebook
          </button>
          
          <button 
            className="social-btn google-btn"
            onClick={() => handleSocialSignup('Google')}
          >
            <span className="social-icon">G</span>
            Google
          </button>
        </div>
        
        <p className="login-link">
          Already have an account? 
          <span onClick={() => navigate("/login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;