// src/pages/RoomBooking/RoomBooking.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays } from "lucide-react";
import axios from 'axios';

import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Common/Hero';
import Footer from '../../Components/Footer/Footer';

import room1 from '../../assets/Accomodation-Room1.png';
import room2 from '../../assets/Accomodation-Room2.png';
import room3 from '../../assets/Accomodation-Room3.png';
import room4 from '../../assets/Accomodation-Room4.png';
import room5 from '../../assets/Accomodation-Room5.png';

import image1 from '../../assets/RoomBooking.png';

const roomsData = [
  {
    id: 1,
    title: 'Deluxe Room',
    size: 'One Twin Bed For 2 Adults',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Slippers', 'Safety locker', 'Room service', 'Shower/WC'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 20,000.00' },
      { type: 'Half Board Package', price: 'LKR 15,000.00' },
      { type: 'Room Only Package', price: 'LKR 10,000.00' }
    ],
    image: room1
  },
  {
    id: 2,
    title: 'Premier Room',
    size: 'One King Bed with Sofa Bed For 3 Adults',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Room service', 'Tea Maker', 'Umbrella', 'Safety Locker'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 30,000.00' },
      { type: 'Half Board Package', price: 'LKR 25,000.00' },
      { type: 'Room Only Package', price: 'LKR 20,000.00' }
    ],
    image: room2
  },
  {
    id: 3,
    title: 'Royal Suite',
    size: 'One King Bed  For 2 Adults',
    features: ['Safety Locker', 'Bathrobe', 'Free wifi', 'Minibar', 'Umbrella', 'Tea Maker', 'Room service'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 35,000.00' },
      { type: 'Half Board Package', price: 'LKR 32,000.00' },
      { type: 'Room Only Package', price: 'LKR 30,000.00' }
    ],
    image: room3
  },
  {
    id: 4,
    title: 'Premier Ocean Room',
    size: 'One King Bed with Sofa Bed For 3 Adults',
    features: ['Bathrobe', 'Free wifi', 'Minibar', 'Tea Maker', 'Room service', 'Shower Cubicle', 'Safety Locker', 'Ceiling Fan'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 40,000.00' },
      { type: 'Half Board Package', price: 'LKR 35,000.00' },
      { type: 'Room Only Package', price: 'LKR 30,000.00' }
    ],
    image: room4
  },
  {
    id: 5,
    title: 'Presidential Suite',
    size: 'One King Bed For 2 Adults',
    features: ['Bathrobe', 'Iron', 'Free wifi', 'Minibar', 'Tea Maker', 'Room service', 'Shower Cubicle', 'Ceiling Fan', 'Safety Locker'],
    packages: [
      { type: 'Full Board Package', price: 'LKR 55,000.00' },
      { type: 'Half Board Package', price: 'LKR 50,000.00' },
      { type: 'Room Only Package', price: 'LKR 45,000.00' }
    ],
    image: room5
  }
];

function RoomBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialCheckIn = location.state?.checkIn || '';
  const initialCheckOut = location.state?.checkOut || '';

  const [selectedPackages, setSelectedPackages] = useState({});
  const [formError, setFormError] = useState('');
  const [availableRooms, setAvailableRooms] = useState({});
  const [loadingAvailability, setLoadingAvailability] = useState({});

  const handlePackageChange = async (roomId, packageType) => {
    setSelectedPackages(prev => ({
      ...prev,
      [roomId]: packageType
    }));

    if (initialCheckIn && initialCheckOut) {
      setLoadingAvailability(prev => ({ ...prev, [roomId]: true }));
      try {
        const res = await axios.post('http://localhost:3000/bookings/availability', {
          roomId,
          packageType,
          checkIn: initialCheckIn,
          checkOut: initialCheckOut,
        });
        setAvailableRooms(prev => ({
          ...prev,
          [roomId]: res.data.availableRooms
        }));
      } catch (error) {
        setAvailableRooms(prev => ({
          ...prev,
          [roomId]: 0
        }));
      } finally {
        setLoadingAvailability(prev => ({ ...prev, [roomId]: false }));
      }
    }
  };

  const handleCancelPackage = (roomId) => {
    setSelectedPackages(prev => {
      const updated = { ...prev };
      delete updated[roomId];
      return updated;
    });
  };

  const handleBookNow = (room) => {
    const selectedPackage = selectedPackages[room.id];
    if (!selectedPackage) {
      setFormError('Please select a package first.');
      return;
    }
    if (!initialCheckIn || !initialCheckOut) {
      setFormError('Check-in and check-out dates are missing.');
      return;
    }
    setFormError('');

    const packageDetails = room.packages.find(p => p.type === selectedPackage);

    navigate('/roomBookingForm', {
      state: {
        roomId: room.id,
        roomTitle: room.title,
        packageType: selectedPackage,
        checkIn: initialCheckIn,
        checkOut: initialCheckOut,
        price: packageDetails.price,
        quantity: 1,
      },
    });
  };

  return (
    <div className="relative">
      <Navbar />

      {formError && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-6 py-3 rounded shadow-lg font-semibold text-center animate-bounce">
            {formError}
          </div>
        </div>
      )}

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
                    {initialCheckIn || 'Not selected'}
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
                    {initialCheckOut || 'Not selected'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {roomsData.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
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
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{room.title}</h3>
                      <p className="text-gray-600 mb-4">Room Type: {room.size}</p>
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

                  {selectedPackages[room.id] && (
                    <div className="mb-4 text-sm text-gray-700">
                      <span className="font-semibold">Available Rooms: </span>
                      {loadingAvailability[room.id]
                        ? <span className="text-gray-400">Checking...</span>
                        : availableRooms[room.id] !== undefined
                          ? <span className={availableRooms[room.id] > 0 ? "text-green-600" : "text-red-600"}>{availableRooms[room.id]}</span>
                          : <span className="text-gray-400">Select dates</span>
                      }
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {/* Only show price if a package is selected */}
                    {selectedPackages[room.id] && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Price</span>
                        <div className="text-center mt-1 font-bold text-lg">
                          {room.packages.find(p => p.type === selectedPackages[room.id])?.price}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => handleBookNow(room)}
                      disabled={selectedPackages[room.id] && availableRooms[room.id] === 0}
                      className={`px-5 py-2 rounded-md transition-colors text-white ${selectedPackages[room.id] && availableRooms[room.id] === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-teal-600 hover:bg-teal-700'
                        }`}
                    >
                      {selectedPackages[room.id] && availableRooms[room.id] === 0 ? 'Fully Booked' : 'Book Now'}
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RoomBooking;
