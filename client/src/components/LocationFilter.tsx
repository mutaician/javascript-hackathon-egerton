import React, { useState } from 'react';
import { LocationFilter as LocationFilterType } from '../types';
import { businessApi } from '../api';

interface LocationFilterProps {
  onLocationFilter: (filter: LocationFilterType | undefined) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ onLocationFilter }) => {
  const [radius, setRadius] = useState<number>(5); // Default 5km radius
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleUseMyLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await businessApi.getCurrentLocation();
      onLocationFilter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        radius
      });
      setIsFilterActive(true);
    } catch (err) {
      setError('Failed to get your location. Please make sure location services are enabled.');
      console.error('Geolocation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLocation = () => {
    onLocationFilter(undefined);
    setIsFilterActive(false);
  };

  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleUseMyLocation}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⚪</span>
              Getting location...
            </>
          ) : (
            <>
              📍 Use my location
            </>
          )}
        </button>

        {isFilterActive && (
          <div className="flex items-center gap-2">
            <label htmlFor="radius" className="text-sm text-gray-600">
              Radius:
            </label>
            <select
              id="radius"
              value={radius}
              onChange={(e) => {
                const newRadius = Number(e.target.value);
                setRadius(newRadius);
                if (isFilterActive) {
                  // Re-trigger location filter with new radius
                  handleUseMyLocation();
                }
              }}
              className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
              <option value="50">50 km</option>
            </select>

            <button
              onClick={handleClearLocation}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear location
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      {isFilterActive && (
        <div className="text-sm text-gray-600">
          Showing businesses within {radius}km of your location
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
