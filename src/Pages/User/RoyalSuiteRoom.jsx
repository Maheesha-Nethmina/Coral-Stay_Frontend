import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Common/Hero';
import Footer from '../../Components/Footer/Footer';
import img1 from '../../assets/Room2.jpg';
import RoomShowcase from '../../Components/Common/RoomShowcase';
import RoomCard from '../../Components/Common/RoomCard';
import image1 from '../../assets/Room2.jpg';
import image2 from '../../assets/Room1.jpg';
import { useNavigate } from 'react-router-dom';

function RoyalSuiteRoom() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/stays#book-section');
  };

  const handleViewAll = () => {
    navigate('/stays#room-types');
  };

  const handleRoomCardClick = (roomType) => {
    switch (roomType) {
      case 'Presidential Suite':
        navigate('/presidentialsuiteroom');
        break;
      case 'Premier Room':
        navigate('/premierroom');
        break;
      case 'Deluxe Room':
        navigate('/deluxeroom');
        break;
      case 'Premier Ocean Room':
        navigate('/premieroceanroom');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Navbar />

      <Hero
        cName="hero"
        heroImg={img1}
        title="Royal Suite"
        text="Experience luxury and comfort in our Royal Suite, designed for the discerning traveler."
        overlayOpacity="20"
      />

      <RoomShowcase
        title="Affordable Beachfront Luxury in Hikkaduwa"
        description="Create lasting memories with your loved ones at Coral Stay Hikkaduwa — one of the top family hotels in Hikkaduwa. Our spacious One and Two Bedroom units accommodate up to six guests, featuring interconnected rooms, kitchenettes, and modern amenities. Enjoy free Wi-Fi, cozy bathrobes, and optional child-friendly services like babysitting and kids’ menus. End your day with stunning ocean views and unforgettable sunsets by the beach."
        images={[image1, image2]}
        tagline="A compact and cosy abode that lets you indulge in a host of luxurious comforts!"
        amenities={[
          'Air-condition',
          'Bathtubs',
          'Slippers',
          'Ceiling Fan',
          'Shower Cubicle',
          'Bathrobes',
          'Safe',
          'Radio',
          'Room Amenities',
          'Mini Bar',
          'Broadband & Wi-fi',
          'Iron Board',
          'Hair Dryer',
          'View',
        ]}
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 mb-10">
        <button
          onClick={handleBookNow}
          className="bg-[#367588] hover:bg-[#2b5e6d] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Book Now
        </button>

        <button
          onClick={handleViewAll}
          className="bg-[#367588] hover:bg-[#2b5e6d] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          View All
        </button>
      </div>

      {/* Recommended Rooms */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Recommended Room Types</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-10">
        <RoomCard
          title="Presidential Suite"
          description="Luxurious comforts, space and gorgeous views are all part of the Presidential Suite."
          image={image1}
          onImageClick={() => handleRoomCardClick('Presidential Suite')}
        />
        <RoomCard
          title="Premier Room"
          description="The perfect rest stop in between adventures out in Sri Lanka's beautiful South Coast."
          image={image2}
          onImageClick={() => handleRoomCardClick('Premier Room')}
        />
        <RoomCard
          title="Deluxe Room"
          description="Enjoy sublime comforts at our Deluxe Rooms during your stay in the South Coast."
          image={image2}
          onImageClick={() => handleRoomCardClick('Deluxe Room')}
        />
        <RoomCard
          title="Premier Ocean Room"
          description="Elegant coastal comfort with stunning ocean views and refined amenities."
          image={image1}
          onImageClick={() => handleRoomCardClick('Premier Ocean Room')}
        />
      </div>

      <Footer />
    </div>
  );
}

export default RoyalSuiteRoom;
