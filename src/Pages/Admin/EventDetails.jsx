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