import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { motion } from 'framer-motion'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/reef.jpeg'
import AboutReef from '../../Components/ReefRide/AboutReef'
import Footer from '../../Components/Footer/Footer'
import BookBoat from '../../Components/ReefRide/BoatBooking/BookBoat'
import WeatherDetails from '../../Components/ReefRide/WeatherDetails'

import img2 from '../../assets/reef2.jpeg'
import { useNavigate } from 'react-router-dom'
function Reef_Ride() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/packages');
  };
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

        <div className="relative w-full overflow-hidden ">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-10 "
        style={{ backgroundImage: `url(${img2})` }}
      />
      <div className=" flex items-center justify-center ">
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
        
        <WeatherDetails/>
        <BookBoat />
      
      <div className="relative w-full  overflow-hidden">

      <div className="w-full flex items-center justify-center h-full relative">
        <div className="w-full max-w-8xl bg-black/20 text-white text-center px-4 py-22 z-10">
          <h1 className="text-3xl font-semibold mb-4">
            Explore Our Exclusive Packages
          </h1>
          <p className="text-lg leading-relaxed max-w-5xl mx-auto">
           Choose the perfect experience for your getaway. Whether you're looking for an exciting coral reef boat tour, a relaxing hotel stay, or a complete holiday bundle, we’ve got you covered with flexible packages to suit every traveler.
          </p>
          <div className="mt-8">
            <button
              onClick={handleRedirect}
              className="bg-[#023545] text-xl text-white px-3 py-3 rounded-lg hover:bg-[#06445f] transition-colors duration-300 w-[350px]"
            >
              Explore Packages
            </button>
          </div>
        </div>
      </div>
    </div>

        <Footer />
      </motion.div>
    </div>
  )
}

export default Reef_Ride