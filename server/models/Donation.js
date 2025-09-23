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
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   userName: String, 
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
//   donorId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true,
// },
//   donorName: {
//   type: String,
//   required: true,
// },

// });

// module.exports = mongoose.model("Donation", donationSchema);

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
//   state: String,
//   city: String,

//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   userName: String,

//   donorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   donorName: {
//     type: String,
//     required: true,
//   },

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

// module.exports = mongoose.model("Donation", donationSchema);

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

// module.exports = mongoose.model("Donation", donationSchema);

// const mongoose = require("mongoose");

// const donationSchema = new mongoose.Schema({
//   title: String,
//   category: String,
//   quantity: Number,
//   description: String,
//   condition: String,
//   expiryDate: Date,
//   state: String,
//   city: String,
//   location: String,
//   postedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Donation", donationSchema);


const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  condition: { type: String, default: "Good" },
  expiryDate: Date,
  state: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number
  },
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  status: { type: String, default: "open" },
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);
