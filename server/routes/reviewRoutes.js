import express from 'express';
import {
  createReview,
  getBusinessReviews,
  getReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

// POST /api/reviews - Create a new review
router.post('/', createReview);

// GET /api/reviews/business/:businessId - Get all reviews for a business
router.get('/business/:businessId', getBusinessReviews);

// GET /api/reviews/:id - Get a single review
router.get('/:id', getReview);

// PUT /api/reviews/:id - Update a review
router.put('/:id', updateReview);

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id', deleteReview);

export default router;
