import express from 'express';
import {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
} from '../controllers/bookControllers.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', authenticateToken, authorizeRole('librarian'), createBook);
router.put('/:id', authenticateToken, authorizeRole('librarian'), updateBook);
router.delete('/:id', authenticateToken, authorizeRole('librarian'), deleteBook);

export default router;
