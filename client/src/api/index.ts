import axios from 'axios';
import { Business, Review, LocationFilter, BusinessCreate } from '../types';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL
});

export const businessApi = {
  // Get all businesses with optional location filter
  getAll: async (locationFilter?: LocationFilter, search?: string) => {
    const params = new URLSearchParams();
    
    if (locationFilter) {
      params.append('lat', locationFilter.lat.toString());
      params.append('lng', locationFilter.lng.toString());
      params.append('radius', locationFilter.radius.toString());
    }
    
    if (search) {
      params.append('search', search);
    }

    const response = await api.get<Business[]>('/businesses', { params });
    return response.data;
  },

  // Get single business
  getById: async (id: string) => {
    const response = await api.get<Business>(`/businesses/${id}`);
    return response.data;
  },

  // Create new business
  create: async (business: BusinessCreate) => {
    const response = await api.post<Business>('/businesses', business);
    return response.data;
  },

  // Update business
  update: async (id: string, business: Partial<BusinessCreate>) => {
    const response = await api.put<Business>(`/businesses/${id}`, business);
    return response.data;
  },

  // Delete business
  delete: async (id: string) => {
    await api.delete(`/businesses/${id}`);
  },

  // Get user's current location
  getCurrentLocation: async (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        { enableHighAccuracy: true }
      );
    });
  }
};

export const reviewApi = {
  // Get all reviews for a business
  getBusinessReviews: async (businessId: string) => {
    const response = await api.get<{ reviews: Review[]; averageRating: number; totalReviews: number }>(
      `/reviews/business/${businessId}`
    );
    return response.data;
  },

  // Create new review
  create: async (review: Omit<Review, '_id' | 'createdAt'>) => {
    const response = await api.post<Review>('/reviews', review);
    return response.data;
  },

  // Update review
  update: async (id: string, review: Partial<Review>) => {
    const response = await api.put<Review>(`/reviews/${id}`, review);
    return response.data;
  },

  // Delete review
  delete: async (id: string) => {
    await api.delete(`/reviews/${id}`);
  }
};
