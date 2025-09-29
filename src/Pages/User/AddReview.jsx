import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';



const AddReview = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 0,
    content: '',
    date: new Date().toLocaleDateString(),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/reviews', formData);
      alert('Review submitted successfully!');
      navigate('/about');
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-25 min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-teal-700 hover:text-teal-900 font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>



        <h2 className="text-3xl font-bold mb-8 text-center text-teal-800">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md p-6 rounded-lg"   >

  
  




          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Country and Hometown</label>
            <input
              type="text"
              name="location"
              className="w-full border rounded px-3 py-2"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    formData.rating >= star ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Review</label>
            <textarea
              name="content"
              rows="4"
              className="w-full border rounded px-3 py-2"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default AddReview;
