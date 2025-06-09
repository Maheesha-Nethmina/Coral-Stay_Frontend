import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Common/Hero';
import Footer from '../Footer/Footer';

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
  const [selectedPackages, setSelectedPackages] = useState({});
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handlePackageChange = (roomId, packageType) => {
    setSelectedPackages(prev => ({
      ...prev,
      [roomId]: packageType
    }));
  };

  const handleBookNow = (room) => {
    const selectedPackage = selectedPackages[room.id];
    if (!selectedPackage) {
      alert('Please select a package first');
      return;
    }
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    alert(`Booking ${room.title} with ${selectedPackage} from ${checkIn} to ${checkOut}`);
  };

  return (
    <div className="relative">
      <Navbar />

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

        {/* Booking Bar */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
          <div className="flex flex-wrap justify-center items-end gap-6 bg-white/90 shadow-lg max-w-4xl mx-auto rounded-lg px-8 py-5">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
                min={checkIn || new Date().toISOString().split('T')[0]}
                disabled={!checkIn}
              />
            </div>
          </div>
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
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
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