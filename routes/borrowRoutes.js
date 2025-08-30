// // // // import express from 'express';
// // // // import { borrowBook, returnBook } from '../controllers/borrowControllers.js';
// // // // import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

// // // // const router = express.Router();

// // // // router.post('/', authenticateToken, authorizeRole('borrower'), borrowBook);
// // // // router.post('/return', authenticateToken, authorizeRole('borrower'), returnBook);

// // // // export default router;


// // // // import express from 'express';
// // // // import Borrow from '../models/Borrow.js';
// // // // import Book from '../models/Book.js';
// // // // import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

// // // // const router = express.Router();

// // // // // Borrow a book (borrower only)
// // // // router.post('/:bookId', authenticateToken, authorizeRole('borrower'), async (req, res) => {
// // // //     try {
// // // //         const { bookId } = req.params;
// // // //         const borrow = await Borrow.create({
// // // //             userId: req.user.id,
// // // //             bookId,
// // // //         });
// // // //         res.status(201).json(borrow);
// // // //     } catch (err) {
// // // //         res.status(500).json({ msg: err.message });
// // // //     }
// // // // });

// // // // // Return a book (borrower only)
// // // // router.put('/:borrowId/return', authenticateToken, authorizeRole('borrower'), async (req, res) => {
// // // //     try {
// // // //         const { borrowId } = req.params;
// // // //         const borrow = await Borrow.findByIdAndUpdate(
// // // //             borrowId,
// // // //             { returnDate: new Date() },
// // // //             { new: true }
// // // //         );
// // // //         res.json(borrow);
// // // //     } catch (err) {
// // // //         res.status(500).json({ msg: err.message });
// // // //     }
// // // // });

// // // // // View all borrowed books (both borrower + librarian)
// // // // router.get('/', authenticateToken, async (req, res) => {
// // // //     try {
// // // //         const borrows = await Borrow.find().populate('userId').populate('bookId');
// // // //         res.json(borrows);
// // // //     } catch (err) {
// // // //         res.status(500).json({ msg: err.message });
// // // //     }
// // // // });

// // // // // Librarian can delete borrow record
// // // // router.delete('/:id', authenticateToken, authorizeRole('librarian'), async (req, res) => {
// // // //     try {
// // // //         await Borrow.findByIdAndDelete(req.params.id);
// // // //         res.json({ msg: 'Borrow record deleted' });
// // // //     } catch (err) {
// // // //         res.status(500).json({ msg: err.message });
// // // //     }
// // // // });

// // // // export default router;





// // // // import express from "express";
// // // // import Borrow from "../models/borrow.js";
// // // // import Book from "../models/book.js";
// // // // import { authenticateToken } from "../middleware/authMiddleware.js";

// // // // const router = express.Router();

// // // // // Borrow a book
// // // // router.post("/borrow", authenticateToken, async (req, res) => {
// // // //   try {
// // // //     const { bookId } = req.body;

// // // //     // Check if the book exists
// // // //     const book = await Book.findById(bookId);
// // // //     if (!book) return res.status(404).json({ msg: "Book not found" });

// // // //     // Check if copies are available
// // // //     if (book.copiesAvailable <= 0) {
// // // //       return res.status(400).json({ msg: "No copies available" });
// // // //     }

// // // //     // Create borrow record
// // // //     const borrow = await Borrow.create({
// // // //       userId: req.user.id,
// // // //       bookId: bookId,
// // // //     });

// // // //     // Decrease available copies
// // // //     book.copiesAvailable -= 1;
// // // //     await book.save();

// // // //     res.status(201).json({ msg: "Book borrowed successfully", borrow });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: err.message });
// // // //   }
// // // // });

// // // // // Return a book
// // // // router.post("/return/:id", authenticateToken, async (req, res) => {
// // // //   try {
// // // //     const borrow = await Borrow.findById(req.params.id).populate("bookId");

// // // //     if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });
// // // //     if (borrow.returnDate) {
// // // //       return res.status(400).json({ msg: "Book already returned" });
// // // //     }

// // // //     // Mark as returned
// // // //     borrow.returnDate = new Date();
// // // //     await borrow.save();

// // // //     // Increase available copies
// // // //     borrow.bookId.copiesAvailable += 1;
// // // //     await borrow.bookId.save();

// // // //     res.json({ msg: "Book returned successfully", borrow });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: err.message });
// // // //   }
// // // // });

// // // // // Get my borrow history
// // // // router.get("/my-borrows", authenticateToken, async (req, res) => {
// // // //   try {
// // // //     const borrows = await Borrow.find({ userId: req.user.id })
// // // //       .populate("bookId")
// // // //       .sort({ borrowDate: -1 });

// // // //     res.json(borrows);
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: err.message });
// // // //   }
// // // // });

// // // // export default router;




// // // import express from "express";
// // // import Borrow from "../models/borrow.js";
// // // import Book from "../models/book.js";
// // // import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // /**
// // //  * =====================
// // //  *   STUDENT ROUTES
// // //  * =====================
// // //  */

// // // // Borrow a book
// // // router.post("/borrow", authenticateToken, async (req, res) => {
// // //   try {
// // //     const { bookId } = req.body;

// // //     const book = await Book.findById(bookId);
// // //     if (!book) return res.status(404).json({ msg: "Book not found" });

// // //     if (book.copiesAvailable <= 0) {
// // //       return res.status(400).json({ msg: "No copies available" });
// // //     }

// // //     const borrow = await Borrow.create({
// // //       userId: req.user.id,
// // //       bookId: bookId,
// // //     });

// // //     book.copiesAvailable -= 1;
// // //     await book.save();

// // //     res.status(201).json({ msg: "Book borrowed successfully", borrow });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // });

// // // // Return a book
// // // router.post("/return/:id", authenticateToken, async (req, res) => {
// // //   try {
// // //     const borrow = await Borrow.findById(req.params.id).populate("bookId");
// // //     if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });

// // //     if (borrow.returnDate) {
// // //       return res.status(400).json({ msg: "Book already returned" });
// // //     }

// // //     borrow.returnDate = new Date();
// // //     await borrow.save();

// // //     borrow.bookId.copiesAvailable += 1;
// // //     await borrow.bookId.save();

// // //     res.json({ msg: "Book returned successfully", borrow });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // });

// // // // Get my borrow history
// // // router.get("/my-borrows", authenticateToken, async (req, res) => {
// // //   try {
// // //     const borrows = await Borrow.find({ userId: req.user.id })
// // //       .populate("bookId")
// // //       .sort({ borrowDate: -1 });

// // //     res.json(borrows);
// // //   } catch (err) {
// // //     res.status(500).json({ msg: err.message });
// // //   }
// // // });

// // // /**
// // //  * =====================
// // //  *   LIBRARIAN ROUTES
// // //  * =====================
// // //  */

// // // // View all borrow records
// // // router.get(
// // //   "/all",
// // //   authenticateToken,
// // //   authorizeRole("librarian"),
// // //   async (req, res) => {
// // //     try {
// // //       const borrows = await Borrow.find()
// // //         .populate("userId", "name email")
// // //         .populate("bookId", "title author")
// // //         .sort({ borrowDate: -1 });

// // //       res.json(borrows);
// // //     } catch (err) {
// // //       res.status(500).json({ msg: err.message });
// // //     }
// // //   }
// // // );

// // // // View overdue books (example: more than 14 days not returned)
// // // router.get(
// // //   "/overdue",
// // //   authenticateToken,
// // //   authorizeRole("librarian"),
// // //   async (req, res) => {
// // //     try {
// // //       const today = new Date();
// // //       const dueDate = new Date(today.setDate(today.getDate() - 14)); // 14 days

// // //       const overdue = await Borrow.find({
// // //         returnDate: null,
// // //         borrowDate: { $lte: dueDate },
// // //       })
// // //         .populate("userId", "name email")
// // //         .populate("bookId", "title author");

// // //       res.json(overdue);
// // //     } catch (err) {
// // //       res.status(500).json({ msg: err.message });
// // //     }
// // //   }
// // // );

// // // // Librarian can delete a borrow record if needed
// // // router.delete(
// // //   "/:id",
// // //   authenticateToken,
// // //   authorizeRole("librarian"),
// // //   async (req, res) => {
// // //     try {
// // //       const borrow = await Borrow.findById(req.params.id);
// // //       if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });

// // //       await Borrow.findByIdAndDelete(req.params.id);
// // //       res.json({ msg: "Borrow record deleted" });
// // //     } catch (err) {
// // //       res.status(500).json({ msg: err.message });
// // //     }
// // //   }
// // // );

// // // export default router;


// // import express from "express";
// // import Borrow from "../models/borrow.js";
// // import Book from "../models/book.js";
// // import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // Borrow a book
// // router.post("/", authenticateToken, authorizeRole("borrower"), async (req, res) => {
// //   try {
// //     const { bookId } = req.body;
// //     const book = await Book.findById(bookId);
// //     if (!book) return res.status(404).json({ msg: "Book not found" });
// //     if (book.available <= 0) return res.status(400).json({ msg: "No copies available" });

// //     const borrow = await Borrow.create({
// //       userId: req.user.id,
// //       bookId,
// //     });

// //     book.available -= 1;
// //     await book.save();

// //     res.status(201).json({ msg: "Book borrowed successfully", borrow });
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // });

// // // Return a book
// // router.post("/return", authenticateToken, authorizeRole("borrower"), async (req, res) => {
// //   try {
// //     const { borrowId } = req.body;
// //     const borrow = await Borrow.findById(borrowId).populate("bookId");
// //     if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });
// //     if (borrow.returnDate) return res.status(400).json({ msg: "Book already returned" });

// //     borrow.returnDate = new Date();
// //     await borrow.save();

// //     borrow.bookId.available += 1;
// //     await borrow.bookId.save();

// //     res.json({ msg: "Book returned successfully", borrow });
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // });

// // // Borrower history
// // router.get("/my-borrows", authenticateToken, authorizeRole("borrower"), async (req, res) => {
// //   try {
// //     const borrows = await Borrow.find({ userId: req.user.id })
// //       .populate("bookId")
// //       .sort({ borrowDate: -1 });
// //     res.json(borrows);
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // });

// // // Librarian can see all borrow records
// // router.get("/all", authenticateToken, authorizeRole("librarian"), async (req, res) => {
// //   try {
// //     const borrows = await Borrow.find()
// //       .populate("userId", "name email")
// //       .populate("bookId", "title author")
// //       .sort({ borrowDate: -1 });
// //     res.json(borrows);
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // });

// // export default router;


// import express from "express";
// import {
//   borrowBook,
//   returnBook,
//   getMyBorrows,
//   getAllBorrows,
//   getOverdueBorrows,
// } from "../controllers/borrowControllers.js";
// import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Borrow a book (Borrower only)
// router.post("/", authenticateToken, authorizeRole("borrower"), borrowBook);

// // Return a book (Borrower only)
// router.post("/return", authenticateToken, authorizeRole("borrower"), returnBook);

// // Borrower history
// router.get("/my-borrows", authenticateToken, authorizeRole("borrower"), getMyBorrows);

// // Librarian: view all borrow records
// router.get("/all", authenticateToken, authorizeRole("librarian"), getAllBorrows);

// // Librarian: view overdue books
// router.get("/overdue", authenticateToken, authorizeRole("librarian"), getOverdueBorrows);

// export default router;



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
