import express from 'express';
import {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness
} from '../controllers/businessController.js';

const router = express.Router();

// GET /api/businesses - Get all businesses
router.get('/', getBusinesses);

// GET /api/businesses/:id - Get a single business
router.get('/:id', getBusiness);

// POST /api/businesses - Create a new business
router.post('/', createBusiness);

// PUT /api/businesses/:id - Update a business
router.put('/:id', updateBusiness);

// DELETE /api/businesses/:id - Delete a business
router.delete('/:id', deleteBusiness);

export default router;
