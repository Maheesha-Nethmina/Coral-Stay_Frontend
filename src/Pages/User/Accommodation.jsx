import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Common/Hero';
import Footer from '../../Components/Footer/Footer';

import accommodationImg from '../../assets/Accomodation01.png';
import room1 from '../../assets/Accomodation-Room1.png';
import room2 from '../../assets/Accomodation-Room2.png';
import room3 from '../../assets/Accomodation-Room3.png';
import room4 from '../../assets/Accomodation-Room4.png';
import room5 from '../../assets/Accomodation-Room5.png';

import ocean from '../../assets/sun-umbrella 1.png';
import bed from '../../assets/bed 1.png';
import wifi from '../../assets/wifi 1.png';
import service from '../../assets/room-service 1.png';

import dining from '../../assets/Dining.png';

import { Link } from 'react-router-dom';


function Accommodation() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [dateError, setDateError] = useState('');

  const rooms = [
    { title: 'Deluxe Room', img: room1, desc: 'Enjoy sublime comforts at our Deluxe Rooms during your stay in the South Coast.',link: '/DeluxeRoom' },
    { title: 'Premier Room', img: room2, desc: 'The perfect rest stop in-between adventures out in Sri Lanka’s beautiful South Coast.',link:'/PremierRoom' },
    { title: 'Royal Suite', img: room3, desc: 'Seaside accommodation that comes with a touch of exclusivity!',link: '/RoyalSuiteRoom' },
    { title: 'Premier Ocean Room', img: room4, desc: 'Wake up to ocean vistas in a room that echoes nature, with soft hues and native design details.',link: '/premieroceanroom' },
    { title: 'Presidential Suite', img: room5, desc: 'Luxurious comforts, space and gorgeous views are all part of the Presidential Suite.' ,link: '/PresidentialSuiteRoom'}
  ];

  const handleCheckInChange = (e) => {
    const value = e.target.value;
    setCheckIn(value);
    // Reset checkOut if it's before new checkIn
    if (checkOut && value && checkOut <= value) {
      setCheckOut('');
      setDateError('Check-out date must be after check-in date.');
    } else {
      setDateError('');
    }
  };

  const handleCheckOutChange = (e) => {
    const value = e.target.value;
    setCheckOut(value);
    if (checkIn && value && value <= checkIn) {
      setDateError('Check-out date must be after check-in date.');
    } else {
      setDateError('');
    }
  };

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      setDateError('Please select both check-in and check-out dates.');
      return;
    }
    if (checkOut <= checkIn) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }
    setDateError('');
    navigate('/room-booking', { state: { checkIn, checkOut } });
  };

  return (
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <div className="relative">
        <Hero
          cName="hero"
          heroImg={accommodationImg}
          title="Stay Your Way - Comfort Meets Style"
          text="Find your perfect place to stay - stylish, simple, and stress-free."
          overlayOpacity="30"
        />

        {/* Booking Bar */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/90 shadow-lg max-w-4xl mx-auto rounded-lg px-8 py-5 items-end">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={checkIn}
                onChange={handleCheckInChange}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
              <input
                type="date"
                min={checkIn || new Date().toISOString().split('T')[0]}
                value={checkOut}
                onChange={handleCheckOutChange}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
                disabled={!checkIn}
              />
            </div>
            <button
              onClick={handleBookNow}
              className="bg-teal-900 hover:bg-teal-800 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book Now
            </button>
          </div>
          {dateError && (
            <div className="text-center mt-2 text-red-600 font-semibold text-sm">
              {dateError}
            </div>
          )}
        </div>
      </div>

      {/* Resort Description */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-left">
        <h2 className="text-3xl font-semibold mb-4 text-center">Coral Stay Beach Resort</h2>
        <p className="text-teal-800 font-medium mb-4 text-lg text-center">Where you meet the sea</p>
        <p className="text-gray-700 leading-relaxed">
          Nestled along the sun-kissed shores of Hikkaduwa, Coral Stay Beach Resort & Spa offers a captivating blend of pristine beaches, swaying coconut palms, and panoramic ocean views from every corner. As a standout among Hikkaduwa’s beachfront escapes, this premier resort boasts a refined collection of luxurious accommodations, vibrant bars, gourmet restaurants, boutique shops, and lively entertainment venues. Coral Stay is your perfect sanctuary to immerse yourself in the true essence of tropical paradise!
        </p>
      </section>

      {/* Why Book With Us */}
      <section className="bg-gray-100 py-12">
        <h3 className="text-2xl font-semibold text-center mb-10">Why Book Direct With Us</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
          {[{ img: ocean, label: 'Ocean View' }, { img: bed, label: 'Luxury Rooms' }, { img: wifi, label: 'High-Speed Wi-Fi' }, { img: service, label: 'Room Services' }].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-110">
              <img src={feature.img} alt={feature.label} className="h-16 mb-2" />
              <p className="font-medium text-gray-700">{feature.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Room Showcase */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-left">
          <h2 className="text-2xl font-semibold text-center mb-6">Recommended Room Types</h2>
          <p className="text-gray-600 mb-10 text-left">
            Whether you prefer to gaze out at lush coastal greenery and vibrant tropical gardens or fall asleep to the soothing rhythm of the Indian Ocean, you'll find sanctuary in every one of our rooms and suites at Coral Stay Hikkaduwa—each thoughtfully designed to reflect the charm and vibrant spirit of Sri Lanka’s southern coast.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" >
            {rooms.map((room, index) => (
               <Link to={room.link} key={index}>
              <div key={index} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                <img src={room.img} alt={room.title} className="w-full h-72 object-cover opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-semibold">{room.title}</h3>
                  <p className="text-sm">{room.desc}</p>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Image with Hover Effect */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <img
            src={dining}
            alt="Dining"
            className="w-full h-auto rounded-lg shadow-md opacity-95 transform transition duration-500 hover:scale-105 hover:shadow-xl"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Accommodation;
