import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Business } from '../types';
import { businessApi } from '../api';
import SearchFilters from './SearchFilters';

const BusinessList: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

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

  // Extract unique categories and locations
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(businesses.map(b => b.category))];
    return uniqueCategories.sort();
  }, [businesses]);

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(businesses.map(b => b.location))];
    return uniqueLocations.sort();
  }, [businesses]);

  // Filter businesses based on search term and filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = searchTerm ? (
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true;

      const matchesCategory = selectedCategory ? 
        business.category === selectedCategory : true;

      const matchesLocation = selectedLocation ? 
        business.location === selectedLocation : true;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [businesses, searchTerm, selectedCategory, selectedLocation]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
  };

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
    <div className="space-y-6">
      <SearchFilters
        onSearchChange={setSearchTerm}
        onCategoryFilter={setSelectedCategory}
        onLocationFilter={setSelectedLocation}
        onClearFilters={handleClearFilters}
        categories={categories}
        locations={locations}
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
      />

      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-4">
          <p>No businesses found matching your filters.</p>
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:underline mt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBusinesses.map((business) => (
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
      )}
    </div>
  );
};

export default BusinessList;
