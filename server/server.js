//     const express = require("express");
//     const mongoose = require("mongoose");
//     const cors = require("cors");
//     require("dotenv").config();

//     const donationRoutes = require("./routes/donationRoutes");

//     const app = express();
//     // app.use(cors());
//     app.use(cors({
//   origin: "http://localhost:3000", // frontend
//   methods: ["GET", "POST"],
// }));


//     app.use(express.json());

//     app.use("/api/donations", donationRoutes);

//     // Connect to MongoDB Atlas
//     mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB Connected");
//         app.listen(process.env.PORT, () =>
//         console.log(`Server running on port ${process.env.PORT}`)
//         );
//     })
//     .catch((err) => console.log(err));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require('./routes/auth');

const donationRoutes = require("./routes/donationRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",       // local React dev server
      "https://reshare-app.vercel.app", // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/donations", donationRoutes);

app.use('/api/auth', authRoutes);
// Connect and listen
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("MongoDB error:", err));
