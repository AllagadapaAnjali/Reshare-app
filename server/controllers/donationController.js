const Donation = require("../models/Donation");

// const createDonation = async (req, res) => {
// try {
// console.log("Incoming donation:", req.body); // DEBUG LINE
// const donation = new Donation(req.body);
// const saved = await donation.save();
// res.status(201).json(saved);
// } catch (error) {
// console.error("Create donation error:", error); // DEBUG LINE
// res.status(500).json({ error: "Failed to create donation" });
// }
// };

const createDonation = async (req, res) => {
  try {
    console.log("Received form data:", req.body); 
    const donation = new Donation(req.body);
    const saved = await donation.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create donation error:", error.message);
    res.status(500).json({ error: error.message });
  }
};


  // try {
  //   const { userId, userName, ...donationData } = req.body;

  //   const newDonation = new Donation({
  //     ...donationData,
  //     donorId: userId,
  //     donorName: userName,
  //   });

  //   await newDonation.save();
  //   res.status(201).json(newDonation);
  // } catch (error) {
  //   console.error("Error creating donation:", error);
  //   res.status(500).json({ message: "Server error", error });
  // }


//   .catch((error) => {
//   console.error("Create donation error:", error.message);
//   res.status(500).json({ error: error.message });
// });

// };


const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ postedAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

module.exports = { createDonation, getDonations };

// module.exports = {
//   createDonation,
//   getDonations: async (req, res) => {
//     try {
//       const donations = await Donation.find().sort({ postedAt: -1 });
//       res.status(200).json(donations);
//     } catch (error) {
//       console.error("Error fetching donations:", error);
//       res.status(500).json({ message: "Server error", error });
//     }
//   }
// };