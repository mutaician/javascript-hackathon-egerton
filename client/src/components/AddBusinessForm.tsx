import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessApi } from '../api';
import { BusinessCreate } from '../types';

interface UserCoordinates {
  latitude: number;
  longitude: number;
}

type FormData = Omit<BusinessCreate, 'coordinates'>;

const initialFormData: FormData = {
  name: '',
  description: '',
  category: '',
  location: ''
};

const AddBusinessForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<UserCoordinates | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Basic validation
      if (!formData.name || !formData.description || !formData.category || !formData.location) {
        throw new Error('All fields are required');
      }

      const businessData: BusinessCreate = {
        ...formData,
        coordinates: userLocation ? {
          type: 'Point',
          coordinates: [userLocation.longitude, userLocation.latitude] // MongoDB expects [longitude, latitude]
        } : undefined
      };

      const newBusiness = await businessApi.create(businessData);
      navigate(`/business/${newBusiness._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create business');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetLocation = async () => {
    try {
      const position = await businessApi.getCurrentLocation();
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      setUserLocation(coords);
      
      // Set the location field to the coordinates
      const address = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
      setFormData(prev => ({
        ...prev,
        location: address
      }));
    } catch (error) {
      setError('Failed to get your location. Please enter address manually.');
      console.error('Location error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Business Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
          Location
        </label>
        <div className="space-y-2">
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter business address"
            required
          />
          <button
            type="button"
            onClick={handleGetLocation}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            📍 Use my current location
          </button>
          {userLocation && (
            <div className="text-sm text-gray-600">
              Using coordinates: {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Creating...' : 'Create Business'}
        </button>
      </div>
    </form>
  );
};

export default AddBusinessForm;
