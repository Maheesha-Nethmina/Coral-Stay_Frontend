import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Common/Hero'
import Footer from '../Footer/Footer'
import img1 from '../../assets/Room2.jpg'
import RoomShowcase from '../Common/RoomShowcase'
import image1 from '../../assets/Room2.jpg'
import image2 from '../../assets/Room1.jpg'
function DeluxeRoom() {
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
        description="Experience the perfect blend of comfort and elegance with our Deluxe Rooms at Coral Stay in Hikkaduwa. These rooms are thoughtfully designed to offer luxury at an affordable price. Each Deluxe Room features modern amenities and exclusive facilities, wrapped in a compact yet stylish space. Wake up to breathtaking ocean views and unwind in interiors crafted with refined taste."
  images={[image1, image2]}
  tagline="A compact and cosy abode that lets you indulge in a host of luxurious comforts!"
        ctaText="Book Now"
        amenities={[
          "Air-condition",
          "Ceiling Fan",
          "Safe",
          "Mini Bar",
          "Iron Board",
          "Bathtubs",
          "Shower Cubicle",
          "Radio",
          "Broadband & Wi-fi",
          "Hair Dryer",
          "Slippers",
          "Bathrobes",
          "Room Amenities",
          "Differently Able Rooms",
          "View"
        ]}
/>

      <Footer/>
    </div>
  )
}

export default DeluxeRoom
