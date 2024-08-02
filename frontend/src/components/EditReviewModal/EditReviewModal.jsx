// src/components/EditReviewModal/EditReviewModal.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const EditReviewModal = ({ isOpen, onClose, review, refreshReviews }) => {
  const [editData, setEditData] = useState({
    title: review.title,
    author: review.author,
    reviewText: review.reviewText,
    rating: review.rating
  });

  useEffect(() => {
    if (isOpen) {
      setEditData({
        title: review.title,
        author: review.author,
        reviewText: review.reviewText,
        rating: review.rating
      });
    }
  }, [isOpen, review]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`http://localhost:4000/api/reviews/${review._id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Review updated successfully');
      refreshReviews();
      onClose();
    } catch (error) {
      console.error('Failed to update review:', error.message);
      toast.error('Failed to update review');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 !bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-white text-center w-full">Edit Review</h2>
          <button className="text-white" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="mt-4" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-white text-sm" htmlFor='title'>Title</label>
            <input type="text" className="mt-1 p-2 border rounded w-full" name='title'
              value={editData.title}
              placeholder="Edit title" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm" htmlFor='author'>Author</label>
            <input type="text" className="mt-1 p-2 border rounded w-full"
              value={editData.author}
              name='author' placeholder="Edit author" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm" htmlFor='reviewText'>Review</label>
            <textarea
              className="mt-1 p-2 border rounded w-full"
              name="reviewText"
              placeholder="Edit your review"
              value={editData.reviewText}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm" htmlFor='rating'>Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="mt-1 p-2 border rounded w-full"
              name="rating"
              placeholder="Edit rating"
              value={editData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="bg-white text-black px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="!bg-dark !border border-white hover:bg-black text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default EditReviewModal;
