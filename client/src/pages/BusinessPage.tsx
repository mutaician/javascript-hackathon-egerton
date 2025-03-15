import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Business, Review } from '../types';
import { businessApi, reviewApi } from '../api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const BusinessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [businessData, reviewsData] = await Promise.all([
          businessApi.getById(id),
          reviewApi.getBusinessReviews(id)
        ]);
        setBusiness(businessData);
        setReviews(reviewsData.reviews);
        setAverageRating(reviewsData.averageRating);
        setTotalReviews(reviewsData.totalReviews);
        setError(null);
      } catch (err) {
        setError('Failed to fetch business details');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewAdded = () => {
    if (id) {
      reviewApi.getBusinessReviews(id).then(data => {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await reviewApi.delete(reviewId);
      if (id) {
        const data = await reviewApi.getBusinessReviews(id);
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      }
    } catch (err) {
      setError('Failed to delete review');
      console.error('Error deleting review:', err);
    }
  };

  const handleDelete = async () => {
    if (!business || !window.confirm('Are you sure you want to delete this business?')) {
      return;
    }

    try {
      await businessApi.delete(business._id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete business');
      console.error('Error deleting business:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading business details...</div>;
  }

  if (error || !business) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-600 py-4">
          {error || 'Business not found'}
        </div>
        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < Math.round(averageRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  ({averageRating.toFixed(1)}) · {totalReviews} reviews
                </span>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-600">{business.description}</p>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="text-gray-600">{business.category}</span>
              </div>
              <div>
                <span className="font-medium">Location:</span>{' '}
                <span className="text-gray-600">{business.location}</span>
              </div>
              <div>
                <span className="font-medium">Added:</span>{' '}
                <span className="text-gray-600">
                  {new Date(business.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <ReviewForm businessId={business._id} onReviewAdded={handleReviewAdded} />
            </div>
            <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to All Businesses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
