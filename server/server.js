const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/auth');
const donationRoutes = require("./routes/donationRoutes");

const app = express();

// Middleware
//<<<<<<< HEAD
//<<<<<<< HEAD
// app.use(cors({
//     origin: "http://localhost:3000", // Allow requests only from localhost frontend
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// app.use(express.json()); // For parsing JSON requests

//=======

app.use(cors({
    origin: ["https://reshare-app.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
//>>>>>>> fe22fd041b5d495f9e98571bbc9676b16e09512e
//=======
// app.use(cors({ origin: "https://reshare-app.vercel.app", methods: ["GET","POST","PUT","DELETE"],
//   credentials: true }));
// app.use(express.json());
//>>>>>>> 1f864fb17cf7b8433765229f9cf1fd5f6d0bee50
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
