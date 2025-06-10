import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../../assets/event03.jpeg'
function addEvents() {
  const history = useNavigate();
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
    history("/eventDetails");
  };

  return (
    <div className="min-h-screen flex bg-[#EAF4F6]">
      {/* Left Side Image */}
      <div className="w-1/2  bg-[#023545] flex items-center justify-center p-20">
        <div className="">
          <img src={img1} alt="Add Events" />
          </div>
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h1 className="text-2xl font-bold text-[#023545] mb-6">Add Event</h1>

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

          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
            className="mt-1 mb-4 w-full border rounded-md p-2"
          />

          <label className="block text-sm font-medium text-gray-700">Map URL</label>
          <input
            type="url"
            name="mapUrl"
            value={inputs.mapUrl}
            onChange={handleChange}
            required
            className="mt-1 mb-4 w-full border rounded-md p-2"
          />

          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 mb-6 w-full"
          />

          <input
            type="submit"
            value="Submit"
            className="bg-[#023545] text-white px-4 py-2 rounded-md hover:bg-teal-700 w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default addEvents;
