import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { motion } from 'framer-motion'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/reef.jpeg'
import AboutReef from '../../Components/ReefRide/AboutReef'
import Footer from '../../Components/Footer/Footer'
import BookBoat from '../../Components/ReefRide/BoatBooking/BookBoat'
import BoatPackages from '../../Components/ReefRide/BoatPackages'
import BoatHotelPackages from '../../Components/ReefRide/BoatHotelPackages'
import img2 from '../../assets/reef2.jpeg'
function Reef_Ride() {
  return (
    <div>
      <Navbar/>
       <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero 
          cName="hero"
          heroImg={img1}
          title="Discover the Hidden Wonders beneath the Waves"
          text="Explore nature's most colourful coral reefs with our exclusive boat tours."
          overlayOpacity="20"
        />
        <AboutReef/>
        <BookBoat />
       <div className="relative w-full h-screen overflow-hidden ">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-5 "
        style={{ backgroundImage: `url(${img2})` }}
      />
      <div className="w-full h-screen flex items-center justify-center ">
        <div className="w-full max-w-8xl bg-black/20 text-white text-center px-4 py-22 ">
          <h1 className="text-3xl font-semibold mb-4">Your Coral Adventure Awaits!</h1>
          <p className="text-lg leading-relaxed max-w-5xl mx-auto">
            Thank you for booking with us! Get ready to explore vibrant reefs, relax in stunning accommodations,
            and join unforgettable events. We're committed to making your stay safe, comfortable, and full of wonder.
            Dive into an experience you'll cherish forever!
          </p>
        </div>
      </div>
    </div>
        <BoatPackages/>
        <BoatHotelPackages />
        <Footer />
      </motion.div>
    </div>
  )
}

export default Reef_Ride