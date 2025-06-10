import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:3000/events/${id}`)
        .then((response) => response.data)
        .then((data) => {
  const event = data.event;
  setInputs({
    title: event.title || '',
    description: event.description || '',
    date: event.date ? event.date.slice(0, 10) : '',
    mapUrl: event.mapUrl || ''
  });
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
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/eventDetails"));
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>title:</label><br />
        <input type="text" name="title" value={inputs?.title || ''} onChange={handleChange} required /><br /><br />

    <label>description:</label><br />
        <textarea name="description" rows="4" value={inputs?.description || ''} onChange={handleChange} required></textarea><br /><br />


        <label>date:</label><br />
        <input type="date" name="date" value={inputs?.date || ''} onChange={handleChange} required /><br /><br />

        <label>mapUrl:</label><br />
        <input type="url" name="mapUrl" value={inputs?.mapUrl || ''} onChange={handleChange} required /><br /><br />

        
        <label>New Image (optional):</label><br />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UpdateUser;