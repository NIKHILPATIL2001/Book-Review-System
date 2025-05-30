const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookcontroller.js');
const reviewController = require('../controller/reviewcontroller.js');
const authMiddleware = require('../middleware/auth.js');

router.post('/', authMiddleware, bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookDetails);
router.get('/search/title', bookController.searchBooks);

router.post('/:id/reviews', authMiddleware, reviewController.submitReview);
router.put('/reviews/:id', authMiddleware, reviewController.updateReview);
router.delete('/reviews/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;