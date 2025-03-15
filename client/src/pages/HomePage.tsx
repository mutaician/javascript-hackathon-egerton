import React from 'react';
import { Link } from 'react-router-dom';
import BusinessList from '../components/BusinessList';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Business Directory</h1>
        <p className="text-gray-600 mb-4">
          Find and review local businesses in your area
        </p>
        <Link
          to="/add-business"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Your Business
        </Link>
      </div>

      <BusinessList />
    </div>
  );
};

export default HomePage;
