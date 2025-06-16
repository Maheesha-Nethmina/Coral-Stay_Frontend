import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';

function AddPackages() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    includes:'',
    price: '',
    days: '',
    offers: '',
    type: 'hotel'
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);

    await axios.post('http://localhost:3000/package', formData);
    navigate('/packageDetails');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-[#EAF4F6] flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl"
        >
          <h1 className="text-2xl font-bold text-[#023545] mb-6 text-center">Add Package</h1>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows="4"
                value={inputs.description}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded-md p-2"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Includes</label>
              <input
                type="text"
                name="includes"
                value={inputs.includes}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={inputs.price}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Days</label>
                <input
                  type="number"
                  name="days"
                  value={inputs.days}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Offers</label>
              <input
                type="text"
                name="offers"
                value={inputs.offers}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={inputs.type}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded-md p-2"
              >
                <option value="hotel">Hotel</option>
                <option value="boatTour">Boat Tour</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 w-full"
              />
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            className="mt-6 bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-teal-700 w-full"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddPackages;
