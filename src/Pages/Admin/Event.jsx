import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Event({ event, onDelete }) {
  if (!event) return null;

  const { _id, title, description, date, mapUrl, imageUrl } = event;

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:3000/events/${_id}`);
      if (onDelete) onDelete(_id);
    } catch (error) {
      alert("Delete failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt={name} width="150" /> : <p>No Image</p>}
      <p>ID: {_id}</p>
      <p>title: {title}</p>
      <p>description: {description}</p>
      <p>date: {date? date.slice(0, 10) : ''}</p>
      <p>mapUrl: {mapUrl}</p>
      <Link to={`/eventDetails/${_id}`}>Update</Link><br />
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default Event;
