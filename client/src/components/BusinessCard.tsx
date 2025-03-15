import React from 'react';
import { Link } from 'react-router-dom';
import { Business, LocationFilter } from '../types';
import { calculateDistance, formatDistance } from '../utils/distance';

interface BusinessCardProps {
  business: Business;
  locationFilter?: LocationFilter;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, locationFilter }) => {
  // Calculate distance if location filter is active and business has coordinates
  const distance = React.useMemo(() => {
    if (locationFilter && business.coordinates) {
      return calculateDistance(
        locationFilter.lat,
        locationFilter.lng,
        business.coordinates.coordinates[1], // latitude
        business.coordinates.coordinates[0]  // longitude
      );
    }
    return null;
  }, [business.coordinates, locationFilter]);

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold">{business.name}</h2>
        {distance !== null && (
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {formatDistance(distance)}
          </span>
        )}
      </div>
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
  );
};

export default BusinessCard;
