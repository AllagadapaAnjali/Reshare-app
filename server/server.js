const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/auth');
const donationRoutes = require("./routes/donationRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Allow requests only from localhost frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()); // For parsing JSON requests

// Routes
app.use("/api/donations", donationRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});
