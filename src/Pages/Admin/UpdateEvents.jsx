import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function UpdateUser() {
  const [inputs, setInputs] = useState({ title: '', description: '', date: '', mapUrl: '' });
  const [image, setImage] = useState(null);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      const res = await axios.get(`http://localhost:3000/events/${id}`);
      const event = res.data.event;
      setInputs({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? event.date.slice(0, 10) : '',
        mapUrl: event.mapUrl || ''
      });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);
    await axios.put(`http://localhost:3000/events/${id}`, formData);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/eventDetails"));
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#eaf4f6]">
        <div className="w-60 mt-10 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>
      


      <div className="flex-grow flex items-center justify-center px-4 py-10 mt-10">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl"
        >
          <h1 className="text-2xl font-bold text-[#023545] mb-6 text-center">Update Event</h1>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Map URL</label>
            <input
              type="url"
              name="mapUrl"
              value={inputs.mapUrl}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">New Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-6 w-full border rounded-md p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#eaf4f6] file:text-[#023545] hover:file:bg-[#d1e7ed] transition-all cursor-pointer"
            />
          </div>

          <input
            type="submit"
            value="Update"
            className="bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-teal-700 w-full font-semibold"
          />
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateUser;
