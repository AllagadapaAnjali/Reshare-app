// // const express = require("express");
// // const router = express.Router();
// // const {
// //   createDonation,
// //   getDonations,
// // } = require("../controllers/donationController");

// // router.post("/", createDonation);
// // router.get("/", getDonations);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   createDonation,
//   getDonations,
// } = require("../controllers/donationController");

// const Donation = require("../models/Donation"); // ✅ Add this line to use Donation model

// // Create a new donation
// // router.post("/", createDonation);

// // Get all donations
// router.get("/", getDonations);

// // ✅ Get a single donation by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);
//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }
//     res.json(donation);
//   } catch (error) {
//     console.error("Error fetching donation by ID:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

// // router.post("/:id/notify-donor", async (req, res) => {
// //   try {
// //     const donation = await Donation.findById(req.params.id);
// //     if (!donation) return res.status(404).json({ message: "Donation not found" });

// //     // Simulated notification
// //     console.log(`Notify ${donation.donorName} (ID: ${donation.donorId}) that their donation was claimed`);

// //     res.status(200).json({ message: "Donor notified successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Failed to notify donor" });
// //   }
// // });

// router.post("/", async (req, res) => {
//   try {
//     const {
//       title,
//       category,
//       quantity,
//       description,
//       condition,
//       expiryDate,
//       state,
//       city,
//       location,
//       donorId,
//       donorName
//     } = req.body;

//     if (!donorId || !donorName) {
//       return res.status(400).json({ message: "Donor info is required" });
//     }

//     const newDonation = new Donation({
//       title,
//       category,
//       quantity,
//       description,
//       condition,
//       expiryDate,
//       state,
//       city,
//       location,
//       donorId,
//       donorName,
//     });

//     const savedDonation = await newDonation.save();
//     res.status(201).json(savedDonation);
//   } catch (error) {
//     console.error("POST /donations error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// module.exports = router;


// const mongoose = require("mongoose");

// const donationSchema = new mongoose.Schema({
//   category: {
//     type: String,
//     enum: ["food", "clothes", "household", "other"],
//     required: true,
//   },
//   title: String,
//   description: String,
//   quantity: Number,
//   condition: String,
//   expiryDate: Date,
//   images: [String],
//   location: {
//     lat: Number,
//     lng: Number,
//   },
//   donorId: String,
//   state: String,
//   city: String,

//   status: {
//     type: String,
//     enum: ["open", "claimed", "collected", "expired"],
//     default: "open",
//   },
//   postedAt: {
//     type: Date,
//     default: Date.now,
//   },
  
// });

// module.exports = mongoose.model("Donation", donationSchema);    this is my models/donation.js code and    const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// module.exports = mongoose.model('User', userSchema);     this is my models/user.js code and const express = require('express');
// const bcrypt = require('bcryptjs');
// const router = express.Router();
// const User = require('../models/User');
// //signup 
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     res.status(200).json({ email: user.email, name: user.name });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// module.exports = router;     this is my routes.auth.js code and const express = require("express");
// const router = express.Router();
// const {
//   createDonation,
//   getDonations,
// } = require("../controllers/donationController");

// const Donation = require("../models/Donation"); // ✅ Add this line to use Donation model

// // Create a new donation
// router.post("/", createDonation);

// // Get all donations
// router.get("/", getDonations);

// // ✅ Get a single donation by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);
//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }
//     res.json(donation);
//   } catch (error) {
//     console.error("Error fetching donation by ID:", error);
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

// module.exports = router; 

// const express = require("express");
// const router = express.Router();
// const Donation = require("../models/donation");

// // POST new donation
// router.post("/", async (req, res) => {
//   try {
//     const newDonation = new Donation(req.body);
//     await newDonation.save();
//     res.status(201).json(newDonation);
//   } catch (error) {
//     console.error("Error posting donation:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET all donations
// router.get("/", async (req, res) => {
//   try {
//     const donations = await Donation.find();
//     res.json(donations);
//   } catch (error) {
//     console.error("Error fetching donations:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// Create a donation
router.post("/", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ message: "Error posting donation", error: err.message });
  }
});

//Get all donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Error getting donations" });
  }
});
// Get single donation by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);
//     if (!donation) return res.status(404).json({ message: "Donation not found" });
//     res.json(donation);
//   } catch (err) {
//     res.status(500).json({ message: "Error getting donation" });
//   }
// });


module.exports = router;
