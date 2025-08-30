
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import path from "path";

// Routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Models
import User from "./models/user.js";

// ------------------ Config ------------------
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ------------------ CORS Setup ------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow requests with no origin (mobile apps, Postman)
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS request from:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
  })
);

// ------------------ Middleware ------------------
app.use(express.json());
app.use(cookieParser());

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ------------------ Test Route ------------------
app.get("/hello", (req, res) => {
  res.send("Hello world!");
});

// ------------------ API Routes ------------------
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/users", userRoutes); // ✅ register new user routes

// ------------------ Seed Librarian ------------------
const seedLibrarian = async () => {
  try {
    const librarian = await User.findOne({ email: "librarian@gmail.com" });
    if (!librarian) {
      const hashedPassword = await bcrypt.hash("librarian", 10);
      await User.create({
        name: "Librarian",
        email: "librarian@gmail.com",
        password: hashedPassword,
        role: "librarian",
      });
      console.log("✅ Default librarian created: librarian@gmail.com / librarian");
    } else {
      console.log("ℹ️ Librarian already exists");
    }
  } catch (error) {
    console.error("❌ Error seeding librarian user:", error);
  }
};

// ------------------ MongoDB Connection ------------------
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
    seedLibrarian();
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
