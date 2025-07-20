import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import AdminNavbar from '../../../Components/Navbar/AdminNavbar';

function AddPackages() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    includes: '',
    price: '',
    days: '',
    offers: '',
    type: 'hotel',
    roomtype: '',
    seatNumber : ''
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

    try {
      await axios.post('http://localhost:3000/package', formData);
      navigate('/packageDetails');
    } catch (error) {
      alert('Failed to add package: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 bg-[#eaf4f6] mt-10">
        <aside className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </aside>

        <main className="flex-1 flex items-center justify-center p-6 mt-16">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
          >
            <h1 className="text-2xl font-bold text-[#023545] mb-6 text-center">
              Add Package
            </h1>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={inputs.description}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Includes
                </label>
                <input
                  type="text"
                  name="includes"
                  value={inputs.includes}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={inputs.price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days
                  </label>
                  <input
                    type="number"
                    name="days"
                    value={inputs.days}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offers
                </label>
                <input
                  type="text"
                  name="offers"
                  value={inputs.offers}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={inputs.type}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-2"
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
                  className="w-full border rounded-md p-2"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Seats
                </label>
                <input
                  type="number"
                  name="seatNumber"
                  value={inputs.seatNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
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
            </div>

            <input
              type="submit"
              value="Submit"
              className="mt-6 bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-[#014459] w-full transition"
            />
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AddPackages;
