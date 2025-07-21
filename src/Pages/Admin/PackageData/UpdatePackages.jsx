import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import AdminNavbar from '../../../Components/Navbar/AdminNavbar';

function UpdatePackages() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    includes: '',
    price: '',
    days: '',
    offers: '',
    type: 'hotel',
    roomtype: 'Deluxe',
    seatNumber: ''
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/package/${id}`);
        const pack = res.data.package;
        setInputs({
          title: pack.title || '',
          description: pack.description || '',
          includes: pack.includes || '',
          price: pack.price || '',
          days: pack.days || '',
          offers: pack.offers || '',
          type: pack.type || 'hotel',
          roomtype: pack.roomtype || 'Deluxe',
          seatNumber: pack.seatNumber || ''
        });
      } catch (error) {
        alert('Failed to load package details: ' + (error.response?.data?.message || error.message));
      }
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
    sendRequest().then(() => navigate('/packageDetails'));
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#eaf4f6]">
        <div className="w-60 mt-10 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>

        <main className="flex-grow bg-[#EAF4F6] py-12 px-4 md:px-6 mt-10">
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-[#023545] mb-6 text-center">
              Update Package
            </h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
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
                />
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
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room type
                </label>
                <select
                  name="roomtype"
                  value={inputs.roomtype}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"

                >
                  <option value="">Select a Room Type</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Premier">Premier</option>
                  <option value="Royal">Royal</option>
                  <option value="PremierOcean">Premier Ocean</option>
                  <option value="Presidential">Presidential</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  name="seatNumber"
                  value={inputs.seatNumber}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">New Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="mb-6 w-full border rounded-md p-2 text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                    file:text-sm file:font-semibold file:bg-[#eaf4f6] file:text-[#023545]
                    hover:file:bg-[#d1e7ed] transition-all cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-teal-700 w-full"
              >
                Update
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default UpdatePackages;
