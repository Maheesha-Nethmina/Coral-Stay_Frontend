import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function AddEvents() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", description: "", date: "", mapUrl: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);

    await axios.post("http://localhost:3000/events", formData);
    navigate("/eventDetails");
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 bg-[#eaf4f6] mt-10">
        {/* Sidebar */}
        <aside className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
          >
            <h1 className="text-2xl font-bold text-[#023545] mb-6">Add Event</h1>

            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              required
              className="mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              value={inputs.description}
              onChange={handleChange}
              required
              className="mb-4 w-full border rounded-md p-2"
            ></textarea>

            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              required
              className="mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Map URL</label>
            <input
              type="url"
              name="mapUrl"
              value={inputs.mapUrl}
              onChange={handleChange}
              required
              className="mb-4 w-full border rounded-md p-2"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-6 w-full border rounded-md p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#eaf4f6] file:text-[#023545] hover:file:bg-[#d1e7ed] transition-all cursor-pointer"
            />

            <input
              type="submit"
              value="Submit"
              className="bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-[#014459] w-full transition"
            />
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AddEvents;
