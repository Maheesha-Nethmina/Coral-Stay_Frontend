import React from 'react'
import Hero from '../../Components/Common/Hero'
import img1 from '../../assets/contactImg1.jpg'
import Footer from '../../Components/Footer/Footer'
import ContactForm from '../../Components/ContactUs/ContactForm'
import Navbar from '../../Components/Navbar/Navbar'
import QandA from '../../Components/ContactUs/QandA'
function Contact() {
  return (
    <>
    <Navbar/>
    <Hero 
    cName="hero"
    heroImg={img1}
    title="Contact with our team"
    text="have questions or need assistance? We are here to help!Reach out to us anytime and we will get back to you as soon as possible."
    overlayOpacity="20"
    />
    <ContactForm/>
    <QandA/>
    <Footer/>
 </>
  )
}

export default Contact
