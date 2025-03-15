import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface SearchFiltersProps {
  onSearchChange: (searchTerm: string) => void;
  onCategoryFilter: (category: string) => void;
  onLocationFilter: (location: string) => void;
  onClearFilters: () => void;
  categories: string[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearchChange,
  onCategoryFilter,
  onLocationFilter,
  onClearFilters,
  categories,
  locations,
  selectedCategory,
  selectedLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
    }, 300),
    [onSearchChange]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => onLocationFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {(searchTerm || selectedCategory || selectedLocation) && (
          <button
            onClick={() => {
              setSearchTerm('');
              onClearFilters();
            }}
            className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2">
        {searchTerm && (
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            Search: {searchTerm}
          </span>
        )}
        {selectedCategory && (
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            Category: {selectedCategory}
          </span>
        )}
        {selectedLocation && (
          <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
            Location: {selectedLocation}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
