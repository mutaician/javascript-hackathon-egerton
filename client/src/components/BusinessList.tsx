import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Business } from '../types';
import { businessApi } from '../api';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await businessApi.getAll();
        setBusinesses(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch businesses');
        console.error('Error fetching businesses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading businesses...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No businesses found.</p>
        <Link to="/add-business" className="text-blue-600 hover:underline">
          Add your first business
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <div
          key={business._id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{business.name}</h2>
          <p className="text-gray-600 mb-2">{business.description}</p>
          <div className="text-sm text-gray-500 mb-3">
            <p>Category: {business.category}</p>
            <p>Location: {business.location}</p>
          </div>
          <Link
            to={`/business/${business._id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
