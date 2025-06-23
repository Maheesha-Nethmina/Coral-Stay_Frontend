import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

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

  const navigate = useNavigate();

  return (
    <div className="bg-[#eaf4f6] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 bg-[#eaf4f6] mt-10">
        {/* Sidebar */}
        <aside className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 mt-10">
          <h1 className="font-bold text-black text-lg mb-4">User Details Display Page</h1>

          {/* Add Event Button under the title */}
          <button
            onClick={() => navigate("/addEvents")}
            className="mb-6 px-6 py-2 bg-[#023545] text-white rounded-md font-semibold hover:bg-[#014459] transition"
          >
            Add Event
          </button>

          {/* Table Header */}
          <div className="overflow-x-auto w-full mb-4">
            <div className="grid grid-cols-[100px_200px_150px_1.5fr_120px_200px_100px] gap-4 bg-gray-100 text-gray-700 uppercase text-sm font-semibold p-2 rounded">
              <div>Image</div>
              <div>Title</div>
              <div>Description</div>
              <div>Date</div>
              <div>Map URL</div>
              <div>Actions</div>
            </div>
          </div>

          {/* Events Display */}
          {noResults ? (
            <div><h2>No results found</h2></div>
          ) : (
            <div className="space-y-4">
              {events.map((event, i) => (
                <div key={i}><Event event={event} onDelete={handleDelete} /></div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default EventDetails;
