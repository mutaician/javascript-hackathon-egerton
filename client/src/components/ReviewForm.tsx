import React, { useState } from 'react';
import { reviewApi } from '../api';

interface ReviewFormProps {
  businessId: string;
  onReviewAdded: () => void;
}

interface FormData {
  rating: number;
  comment: string;
}

const initialFormData: FormData = {
  rating: 5,
  comment: ''
};

const ReviewForm = ({ businessId, onReviewAdded }: ReviewFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await reviewApi.create({
        businessId,
        ...formData
      });
      setFormData(initialFormData);
      setShowForm(false);
      onReviewAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Write a Review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Rating (1-5)
        </label>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map(num => (
            <label key={num} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={num}
                checked={formData.rating === num}
                onChange={handleChange}
                className="mr-1"
              />
              {num}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={10}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
