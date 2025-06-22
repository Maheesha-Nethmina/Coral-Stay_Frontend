import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarDays } from "lucide-react";

import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Common/Hero';
import Footer from '../../Components/Footer/Footer';

import room1 from '../../assets/Accomodation-Room1.png';
import room2 from '../../assets/Accomodation-Room2.png';
import room3 from '../../assets/Accomodation-Room3.png';
import room4 from '../../assets/Accomodation-Room4.png';
import room5 from '../../assets/Accomodation-Room5.png';

import image1 from '../../assets/RoomBooking.png';
import image2 from '../../assets/RoomBooking2.png';

const roomsData = [
  {
    id: 1,
    title: 'Deluxe Room',
    size: '46 sqm',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Slippers', 'Safety locker', 'Room service', 'Shower/WC'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 20,000.00' },
      { type: 'Half Board Package', price: 'LKR 15,000.00' },
      { type: 'Room Only Package', price: 'LKR 10,000.00' }
    ],
    rooms: 5,
    image: room1
  },
  {
    id: 2,
    title: 'Premier Room',
    size: '46 sqm',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Room service', 'Tea Maker', 'Umbrella', 'Safety Locker'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 30,000.00' },
      { type: 'Half Board Package', price: 'LKR 25,000.00' },
      { type: 'Room Only Package', price: 'LKR 20,000.00' }
    ],
    rooms: 3,
    image: room2
  },
  {
    id: 3,
    title: 'Royal Suite',
    size: '60 sqm',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Room service'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 35,000.00' },
      { type: 'Half Board Package', price: 'LKR 32,000.00' },
      { type: 'Room Only Package', price: 'LKR 30,000.00' }
    ],
    rooms: 2,
    image: room3
  },
  {
    id: 4,
    title: 'Premier Ocean Room',
    size: '50 sqm',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Tea Maker', 'Room service', 'Shower Cubicle', 'Safety Locker', 'Celling Fan'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 40,000.00' },
      { type: 'Half Board Package', price: 'LKR 35,000.00' },
      { type: 'Room Only Package', price: 'LKR 30,000.00' }
    ],
    rooms: 4,
    image: room4
  },
  {
    id: 5,
    title: 'Presidential Suite',
    size: '80 sqm',
    features: ['Bathrobe', 'iron', 'Free wifi', 'Minibar', 'Tea Maker', 'Room service', 'Shower Cubicle', 'Celling Fan', 'Safety Locker'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 55,000.00' },
      { type: 'Half Board Package', price: 'LKR 50,000.00' },
      { type: 'Room Only Package', price: 'LKR 45,000.00' }
    ],
    rooms: 1,
    image: room5
  }
];

function RoomBooking() {
  const location = useLocation();
  const initialCheckIn = location.state?.checkIn || '';
  const initialCheckOut = location.state?.checkOut || '';

  const [selectedPackages, setSelectedPackages] = useState({});
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [formError, setFormError] = useState('');

  const handlePackageChange = (roomId, packageType) => {
    setSelectedPackages(prev => ({
      ...prev,
      [roomId]: packageType
    }));
  };

  const handleCancelPackage = (roomId) => {
    setSelectedPackages(prev => {
      const updated = { ...prev };
      delete updated[roomId];
      return updated;
    });
  };

  const doBooking = (room) => {
    const selectedPackage = selectedPackages[room.id];
    setFormError('');
    // POST booking to backend
    fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: room.id,
        roomTitle: room.title,
        packageType: selectedPackage,
        checkIn: initialCheckIn,
        checkOut: initialCheckOut,
        guestName,
        guestEmail,
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Booking successful!');
      })
      .catch(() => {
        alert('Booking failed!');
      });
  };

  const handleBookNow = (room) => {
    const selectedPackage = selectedPackages[room.id];
    if (!guestName || !guestEmail) {
      setFormError('Please enter your name and email before booking.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!selectedPackage) {
      setFormError('Please select a package first.');
      return;
    }
    if (!initialCheckIn || !initialCheckOut) {
      setFormError('Check-in and check-out dates are missing.');
      return;
    }
    setFormError('');
    doBooking(room);
  };

  return (
    <div className="relative">
      <Navbar />

      {/* Error Popup */}
      {formError && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-6 py-3 rounded shadow-lg font-semibold text-center animate-bounce">
            {formError}
          </div>
        </div>
      )}

      {/* Hero Section with Hover */}
      <div className="relative overflow-hidden group">
        <div className="transition-transform duration-500 group-hover:scale-105">
          <Hero
            cName="hero"
            heroImg={image1}
            title="Where Luxury Meets the Rhythm of the Sea."
            text="Soothing colors, island textures, and sea views - your perfect escape awaits."
            overlayOpacity="20"
          />
        </div>

        {/* Show selected dates */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-8 bg-white/90 shadow-lg max-w-2xl mx-auto rounded-lg px-8 py-5 border border-teal-100">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-teal-600" />
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Check-In
                  </label>
                  <div className="border border-gray-200 px-4 py-2 rounded-md bg-gray-100 text-gray-700 min-w-[120px] text-center font-semibold">
                    {initialCheckIn}
                  </div>
                </div>
              </div>
              <span className="text-gray-400 font-bold text-xl">→</span>
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-teal-600" />
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Check-Out
                  </label>
                  <div className="border border-gray-200 px-4 py-2 rounded-md bg-gray-100 text-gray-700 min-w-[120px] text-center font-semibold">
                    {initialCheckOut}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Info Form */}
      <div className="max-w-2xl mx-auto mt-10 mb-4 bg-white/90 rounded-lg shadow px-8 py-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Your Details</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={guestEmail}
            onChange={e => setGuestEmail(e.target.value)}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
            required
          />
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Please enter your name and email to receive a confirmation email for your booking.
        </div>
      </div>

      {/* Room Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {roomsData.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/3 relative overflow-hidden group">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">View Room</span>
                  </div>
                </div>

                {/* Details */}
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{room.title}</h3>
                      <p className="text-gray-600 mb-4">Room size: {room.size}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Select Your Package</h4>
                    <div className="space-y-2">
                      {room.packages.map((pkg, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`package-${room.id}`}
                              value={pkg.type}
                              checked={selectedPackages[room.id] === pkg.type}
                              onChange={() => handlePackageChange(room.id, pkg.type)}
                              className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700">{pkg.type} {pkg.price}</span>
                          </label>
                          {selectedPackages[room.id] === pkg.type && (
                            <button
                              type="button"
                              onClick={() => handleCancelPackage(room.id)}
                              className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Rooms</span>
                        <div className="text-center mt-1">
                          <span className="bg-gray-100 px-2 py-1 rounded">{room.rooms}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Price</span>
                        <div className="text-center mt-1 font-bold text-lg">
                          {selectedPackages[room.id]
                            ? room.packages.find(p => p.type === selectedPackages[room.id])?.price
                            : room.packages[0].price
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                        More Info
                      </button>
                      <button
                        onClick={() => handleBookNow(room)}
                        className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Image Section */}
      <section className="bg-gray-50">
        <img 
          src={image2} 
          alt="Coral Stay Beach Resort" 
          className="w-full h-64 object-cover hover:opacity-90 transition-opacity duration-300"
        />
      </section>

      <Footer />
    </div>
  );
}

export default RoomBooking;