import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/event02.jpg'
import { motion } from 'framer-motion'
function Events() {
  return (
    <div>
        <Navbar />
      
      {/* Animate the Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero 
          cName="hero"
          heroImg={img1}
          title="Events/Activities around Hikkaduwa"
          text=" Discover the latest events and fun activities happening around Hikkaduwa—from beach festivals and cultural shows to thrilling diving adventures."
          overlayOpacity="20"
        />
      </motion.div>

      <Footer/>
    </div>
  )
}

export default Events
