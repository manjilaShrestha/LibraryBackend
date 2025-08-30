import Book from '../models/book.js';
import Borrow from "../models/borrow.js"; 


export const createBook = async (req, res) => {
  try {
    let books = req.body;

    if (!Array.isArray(books)) books = [books];

    const results = [];

    for (const b of books) {
      if (!b.isbn) return res.status(400).json({ msg: 'ISBN is required for all books' });

      let existingBook = await Book.findOne({ isbn: b.isbn });

      if (existingBook) {
        existingBook.quantity += b.quantity;
        existingBook.available += b.quantity;
        await existingBook.save();
        results.push({ msg: 'Book updated', book: existingBook });
      } else {
        const newBook = new Book({
          title: b.title,
          author: b.author,
          isbn: b.isbn,
          quantity: b.quantity,
          available: b.quantity
        });
        await newBook.save();
        results.push({ msg: 'Book added', book: newBook });
      }
    }

    res.status(200).json(results);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ msg: 'Book not found' });
    res.json({ msg: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ msg: 'Book not found' });
    res.json({ msg: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId).populate("bookId");
    if (!borrow) return res.status(404).json({ msg: "Borrow record not found" });
    if (borrow.returned) return res.json({ msg: "Book already returned" });

    borrow.returned = true;
    await borrow.save();

    const book = borrow.bookId;
    if (book) {
      book.available = (book.available || 0) + 1;
      await book.save();
    }

    res.json({ msg: "Book returned successfully", success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
