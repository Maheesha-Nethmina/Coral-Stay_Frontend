import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../../Components/HomePage/HeroSection';
import turtle from '../../assets/sea-turtle.png';
import goggles from '../../assets/diving-goggles.png';
import accomodation from '../../assets/accomadation.png';
import Atmosphere from '../../assets/Atmosphere.png';
import FeatureCards from '../../Components/HomePage/FeatureCards';
import AboutSection from '../../Components/HomePage/AboutSection';
import ImageCarousel from '../../Components/HomePage/ImageCarousel';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import img2 from '../../assets/event01.jpeg';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';

function Home() {
  const categories = [
    { name: 'Nature', image: turtle },
    { name: 'Snorkeling', image: goggles },
    { name: 'Accommodation', image: accomodation },
    { name: 'Atmosphere', image: Atmosphere }
  ];

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/Events');
  };

  // Stats Section Inline
  const statsData = [
    { number: 25000, label: "Happy Travelers" },
    { number: 50, label: "Unique Coral Reef Types" },
    { number: 10, label: "Years in Travel & Tourism" },
    { number: 5000, label: "Tours Successfully Organized" }
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    statsData.forEach((stat, index) => {
      let current = 0;
      const duration = 2000;
      const incrementTime = 50;
      const increment = Math.ceil(stat.number / (duration / incrementTime));

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          setCounts((prevCounts) => {
            const updatedCounts = [...prevCounts];
            updatedCounts[index] = stat.number;
            return updatedCounts;
          });
          clearInterval(timer);
        } else {
          setCounts((prevCounts) => {
            const updatedCounts = [...prevCounts];
            updatedCounts[index] = current;
            return updatedCounts;
          });
        }
      }, incrementTime);
    });
  }, [startAnimation]);

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

      <motion.div
        className="relative bg-blue-50 min-h-[25vh] flex items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[#D9D9D9] to-white bg-cover bg-center opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10">
            <motion.div
              className="md:w-1/2 mb-6 md:mb-0"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug text-center md:text-left whitespace-nowrap">
                Where Ocean Wonders<br />
                Meet Island Comfort.
              </h1>
              <p className="text-base md:text-lg text-gray-600 text-center md:text-left">
                Dive, relax, and unwind in paradise all in one place
              </p>
            </motion.div>

            <motion.div
              className="md:w-1/2 w-full"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between gap-6 flex-wrap md:flex-nowrap">
                {categories.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center w-20"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mb-1"
                    />
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FeatureCards />
      </motion.div>

      {/* Inline Stats Section */}
      <motion.div
        ref={sectionRef}
        className="bg-[#f4f2f2] text-[#023545] py-16 flex flex-wrap justify-around items-center "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl font-bold mb-2">{counts[index].toLocaleString()}+</div>
            <div className="text-lg">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
      {/* Inline Stats Section End */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <AboutSection />
      </motion.div>

      <div className="relative w-full h-screen overflow-hidden">
        <div className="w-full h-screen flex items-center justify-center relative">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
            style={{ backgroundImage: `url(${img2})` }}
          />
          <div className="w-full max-w-8xl bg-black/20 text-white text-center px-4 py-22 z-10">
            <h1 className="text-3xl font-semibold mb-4">Events/Activities around Hikkaduwa</h1>
            <p className="text-lg leading-relaxed max-w-5xl mx-auto">
              Discover the latest events and fun activities happening around Hikkaduwa—from beach festivals and cultural shows to thrilling diving adventures.
              Whether you're looking for live music or special holiday events, there's always something happening nearby.
              Click the button below to explore more and stay updated with what’s going on!
            </p>
            <div className="mt-8">
              <button
                onClick={handleRedirect}
                className="bg-[#023545] text-xl text-white px-3 py-3 rounded-lg hover:bg-[#06445f] transition-colors duration-300 w-[350px]"
              >
                See All Events
              </button>
            </div>
          </div>
        </div>
      </div>

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
  );
}

export default Home;
