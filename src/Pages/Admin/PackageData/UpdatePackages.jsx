import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';

function UpdatePackages() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    price: '',
    days: '',
    offers: '',
    type: 'hotel'
  });
  const [image, setImage] = useState(null);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      const res = await axios.get(`http://localhost:3000/package/${id}`);
      const pack = res.data.package;
      setInputs({
        title: pack.title || '',
        description: pack.description || '',
        price: pack.price || '',
        days: pack.days || '',
        offers: pack.offers || '',
        type: pack.type || 'hotel'
      });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);
    await axios.put(`http://localhost:3000/package/${id}`, formData);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/packageDetails'));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex bg-[#EAF4F6] mt-15">
        <div className="mx-130 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
          >
            <h1 className="text-2xl font-bold text-[#023545] mb-6">Update Package</h1>

            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              required
              className="mt-1 mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={inputs.description}
              onChange={handleChange}
              required
              className="mt-1 mb-4 w-full border rounded-md p-2"
            ></textarea>

            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChange}
              required
              className="mt-1 mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700">Days</label>
            <input
              type="number"
              name="days"
              value={inputs.days}
              onChange={handleChange}
              required
              className="mt-1 mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700">Offers</label>
            <input
              type="text"
              name="offers"
              value={inputs.offers}
              onChange={handleChange}
              className="mt-1 mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={inputs.type}
              onChange={handleChange}
              required
              className="mt-1 mb-4 w-full border rounded-md p-2"
            >
              <option value="hotel">Hotel</option>
              <option value="boatTour">Boat Tour</option>
              <option value="Both">Both</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">New Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 mb-6 w-full"
            />

            <input
              type="submit"
              value="Update"
              className="bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-teal-700 w-full"
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdatePackages;
