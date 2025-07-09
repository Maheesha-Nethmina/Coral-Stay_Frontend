import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../../Components/Common/Hero';
import img1 from '../../assets/AboutUs.png';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import AboutUs from '../../Components/About/AboutUs';

function About() {
  return (
    <>
      <Navbar />
      {/* Animated wrapper for the page content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Hero
          cName="hero"
          heroImg={img1}
          title="About Us – CoralStay, Hikkaduwa"
          text="Driven by passion, focus on quality"
          overlayOpacity="20"
        />

        <AboutUs />
        
        <Footer />
      </motion.div>
    </>
  );
}

export default About;
