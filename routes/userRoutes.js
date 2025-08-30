// // routes/userRoutes.js
// import express from "express";
// import multer from "multer";
// import path from "path";
// import User from "../models/user.js";

// const router = express.Router();

// // ------------------ Multer Setup ------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // store in /uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   },
// });

// const upload = multer({ storage });

// // ------------------ Routes ------------------

// // Upload profile image for a user
// router.post("/:id/upload", upload.single("profileImage"), async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.profileImage = `/uploads/${req.file.filename}`;
//     await user.save();

//     res.json({
//       message: "✅ Profile image uploaded successfully",
//       imageUrl: user.profileImage,
//     });
//   } catch (error) {
//     console.error("❌ Error uploading image:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get user profile (to test image path)
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// routes/userRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import User from "../models/user.js";

const router = express.Router();

// ------------------ Ensure uploads folder exists ------------------
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // create folder if it doesn't exist
}

// ------------------ Multer Setup ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // safe now, folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });


// Upload profile image for a user
router.post("/:id/upload", upload.single("profileImage"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      message: " Profile image uploaded successfully",
      imageUrl: user.profileImage,
    });
  } catch (error) {
    console.error(" Error uploading image:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user profile (to test image path)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
