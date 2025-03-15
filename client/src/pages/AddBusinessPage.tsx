import React from 'react';
import AddBusinessForm from '../components/AddBusinessForm';

const AddBusinessPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Add New Business</h1>
        <p className="text-gray-600">
          Share your business with our community. Fill out the form below to get started.
        </p>
      </div>
      <AddBusinessForm />
    </div>
  );
};

export default AddBusinessPage;
