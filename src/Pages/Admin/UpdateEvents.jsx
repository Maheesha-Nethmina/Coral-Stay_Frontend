import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import img1 from '../../assets/event04.jpeg';

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
    <div className="min-h-screen flex bg-[#EAF4F6]">
      {/* Left Side Image */}
      <div className="w-1/2 bg-[#023545] flex items-center justify-center p-20">
        <img src={img1} alt="Update Event" />
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h1 className="text-2xl font-bold text-[#023545] mb-6">Update Event</h1>

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
  );
}

export default UpdateUser;
