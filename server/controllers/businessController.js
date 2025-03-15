import Business from '../models/Business.js';
import nodeGeocoder from 'node-geocoder';

// Initialize geocoder
const geocoder = nodeGeocoder({
  provider: 'openstreetmap',
  formatter: null
});

// Get businesses with optional location-based filtering
export const getBusinesses = async (req, res) => {
  try {
    const { lat, lng, radius, search } = req.query;

    // Base query
    let query = {};

    // Add location-based filtering if coordinates are provided
    if (lat && lng && radius) {
      query.coordinates = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      };
    }

    // Add text search if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const businesses = await Business.find(query).sort({ createdAt: -1 });
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

// Create business with geocoding
export const createBusiness = async (req, res) => {
  try {
    const businessData = req.body;

    // Only geocode if coordinates are not provided
    if (!businessData.coordinates) {
      const geoResults = await geocoder.geocode(businessData.location);

      if (!geoResults || geoResults.length === 0) {
        throw new Error('Unable to geocode location');
      }

      // Add coordinates to business data
      businessData.coordinates = {
        type: 'Point',
        coordinates: [geoResults[0].longitude, geoResults[0].latitude]
      };
    }

    const business = new Business(businessData);
    const savedBusiness = await business.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update business with geocoding
export const updateBusiness = async (req, res) => {
  try {
    const businessData = req.body;

    // Only geocode if location is being updated and coordinates aren't provided
    if (businessData.location && !businessData.coordinates) {
      const geoResults = await geocoder.geocode(businessData.location);
      
      if (!geoResults || geoResults.length === 0) {
        throw new Error('Unable to geocode location');
      }

      businessData.coordinates = {
        type: 'Point',
        coordinates: [geoResults[0].longitude, geoResults[0].latitude]
      };
    }

    const business = await Business.findByIdAndUpdate(
      req.params.id,
      businessData,
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
