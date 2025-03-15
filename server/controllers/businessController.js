import Business from '../models/Business.js';

// Get all businesses
export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single business
export const getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create business
export const createBusiness = async (req, res) => {
  try {
    const business = new Business(req.body);
    const savedBusiness = await business.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update business
export const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete business
export const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
