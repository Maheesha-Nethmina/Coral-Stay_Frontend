import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/contactImg1.jpg'
import Footer from '../../Components/Footer/Footer'
import ContactForm from '../../Components/ContactUs/ContactForm'
import Navbar from '../../Components/Navbar/Navbar'
import QandA from '../../Components/ContactUs/QandA'

function Contact() {
  return (
    <>
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
          title="Contact with our team"
          text="Have questions or need assistance? We're here to help! Reach out to us anytime and we'll get back to you as soon as possible."
          overlayOpacity="20"
        />
      </motion.div>

      {/* Animate the Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ContactForm />
      </motion.div>

      {/* Animate the Q&A section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <QandA />
      </motion.div>

      <Footer />
    </>
  )
}

export default Contact
