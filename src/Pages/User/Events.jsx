import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/event05.jpeg'
import { motion } from 'framer-motion'
import  { useEffect, useState } from 'react';
import axios from 'axios';
function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/events");
        setEvents(res.data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div >
        <Navbar />
      
      {/* Animate the Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero 
          cName="hero"
          heroImg={img1}
          title="Events/Activities around Hikkaduwa"
          text=" Discover the latest events and fun activities happening around Hikkaduwa from beach festivals and cultural shows to thrilling diving adventures."
          overlayOpacity="20"
        />
      </motion.div>
      
      <div>
        <h1 className="text-4xl font-bold text-center mt-10 mb-7 text-[#023545] mx-7">Explore beach festivals, cultural shows, diving trips, turtle hatcheries, surf contests, and local markets all bringing Hikkaduwa’s vibrant spirit to life.</h1>
      </div>
     <div className="p-6 grid gap-10 md:grid-cols-2 mx-20 ">
      {events.map((event, index) => (
        <div key={index} className="flex bg-gradient-to-b from-[#EAF4F6] to-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-60 h-80 object-cover m-3"
          />
          <div className="p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold  text-black mb-3">{event.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-7">{event.description}</p>
              <p className="text-sm text-gray-500 mb-1 mt-5">Date: {event.date.slice(0, 10)}</p>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#023545] hover:underline mt-5"
              >
                View on Map
              </a>
            </div>
            
          </div>
        </div>
      ))}
    </div>

      <Footer/>
    </div>
  )
}

export default Events
