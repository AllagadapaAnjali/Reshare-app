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

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const authRoutes = require('./routes/auth');

// const donationRoutes = require("./routes/donationRoutes");

// const app = express();

// // Middleware
// app.use(cors({ origin: "https://reshare-app.vercel.app", methods: ["GET","POST","PUT","DELETE"],
//   credentials: true }));
// app.use(express.json());

// // Routes
// app.use("/api/donations", donationRoutes);

// app.use('/api/auth', authRoutes);
// // Connect and listen
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on port ${process.env.PORT}`)
//     );
//   })
//   .catch((err) => console.log("MongoDB error:", err));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/auth');
const donationRoutes = require("./routes/donationRoutes");

const app = express();


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// Middleware
// app.use(cors({
//   origin: ["https://reshare-app.vercel.app", "http://localhost:3000"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
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
