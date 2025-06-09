import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Common/Hero';
// import Footer from '../../Components/Footer/Footer';

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

import dining1 from '../../assets/Accomodation-Dining1.png';
import dining2 from '../../assets/Accomodation-Dining2.png';
import dining3 from '../../assets/Accomodation_dining3.png';

function Accommodation() {
  return (
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <div>
      <Hero
        cName="hero"
        heroImg={accommodationImg}
        title="Stay Your Way - Comfort Meets Style"
        text="Find your perfect place to stay - stylish, simple, and stress-free."
        overlayOpacity="20"
 />
        {/* Booking Bar */}
      <div className="flex justify-center items-center gap-4 py-6 bg-white shadow-md -mt-12 mb-6 z-10 relative max-w-4xl mx-auto rounded-lg px-6">
        <input
          type="date"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
        />
        <input
          type="date"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
        />
        <button className="bg-teal-900 hover:bg-teal-800 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg">
          Book Now
        </button>
      </div>
     

      
      </div>

      {/* Resort Description */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Coral Stay Beach Resort</h2>
        <p className="text-teal-800 font-medium mb-4 text-lg">Where you meet the sea</p>
        <p className="text-gray-700 leading-relaxed">
          Nestled along the sun-kissed shores of Hikkaduwa, Coral Stay Beach Resort & Spa offers a captivating blend of pristine beaches, swaying coconut palms, and panoramic ocean views from every corner. As a standout among Hikkaduwa’s beachfront escapes, this premier resort boasts a refined collection of luxurious accommodations, vibrant bars, gourmet restaurants, boutique shops, and lively entertainment venues. Coral Stay is your perfect sanctuary to immerse yourself in the true essence of tropical paradise!
        </p>
      </section>

      {/* Why Book With Us Section */}
      <section className="bg-gray-100 py-12">
        <h3 className="text-2xl font-semibold text-center mb-10">Why Book Direct With Us</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
          {[{ img: ocean, label: 'Ocean View' }, { img: bed, label: 'Luxury Rooms' }, { img: wifi, label: 'High-Speed Wi-Fi' }, { img: service, label: 'Room Services' }].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-110"
            >
              <img src={feature.img} alt={feature.label} className="h-16 mb-2" />
              <p className="font-medium text-gray-700">{feature.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Room Showcase Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold text-center mb-6">Recommended Room Types</h2>
          <p className="text-center text-gray-600 mb-10 max-w-4xl mx-auto">
            Whether you prefer to gaze out at lush coastal greenery and vibrant tropical gardens or fall asleep to the soothing rhythm of the Indian Ocean, you'll find sanctuary in every one of our rooms and suites at Coral Stay Hikkaduwa — each thoughtfully designed to reflect the charm and vibrant spirit of Sri Lanka’s southern coast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Deluxe Room', img: room1, desc: 'Enjoy sublime comforts at our Deluxe Rooms during your stay in the South Coast.' },
              { title: 'Premier Room', img: room2, desc: 'The perfect rest stop in-between adventures out in Sri Lanka’s beautiful South Coast.' },
              { title: 'Royal Suite', img: room3, desc: 'Seaside accommodation that comes with a touch of exclusivity!' },
              { title: 'Premier Ocean Room', img: room4, desc: 'Wake up to ocean vistas in a room that echoes nature, with soft hues and native design details.' },
              { title: 'Presidential Suite', img: room5, desc: 'Luxurious comforts, space and gorgeous views are all part of the Presidential Suite.' }
            ].map((room, index) => (
              <div key={index} className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
                <img src={room.img} alt={room.title} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{room.title}</h4>
                  <p className="text-gray-600 text-sm">{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Gallery Section */}
      <section className="py-12 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[dining1, dining2, dining3].map((img, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <img src={img} alt={`Dining ${index + 1}`} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
      </section>


      {/* <Footer /> */}
    </div>
  );
}

export default Accommodation;
