// // import React, { useState } from "react";
// // import axios from "axios";
// // import { locationData } from "../data/locationData";



// // const PostDonation = () => {
  
// //   const [form, setForm] = useState({
// //     title: "",
// //     category: "food",
// //     quantity: 1,
// //     description: "",
// //     condition: "",
// //     expiryDate: "",
// //     donorId: "test-donor",
// //     state: "",
// //     city: "",
// //     location: {
// //       lat: 12.9716,
// //       lng: 77.5946,
// //     },
// //   });

  
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "quantity") {
// //       setForm({ ...form, [name]: parseInt(value) });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   const handleStateChange = (e) => {
// //     const selectedState = e.target.value;
// //     setForm({ ...form, state: selectedState, city: "" }); // reset city
// //   };
  



// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/donations", form);
// //       alert("Donation posted!");
// //       console.log(res.data);
// //     } catch (err) {
// //       console.error("POST error:", err.response?.data || err.message);
// //       alert("Error posting donation");
// //     }
// //   };



// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         name="title"
// //         placeholder="Title"
// //         onChange={handleChange}
// //         value={form.title}
// //       />

// //       <select name="category" onChange={handleChange} value={form.category}>
// //         <option value="food">Food</option>
// //         <option value="clothes">Clothes</option>
// //         <option value="household">Household</option>
// //         <option value="other">Other</option>
// //       </select>

// //       <input
// //         name="quantity"
// //         type="number"
// //         placeholder="Quantity"
// //         onChange={handleChange}
// //         value={form.quantity}
// //       />

// //       <textarea
// //         name="description"
// //         placeholder="Description"
// //         onChange={handleChange}
// //         value={form.description}
// //       />

// //       <input
// //         name="condition"
// //         placeholder="Condition"
// //         onChange={handleChange}
// //         value={form.condition}
// //       />

// //       <input
// //         name="expiryDate"
// //         type="date"
// //         onChange={handleChange}
// //         value={form.expiryDate}
// //       />

// //       {/* STATE Dropdown */}
// //       <select name="state" value={form.state} onChange={handleStateChange}>
// //         <option value="">Select State</option>
// //         {Object.keys(locationData).map((state) => (
// //           <option key={state} value={state}>
// //             {state}
// //           </option>
// //         ))}
// //       </select>

// //       {/* CITY Dropdown */}
// //       <select
// //         name="city"
// //         value={form.city}
// //         onChange={handleChange}
// //         disabled={!form.state}
// //       >
// //         <option value="">Select City</option>
// //         {form.state &&
// //           locationData[form.state].map((city) => (
// //             <option key={city} value={city}>
// //               {city}
// //             </option>
// //           ))}
// //       </select>

// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // };

// // export default PostDonation;

// import React, { useState } from "react";
// import axios from "axios";
// import { locationData } from "../data/locationData";
// import { useAuth } from "../context/AuthContext";

// const PostDonation = () => {
//   const { user } = useAuth();

//   const [form, setForm] = useState({
//     title: "",
//     category: "food",
//     quantity: 1,
//     description: "",
//     condition: "",
//     expiryDate: "",
//     state: "",
//     city: "",
//     location: {
//       lat: 12.9716,
//       lng: 77.5946,
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: name === "quantity" ? parseInt(value) : value });
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setForm({ ...form, state: selectedState, city: "" });
//   };

//   console.log("Logged-in user info:", user);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!user) {
//     alert("Please login before posting a donation.");
//     return;
//   }

//   const donationData = {
//     ...form,
//     donorId: user?._id,
//     donorName: user?.name,
//   };

//   try {
//     const response = await axios.post("http://localhost:5000/api/donations", donationData);
//     alert("Donation posted!");
//     console.log(response.data);
//   // } catch (err) {
//   //   console.error("POST error:", err.response?.data || err.message);
//   //   alert("Error posting donation");
//   // }
//   } catch (err) {
//   console.error("POST error:", err.response?.data || err.message);
//   alert("Error posting donation: " + (err.response?.data?.message || err.message));
// }
// };


//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="title"
//         placeholder="Title"
//         onChange={handleChange}
//         value={form.title}
//       />

//       <select name="category" onChange={handleChange} value={form.category}>
//         <option value="food">Food</option>
//         <option value="clothes">Clothes</option>
//         <option value="household">Household</option>
//         <option value="other">Other</option>
//       </select>

//       <input
//         name="quantity"
//         type="number"
//         placeholder="Quantity"
//         onChange={handleChange}
//         value={form.quantity}
//       />

//       <textarea
//         name="description"
//         placeholder="Description"
//         onChange={handleChange}
//         value={form.description}
//       />

//       <input
//         name="condition"
//         placeholder="Condition"
//         onChange={handleChange}
//         value={form.condition}
//       />

//       <input
//         name="expiryDate"
//         type="date"
//         onChange={handleChange}
//         value={form.expiryDate}
//       />

//       {/* STATE Dropdown */}
//       <select name="state" value={form.state} onChange={handleStateChange}>
//         <option value="">Select State</option>
//         {Object.keys(locationData).map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>

//       {/* CITY Dropdown */}
//       <select
//         name="city"
//         value={form.city}
//         onChange={handleChange}
//         disabled={!form.state}
//       >
//         <option value="">Select City</option>
//         {form.state &&
//           locationData[form.state].map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//       </select>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PostDonation;


// import React, { useState } from "react";
// import axios from "axios";
// import { locationData } from "../data/locationData";



// const PostDonation = () => {
//   const [form, setForm] = useState({
//     title: "",
//     category: "food",
//     quantity: 1,
//     description: "",
//     condition: "",
//     expiryDate: "",
//     donorId: "test-donor",
//     state: "",
//     city: "",
//     location: {
//       lat: 12.9716,
//       lng: 77.5946,
//     },
//   });

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "quantity") {
//       setForm({ ...form, [name]: parseInt(value) });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setForm({ ...form, state: selectedState, city: "" }); // reset city
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/donations", form);
//       alert("Donation posted!");
//       console.log(res.data);
//     } catch (err) {
//       console.error("POST error:", err.response?.data || err.message);
//       alert("Error posting donation");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="title"
//         placeholder="Title"
//         onChange={handleChange}
//         value={form.title}
//       />

//       <select name="category" onChange={handleChange} value={form.category}>
//         <option value="food">Food</option>
//         <option value="clothes">Clothes</option>
//         <option value="household">Household</option>
//         <option value="other">Other</option>
//       </select>

//       <input
//         name="quantity"
//         type="number"
//         placeholder="Quantity"
//         onChange={handleChange}
//         value={form.quantity}
//       />

//       <textarea
//         name="description"
//         placeholder="Description"
//         onChange={handleChange}
//         value={form.description}
//       />

//       <input
//         name="condition"
//         placeholder="Condition"
//         onChange={handleChange}
//         value={form.condition}
//       />

//       <input
//         name="expiryDate"
//         type="date"
//         onChange={handleChange}
//         value={form.expiryDate}
//       />

//       {/* STATE Dropdown */}
//       <select name="state" value={form.state} onChange={handleStateChange}>
//         <option value="">Select State</option>
//         {Object.keys(locationData).map((state) => (
//           <option key={state} value={state}>
//             {state}
//           </option>
//         ))}
//       </select>

//       {/* CITY Dropdown */}
//       <select
//         name="city"
//         value={form.city}
//         onChange={handleChange}
//         disabled={!form.state}
//       >
//         <option value="">Select City</option>
//         {form.state &&
//           locationData[form.state].map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//       </select>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PostDonation;

// import React, { useState } from "react";

// const PostDonation = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("food");
//   const [quantity, setQuantity] = useState(1);
//   const [description, setDescription] = useState("");
//   const [condition, setCondition] = useState("Good");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [location, setLocation] = useState({ lat: "", lng: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const donationData = {
//       title,
//       category,
//       quantity,
//       description,
//       condition,
//       expiryDate,
//       state,
//       city,
//       location,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/donations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(donationData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to post donation");
//       }

//       alert("Donation posted successfully!");
//     } catch (error) {
//       console.error("Error posting donation:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Post Donation</h2>
//       <form onSubmit={handleSubmit}>
//         <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="food">Food</option>
//           <option value="clothes">Clothes</option>
//           <option value="household">Household</option>
//           <option value="other">Other</option>
//         </select>
//         <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
//         <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
//         <input value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Condition" />
//         <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
//         <input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
//         <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
//         <input type="number" value={location.lat} onChange={(e) => setLocation({ ...location, lat: e.target.value })} placeholder="Latitude" />
//         <input type="number" value={location.lng} onChange={(e) => setLocation({ ...location, lng: e.target.value })} placeholder="Longitude" />
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// };

// export default PostDonation;

// import React, { useState } from "react";
// import axios from "axios";

// function PostDonation() {
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     quantity: "",
//     description: "",
//     condition: "",
//     expiryDate: "",
//     state: "",
//     city: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/donations", formData);
//       alert("Donation posted successfully!");
//     } catch (error) {
//       console.error("Error posting donation:", error);
//       alert("Error posting donation");
//     }
//   };

//   return (
//     <div className="post-donation">
//       <h2>Post a Donation</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="title" placeholder="Title" onChange={handleChange} required />
//         <input name="category" placeholder="Category" onChange={handleChange} required />
//         <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
//         <textarea name="description" placeholder="Description" onChange={handleChange} required />
//         <input name="condition" placeholder="Condition" onChange={handleChange} />
//         <input name="expiryDate" type="date" onChange={handleChange} />
//         <input name="state" placeholder="State" onChange={handleChange} />
//         <input name="city" placeholder="City" onChange={handleChange} />
//         <input name="location" placeholder="Location" onChange={handleChange} />
//         <button type="submit">Post Donation</button>
//       </form>
//     </div>
//   );
// }

// export default PostDonation;



import React, { useState } from "react";
import axios from "axios";
import { locationData } from "../data/locationData"; // state → city data

function PostDonation() {
  const [form, setForm] = useState({
    title: "",
    category: "food",
    quantity: 1,
    description: "",
    condition: "",
    expiryDate: "",
    donorId: "test-donor", // later replace with logged-in donor
    state: "",
    city: "",
    location: {
      lat: 12.9716, // default
      lng: 77.5946,
    },
  });

  // Generic input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      setForm({ ...form, [name]: parseInt(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // State dropdown change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setForm({ ...form, state: selectedState, city: "" }); // reset city
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reshare-backend.onrender.com/api/donations", form);
      alert("Donation posted successfully!");
    } catch (error) {
      console.error("Error posting donation:", error.response?.data || error);
      alert("Error posting donation");
    }
  };

  return (
    <div className="post-donation">
      <h2>Post a Donation</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={form.title}
          required
        />

        {/* Category dropdown */}
        <select
          name="category"
          onChange={handleChange}
          value={form.category}
        >
          <option value="food">Food</option>
          <option value="clothes">Clothes</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
          value={form.quantity}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          required
        />

        <input
          name="condition"
          placeholder="Condition"
          onChange={handleChange}
          value={form.condition}
        />

        <input
          name="expiryDate"
          type="date"
          onChange={handleChange}
          value={form.expiryDate}
        />

        {/* State Dropdown */}
        <select name="state" value={form.state} onChange={handleStateChange}>
          <option value="">Select State</option>
          {Object.keys(locationData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          disabled={!form.state}
        >
          <option value="">Select City</option>
          {form.state &&
            locationData[form.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        <button type="submit">Post Donation</button>
      </form>
    </div>
  );
}

export default PostDonation;
