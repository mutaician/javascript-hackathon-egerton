import React from 'react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  onDeleteReview?: (reviewId: string) => void;
}

const ReviewList = ({ reviews, onDeleteReview }: ReviewListProps) => {
  if (reviews.length === 0) {
    return <p className="text-gray-600">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{review.rating}/5</span>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {onDeleteReview && (
              <button
                onClick={() => onDeleteReview(review._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
