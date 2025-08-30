import express from "express";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
  getOverdueBorrows,
} from "../controllers/borrowControllers.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Borrow a book (Borrower only)
router.post("/", authenticateToken, authorizeRole("borrower"), borrowBook);

// Return a book (Borrower only)
router.post("/return", authenticateToken, authorizeRole("borrower"), returnBook);

// Borrower history
router.get("/my-borrows", authenticateToken, authorizeRole("borrower"), getMyBorrows);

// Librarian: view all borrow records
router.get("/all", authenticateToken, authorizeRole("librarian"), getAllBorrows);

// Librarian: view overdue books
router.get("/overdue", authenticateToken, authorizeRole("librarian"), getOverdueBorrows);

export default router;
