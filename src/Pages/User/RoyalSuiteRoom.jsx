import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Common/Hero'
import Footer from '../../Components/Footer/Footer'
import img1 from '../../assets/Room2.jpg'
import RoomShowcase from '../../Components/Common/RoomShowcase'
import RoomCard from '../../Components/Common/RoomCard'
import image1 from '../../assets/Room2.jpg'
import image2 from '../../assets/Room1.jpg'
function RoyalSuiteRoom() {
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
        description="Create lasting memories with your loved ones at Coral Stay Hikkaduwa - one of the top family hotels in Hikkaduwa. Our spacious One and Two Bedroom units accommodate up to six guests, featuring interconnected rooms, kitchenettes, and modern amenities. Enjoy free Wi-Fi, cozy bathrobes, and optional child-friendly services like babysitting and kids’ menus. End your day with stunning ocean views and unforgettable sunsets by the beach."
  images={[image1, image2]}
  tagline="A compact and cosy abode that lets you indulge in a host of luxurious comforts!"
        ctaText="Book Now"
        amenities={[
          "Air-condition",
          "Bathtubs",
           "Slippers",
          "Ceiling Fan",
           "Shower Cubicle",
           "Bathrobes",
          "Safe",
          "Radio",
          "Room Amenities",
          "Mini Bar",
          "Broadband & Wi-fi",
          "Broadband & Wi-fi",
          "Iron Board",   
          "Hair Dryer",
          "Broadband & Wi-fi",
          "View"
        ]}
      tagline2="Recommended Room Type"
      ctaText2="View All"

/>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mx-15">
      <RoomCard
        title="Presidential Suite"
        description="Luxurious comforts,space and gorgeous views are all part of the presidential Suite."
        image={image1}
      />
      <RoomCard
        title="Premier Room"
        description="The perfect rest stop in between adventures out in Sri Lanka's beautiful South Coast."
        image={image2}
      />
      <RoomCard
        title="Deluxe Room"
        description="Enjoy sublime comforts at our Deluxe Rooms during your stay in the South Coast."
        image={image2}
      />

       <RoomCard
        title="Premier Ocean Room"
        description="Elegant coastal comfort with stunning ocean views and refined amenities."
        image={image1}
      />
      </div>

      <Footer/>
    </div>
  )
}

export default RoyalSuiteRoom
