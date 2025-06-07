import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../../Components/HomePage/HeroSection'

import turtle from '../../assets/sea-turtle.png' 
import goggles from '../../assets/diving-goggles.png'
import accomodation from '../../assets/accomadation.png' 
import Atmosphere from '../../assets/Atmosphere.png'
import FeatureCards from '../../Components/HomePage/FeatureCards'
import AboutSection from '../../Components/HomePage/AboutSection'
import ImageCarousel from '../../Components/HomePage/ImageCarousel'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import img2 from '../../assets/event01.jpeg'
import { useNavigate } from 'react-router-dom';


function Home() {
  const categories = [
    { name: 'Nature', image: turtle },
    { name: 'Snorkeling', image: goggles },
    { name: 'Accommodation', image: accomodation },
    { name: 'Atmosphere', image: Atmosphere }
  ]

  const stats = [
    { number: "25,000+", label: "Happy Travelers" },
    { number: "50+", label: "Unique Coral Reef Types" },
    { number: "10+", label: "Years in Travel & Tourism" },
    { number: "5,000+", label: "Tours Successfully Organized" }
  ]

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/Events');
  };
  return (
    <div>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      {/* After Hero Section */}
      <motion.div
        className="relative bg-blue-50 min-h-[25vh] flex items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#c8a668] to-white bg-cover bg-center opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-50">
            <motion.div
              className="md:w-1/2 mr-2"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-3xl font-bold text-gray-800 mb-2 mt-10 leading-tight">
                Where Ocean Wonders Meet Island Comfort.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Dive, relax, and unwind in paradise all in one place
              </p>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-4 gap-x-5">
                {categories.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover mb-1"
                    />
                    <span className="font-medium text-gray-700 text-center">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Feature Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FeatureCards />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="bg-gradient-to-b from-[#ecd7af] to-white py-2 sm:py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-25 max-w-7xl px-5 lg:px-1">
          <div className="grid grid-cols-2 gap-15 md:grid-cols-4 md:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center mx-17"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-4xl font-bold text-black-600 sm:text-4xl">
                  {stat.number}
                </p>
                <p className="mt-2 text-base font-medium text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <AboutSection />
      </motion.div>

     {/* event section */}
      <div className="relative w-full h-screen overflow-hidden ">
           <div
             className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-5 "
             style={{ backgroundImage: `url(${img2})` }}
           />
           <div className="w-full h-screen flex items-center justify-center ">
             <div className="w-full max-w-8xl bg-black/20 text-white text-center px-4 py-22 ">
               <h1 className="text-3xl font-semibold mb-4">Events/Activities around Hikkaduwa</h1>
               <p className="text-lg leading-relaxed max-w-5xl mx-auto">
                Discover the latest events and fun activities happening around Hikkaduwa—from beach festivals and cultural shows to thrilling diving adventures
                Whether you're looking for live music, or special holiday events, there's always something happening nearby. Click the button below to explore more and stay updated with what’s going on! 
               </p>
                <div className="mt-8">
                  <button
                  onClick={handleRedirect}
                  className="bg-[#023545] text-xl text-white px-3 py-3 rounded-lg hover:bg-[#06445f] transition-colors duration-300 rounded-[10px] w-[350px]">
                    See All Events
                  </button>
                  </div>
             </div>
           </div>
         </div>


      {/* Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageCarousel />
      </motion.div>

      <Footer />
    </div>
  )
}

export default Home
