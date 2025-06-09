import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    <div>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>title:</label><br />
        <input type="text" name="title" value={inputs.title} onChange={handleChange} required /><br /><br />

       <label>description:</label><br />
        <textarea name="description" rows="4" value={inputs.description} onChange={handleChange} required></textarea><br /><br />

        <label>date:</label><br />
        <input type="date" name="date" value={inputs.date} onChange={handleChange} required /><br /><br />

        <label>map Url:</label><br />
        <input type="url" name="mapUrl" value={inputs.mapUrl} onChange={handleChange} required /><br /><br />

        <label>Image:</label><br />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default addEvents
