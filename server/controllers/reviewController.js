import Review from '../models/Review.js';
import Business from '../models/Business.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    // Check if business exists
    const business = await Business.findById(req.body.businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const review = new Review({
      ...req.body,
      businessId: business._id
    });
    
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a business
export const getBusinessReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ businessId: req.params.businessId })
      .sort({ createdAt: -1 });
    
    // Calculate average rating
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    
    res.status(200).json({
      reviews,
      totalReviews: reviews.length,
      averageRating: reviews.length > 0 ? averageRating : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single review
export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
