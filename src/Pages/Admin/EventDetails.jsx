import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';

const URL = "http://localhost:3000/events";

const fetchHandler = async () => {
  return await axios.get(URL).then((response) => response.data);
};

function EventDetails() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setEvents(data.events));
  }, []);

  const handleDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
  };

 

  return (
    <div>
      <h1>User Details Display Page</h1>
     <div className="overflow-x-auto w-full p-4">
      <div className="grid grid-cols-[100px_200px_150px_1.5fr_120px_200px_100px] gap-4 bg-gray-100 text-gray-700 uppercase text-sm font-semibold mb-2 p-2 rounded">
        <div>Image</div>
        <div>ID</div>
        <div>Title</div>
        <div>Description</div>
        <div>Date</div>
        <div>Map URL</div>
        <div>Actions</div>
      </div>
      </div>

      {noResults ? (
        <div><h2>No results found</h2></div>
      ) : (
        <div>
          {events.map((event, i) => (
            <div key={i}><Event event={event} onDelete={handleDelete} /></div>
          ))}
        </div>
      )}

      <br />
    </div>
  );
}

export default EventDetails;