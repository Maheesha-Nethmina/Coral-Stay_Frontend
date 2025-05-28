import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { motion } from 'framer-motion'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/reefHero.jpg'
import AboutReef from '../../Components/ReefRide/AboutReef'
import Footer from '../../Components/Footer/Footer'
import BookBoat from '../../Components/ReefRide/BookBoat'

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
          title="Contact with our team"
          text="Have questions or need assistance? We're here to help! Reach out to us anytime and we'll get back to you as soon as possible."
          overlayOpacity="20"
        />
        <AboutReef/>
        <BookBoat />
        <Footer />
      </motion.div>
    </div>
  )
}

export default Reef_Ride