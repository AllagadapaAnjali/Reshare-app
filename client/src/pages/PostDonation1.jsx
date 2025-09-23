// // src/pages/PostDonation.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { locationData } from "../data/locationData";
// import './PostDonation.css';

// const PostDonation = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
  
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "Food",
//     description: "",
//     quantity: "",
//     condition: "Good",
//     expiryDate: "",
//     pickupLocation: "",
//     pickupTime: "",
//     state: "",
//     city: "",
//     images: []
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       state: selectedState,
//       city: "" // Reset city when state changes
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: files
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = "Title is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";
//     if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
//     if (!formData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required";
//     if (!formData.state) newErrors.state = "State is required";
//     if (!formData.city) newErrors.city = "City is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);

//     // Prepare donation data matching your backend model
//     const donationData = {
//       title: formData.title.trim(),
//       category: formData.category.toLowerCase(),
//       description: formData.description.trim(),
//       quantity: parseInt(formData.quantity) || 1,
//       condition: formData.condition,
//       expiryDate: formData.expiryDate || null,
//       state: formData.state,
//       city: formData.city,
//       pickupLocation: formData.pickupLocation.trim(),
//       pickupTime: formData.pickupTime,
//       location: {
//         lat: 40.7128, // Default coordinates - you can add geolocation later
//         lng: -74.0060
//       },
//       donorId: user?._id || 'anonymous',
//       donorName: user?.name || 'Anonymous User',
//       status: 'open',
//       postedAt: new Date().toISOString()
//     };

//     try {
//       console.log('Sending donation data:', donationData); // Debug log

//       // const response = await fetch('http://localhost:5000/api/donations', 
//       const response = await fetch('https://reshare-backend-s5na.onrender.com/api/donations',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(donationData),
//       });

//       const result = await response.json();
      
//       console.log('Server response:', result); // Debug log

//       if (response.ok) {
//         alert('Donation posted successfully!');
//         navigate('/home');
//       } else {
//         console.error('Server error:', result);
//         setErrors({ general: result.message || result.error || 'Failed to post donation' });
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       setErrors({ general: 'Network error. Please check if the server is running.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="post-donation-responsive">
//       <div className="post-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ←
//         </button>
//         <h1>Post a Donation</h1>
//       </div>

//       <div className="post-content">
//         {errors.general && (
//           <div className="error-message">{errors.general}</div>
//         )}

//         <form onSubmit={handleSubmit} className="donation-form">
//           <div className="form-group">
//             <label>Item Name *</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="e.g. Sourdough Bread"
//               value={formData.title}
//               onChange={handleInputChange}
//               className={errors.title ? 'error' : ''}
//             />
//             {errors.title && <span className="field-error">{errors.title}</span>}
//           </div>

//           <div className="form-group">
//             <label>Category *</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <option value="Food">Food</option>
//               <option value="Household">Household</option>
//               <option value="Clothes">Clothes</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Description *</label>
//             <textarea
//               name="description"
//               placeholder="Tell us more about the item..."
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               className={errors.description ? 'error' : ''}
//             />
//             {errors.description && <span className="field-error">{errors.description}</span>}
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Quantity *</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 placeholder="e.g. 2"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 min="1"
//                 className={errors.quantity ? 'error' : ''}
//               />
//               {errors.quantity && <span className="field-error">{errors.quantity}</span>}
//             </div>
            
//             <div className="form-group">
//               <label>Condition</label>
//               <select
//                 name="condition"
//                 value={formData.condition}
//                 onChange={handleInputChange}
//               >
//                 <option value="Excellent">Excellent</option>
//                 <option value="Good">Good</option>
//                 <option value="Fair">Fair</option>
//                 <option value="New">New</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Expiration Date (if applicable)</label>
//             <input
//               type="date"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleInputChange}
//               min={new Date().toISOString().split('T')[0]}
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>State *</label>
//               <select
//                 name="state"
//                 value={formData.state}
//                 onChange={handleStateChange}
//                 className={errors.state ? 'error' : ''}
//               >
//                 <option value="">Select State</option>
//                 {Object.keys(locationData).map((state) => (
//                   <option key={state} value={state}>
//                     {state}
//                   </option>
//                 ))}
//               </select>
//               {errors.state && <span className="field-error">{errors.state}</span>}
//             </div>

//             <div className="form-group">
//               <label>City *</label>
//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 disabled={!formData.state}
//                 className={errors.city ? 'error' : ''}
//               >
//                 <option value="">Select City</option>
//                 {formData.state &&
//                   locationData[formData.state]?.map((city) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))}
//               </select>
//               {errors.city && <span className="field-error">{errors.city}</span>}
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Pickup Location *</label>
//             <input
//               type="text"
//               name="pickupLocation"
//               placeholder="e.g. 123 Main St, or 'Available at front door'"
//               value={formData.pickupLocation}
//               onChange={handleInputChange}
//               className={errors.pickupLocation ? 'error' : ''}
//             />
//             {errors.pickupLocation && <span className="field-error">{errors.pickupLocation}</span>}
//           </div>

//           <div className="form-group">
//             <label>Preferred Pickup Time</label>
//             <input
//               type="text"
//               name="pickupTime"
//               placeholder="e.g. 5:00 PM - 7:00 PM, or 'Weekdays after 6 PM'"
//               value={formData.pickupTime}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Upload Images (Optional)</label>
//             <div className="image-upload">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 id="image-upload"
//                 hidden
//               />
//               <label htmlFor="image-upload" className="upload-label">
//                 <div className="upload-icon">📷</div>
//                 <span>
//                   {formData.images.length > 0 
//                     ? `${formData.images.length} image(s) selected` 
//                     : 'Tap to upload images'}
//                 </span>
//               </label>
//             </div>
//           </div>

//           <button 
//             type="submit" 
//             className="submit-btn"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Posting...' : 'Post Donation'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostDonation;


// src/pages/PostDonation.jsx - FIXED VERSION
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { locationData } from "../data/locationData";
import './PostDonation.css';

const PostDonation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "food", // lowercase to match backend
    description: "",
    quantity: 1,
    condition: "Good",
    expiryDate: "",
    state: "",
    city: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get API URL from environment or use localhost
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Handle quantity as number
    if (name === 'quantity') {
      processedValue = parseInt(value) || 1;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData(prev => ({
      ...prev,
      state: selectedState,
      city: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = "Valid quantity is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});

    // Create payload matching your backend model exactly
    const donationPayload = {
      title: formData.title.trim(),
      category: formData.category, // Keep as is - your backend expects lowercase
      description: formData.description.trim(),
      quantity: formData.quantity,
      condition: formData.condition,
      expiryDate: formData.expiryDate || undefined,
      state: formData.state,
      city: formData.city,
      location: {
        lat: 12.9716, // Default Bangalore coordinates
        lng: 77.5946
      },
      // donorId: user?._id || "test-donor", // Fallback for testing
      donorId: user?._id || undefined, // Make optional if user not logged in
      status: "open"
    };

    try {
      console.log('Posting to:', `${API_URL}/api/donations`);
      console.log('Payload:', donationPayload);

      const response = await fetch(`${API_URL}/api/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationPayload),
      });

      console.log('Response status:', response.status);
      
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        alert('Donation posted successfully!');
        navigate('/home');
      } else {
        console.error('Server error response:', responseData);
        setErrors({ 
          general: responseData.message || responseData.error || 'Failed to post donation. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Network/Parse error:', error);
      setErrors({ 
        general: 'Unable to connect to server. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-donation-container">
      <div className="post-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <h1>Post a Donation</h1>
      </div>

      <div className="post-content">
        {errors.general && (
          <div className="error-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-section">
            <h2>Item Information</h2>
            
            <div className="form-group">
              <label htmlFor="title">Item Name *</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g., Fresh Bread Loaf"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? 'error' : ''}
                maxLength="100"
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="food">Food</option>
                  <option value="household">Household Items</option>
                  <option value="clothes">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className={errors.quantity ? 'error' : ''}
                />
                {errors.quantity && <span className="field-error">{errors.quantity}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe the item, its condition, and any special instructions..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={errors.description ? 'error' : ''}
                maxLength="500"
              />
              <small className="char-count">{formData.description.length}/500</small>
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="New">New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date (if applicable)</label>
                <input
                  id="expiryDate"
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className={errors.state ? 'error' : ''}
                >
                  <option value="">Select State</option>
                  {Object.keys(locationData).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="field-error">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!formData.state}
                  className={errors.city ? 'error' : ''}
                >
                  <option value="">Select City</option>
                  {formData.state &&
                    locationData[formData.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
                {errors.city && <span className="field-error">{errors.city}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" width="16" height="16" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"/>
                  </svg>
                  Posting...
                </>
              ) : (
                'Post Donation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDonation;