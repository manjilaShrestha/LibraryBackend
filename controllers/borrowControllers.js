// // // import Borrow from '../models/borrow.js';
// // // import Book from '../models/book.js';

// // // // Borrow book
// // // export const borrowBook = async (req, res) => {
// // //     try {
// // //         const { bookId } = req.body;
// // //         const book = await Book.findById(bookId);
// // //         if (!book || book.available < 1)
// // //             return res.status(400).json({ msg: "No copies available" });

// // //         book.available -= 1;
// // //         await book.save();

// // //         const borrow = new Borrow({
// // //             userId: req.user.id,
// // //             bookId,
// // //         });

// // //         await borrow.save();
// // //         res.status(201).json({ msg: 'Book borrowed successfully' });
// // //     } catch (error) {
// // //         res.status(500).json({ msg: error.message });
// // //     }
// // // };

// // // // Return book
// // // export const returnBook = async (req, res) => {
// // //     try {
// // //         const { borrowId } = req.body;

// // //         const borrow = await Borrow.findById(borrowId);
// // //         if (!borrow || borrow.returnDate)
// // //             return res.status(400).json({ msg: "Invalid borrow record" });

// // //         borrow.returnDate = new Date();
// // //         await borrow.save();

// // //         const book = await Book.findById(borrow.bookId);
// // //         if (book) {
// // //             book.available += 1;
// // //             await book.save();
// // //         }

// // //         res.json({ msg: 'Book returned successfully' });
// // //     } catch (error) {
// // //         res.status(500).json({ msg: error.message });
// // //     }
// // // };



// // import Borrow from '../models/borrow.js';
// // import Book from '../models/book.js';

// // /**
// //  * Borrow a book using ISBN
// //  */
// // export const borrowBook = async (req, res) => {
// //   try {
// //     const { isbn } = req.body;

// //     // Find the book by ISBN
// //     const book = await Book.findOne({ isbn });
// //     if (!book) return res.status(404).json({ msg: "Book not found" });
// //     if (book.available <= 0) return res.status(400).json({ msg: "No copies available" });

// //     // Create borrow record
// //     const borrow = await Borrow.create({
// //       userId: req.user.id,
// //       bookId: book._id,
// //     });

// //     // Decrease available copies
// //     book.available -= 1;
// //     await book.save();

// //     res.status(201).json({ msg: "Book borrowed successfully", borrow });
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // };

// // /**
// //  * Return a book using borrow record ID
// //  */
// // export const returnBook = async (req, res) => {
// //   try {
// //     const { borrowId } = req.body;

// //     const borrow = await Borrow.findById(borrowId).populate("bookId");
// //     if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });
// //     if (borrow.returnDate) return res.status(400).json({ msg: "Book already returned" });

// //     borrow.returnDate = new Date();
// //     await borrow.save();

// //     // Increase available copies
// //     borrow.bookId.available += 1;
// //     await borrow.bookId.save();

// //     res.json({ msg: "Book returned successfully", borrow });
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // };

// // /**
// //  * Borrower history
// //  */
// // export const getMyBorrows = async (req, res) => {
// //   try {
// //     const borrows = await Borrow.find({ userId: req.user.id })
// //       .populate("bookId")
// //       .sort({ borrowDate: -1 });

// //     res.json(borrows);
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // };

// // /**
// //  * Librarian view all borrow records
// //  */
// // export const getAllBorrows = async (req, res) => {
// //   try {
// //     const borrows = await Borrow.find()
// //       .populate("userId", "name email")
// //       .populate("bookId", "title author isbn")
// //       .sort({ borrowDate: -1 });

// //     res.json(borrows);
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // };


// import Borrow from "../models/borrow.js";
// import Book from "../models/book.js";

// /**
//  * Borrow a book
//  */
// export const borrowBook = async (req, res) => {
//   try {
//     const { bookId } = req.body;

//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ msg: "Book not found" });
//     if (book.available <= 0) return res.status(400).json({ msg: "No copies available" });

//     const borrow = await Borrow.create({
//       userId: req.user.id,
//       bookId,
//     });

//     book.available -= 1;
//     await book.save();

//     res.status(201).json({ msg: "Book borrowed successfully", borrow });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// /**
//  * Return a book
//  */
// export const returnBook = async (req, res) => {
//   try {
//     const { borrowId } = req.body;

//     const borrow = await Borrow.findById(borrowId).populate("bookId");
//     if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });
//     if (borrow.returnDate) return res.status(400).json({ msg: "Book already returned" });

//     borrow.returnDate = new Date();
//     await borrow.save();

//     borrow.bookId.available += 1;
//     await borrow.bookId.save();

//     res.json({ msg: "Book returned successfully", borrow });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// /**
//  * Borrower history
//  */
// export const getMyBorrows = async (req, res) => {
//   try {
//     const borrows = await Borrow.find({ userId: req.user.id })
//       .populate("bookId")
//       .sort({ borrowDate: -1 });

//     res.json(borrows);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// /**
//  * Librarian view all borrow records
//  */
// export const getAllBorrows = async (req, res) => {
//   try {
//     const borrows = await Borrow.find()
//       .populate("userId", "name email")
//       .populate("bookId", "title author isbn")
//       .sort({ borrowDate: -1 });

//     res.json(borrows);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// /**
//  * Librarian view overdue records
//  */
// export const getOverdueBorrows = async (req, res) => {
//   try {
//     const today = new Date();

//     const overdue = await Borrow.find({
//       returnDate: null,
//       dueDate: { $lt: today },
//     })
//       .populate("userId", "name email")
//       .populate("bookId", "title author isbn");

//     res.json(overdue);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


import Borrow from "../models/borrow.js";
import Book from "../models/book.js";

// Borrow a book (Borrower only)
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    // Check availability
    if (book.available <= 0)
      return res.status(400).json({ msg: "No copies available" });

    // Create borrow record
    const borrow = await Borrow.create({
      userId: req.user.id,
      bookId,
      borrowDate: new Date(),
    });

    // Decrease available count
    book.available -= 1;
    await book.save();

    res.status(201).json({ msg: "Book borrowed successfully", borrow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Return a book (Borrower only)
export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId).populate("bookId");
    if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });

    if (borrow.returnDate)
      return res.status(400).json({ msg: "Book already returned" });

    borrow.returnDate = new Date();
    await borrow.save();

    borrow.bookId.available += 1;
    await borrow.bookId.save();

    res.json({ msg: "Book returned successfully", borrow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Borrower history
export const getMyBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ userId: req.user.id })
      .populate("bookId", "title author isbn")
      .sort({ borrowDate: -1 });

    res.json(borrows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Librarian: view all borrow records
export const getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find()
      .populate("userId", "name email")
      .populate("bookId", "title author isbn")
      .sort({ borrowDate: -1 });

    res.json(borrows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Librarian: view overdue books (e.g., >14 days)
export const getOverdueBorrows = async (req, res) => {
  try {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const overdue = await Borrow.find({
      returnDate: null,
      borrowDate: { $lte: fourteenDaysAgo },
    })
      .populate("userId", "name email")
      .populate("bookId", "title author");

    res.json(overdue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
