// DeluxeRoom.jsx
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Common/Hero';
import Footer from '../../Components/Footer/Footer';
import img1 from '../../assets/deluxeRoom.jpg';
import RoomShowcase from '../../Components/Common/RoomShowcase';
import RoomCard from '../../Components/Common/RoomCard';
import image1 from '../../assets/Room2.jpg';
import image2 from '../../assets/Room1.jpg';
import { useNavigate } from 'react-router-dom';

function DeluxeRoom() {
  const navigate = useNavigate();

  // Helper: Default booking state for Deluxe Room
  const handleBookNow = () => {
    // You can set default values or prompt user for check-in/out/package in a real app
    navigate('/roomBookingForm', {
      state: {
        roomId: 1,
        roomTitle: "Deluxe Room",
        packageType: "Full Board Package",
        checkIn: "2025-06-28",
        checkOut: "2025-06-30",
        price: "LKR 20,000.00",
        quantity: 1,
      }
    });
  };

  // Helper for RoomCard click
  const handleRoomCardClick = (roomType) => {
    switch (roomType) {
      case "Presidential Suite":
        navigate('/presidentialsuiteroom');
        break;
      case "Premier Room":
        navigate('/premierroom');
        break;
      case "Royal Suite":
        navigate('/royalsuiteroom');
        break;
      case "Premier Ocean Room":
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
        title="Deluxe Room"
        text="Experience luxury and comfort in our Deluxe Room, designed for the discerning traveler."
        overlayOpacity="20"
      />

      <RoomShowcase
        title="Affordable Beachfront Luxury in Hikkaduwa"
        description="Experience the perfect blend of comfort and elegance with our Deluxe Rooms at Coral Stay in Hikkaduwa. These rooms are thoughtfully designed to offer luxury at an affordable price. Each Deluxe Room features modern amenities and exclusive facilities, wrapped in a compact yet stylish space."
        images={[image1, image2]}
        tagline="A compact and cosy abode that lets you indulge in a host of luxurious comforts!"
        ctaText="Book Now"
        onCtaClick={handleBookNow}
        amenities={[
          "Air-condition", "Bathtubs", "Slippers", "Ceiling Fan",
          "Shower Cubicle", "Bathrobes", "Safe", "Radio",
          "Room Amenities", "Mini Bar", "Broadband & Wi-fi",
          "Iron Board", "Hair Dryer", "View"
        ]}
        tagline2="Recommended Room Type"
        ctaText2="View All"
        onCta2Click={() => navigate('/room-booking')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mx-15">
        <RoomCard
          title="Presidential Suite"
          description="Luxurious comforts, space and gorgeous views are all part of the Presidential Suite."
          image={image1}
          onImageClick={() => handleRoomCardClick("Presidential Suite")}
        />
        <RoomCard
          title="Premier Room"
          description="The perfect rest stop in between adventures out in Sri Lanka's beautiful South Coast."
          image={image2}
          onImageClick={() => handleRoomCardClick("Premier Room")}
        />
        <RoomCard
          title="Royal Suite"
          description="Seaside accommodation that comes with a touch of exclusivity!"
          image={image1}
          onImageClick={() => handleRoomCardClick("Royal Suite")}
        />
        <RoomCard
          title="Premier Ocean Room"
          description="Elegant coastal comfort with stunning ocean views and refined amenities."
          image={image1}
          onImageClick={() => handleRoomCardClick("Premier Ocean Room")}
        />
      </div>

      <Footer />
    </div>
  );
}

export default DeluxeRoom;
