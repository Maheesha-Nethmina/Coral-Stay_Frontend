import React,{useState} from 'react'
import { motion ,useAnimation} from 'framer-motion'
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
import img3 from '../../assets/package03.jpeg'
import { useNavigate } from 'react-router-dom';

import { 
  Waves, 
  Car, 
  PawPrint, 
  Cigarette, 
  Wifi
} from 'lucide-react';


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

  // policy section 
  const [activeTab, setActiveTab] = useState('resort');

  const policyTabs = [
    {
      id: 'resort',
      label: 'Resort',
      icon: Waves,
      content: {
        title: 'Fees and charges',
        description: 'Special pricing applies for children upon check-in: Full extra-bed and meal charges for children between the age of 12-17 years; Full extra-bed and 50% of meal charges for children 6-11 years.'
      }
    },
    {
      id: 'parking',
      label: 'Parking',
      icon: Car,
      content: {
        title: 'Parking Information',
        description: 'Complimentary self-parking is available on-site. Valet parking service is available for an additional fee of RS.500 per night.'
      }
    },
    {
      id: 'pets',
      label: 'Pets',
      icon: PawPrint,
      content: {
        title: 'Pet Policy',
        description: 'We welcome well-behaved pets up to 50 lbs. A non-refundable pet fee of rs.1000 per stay applies. Pets must be leashed in public areas.'
      }
    },
    {
      id: 'smoking',
      label: 'Smoking',
      icon: Cigarette,
      content: {
        title: 'Smoking Policy',
        description: 'This is a non-smoking property. Smoking is prohibited in all indoor areas. Designated outdoor smoking areas are available.'
      }
    },
    {
      id: 'wifi',
      label: 'WiFi',
      icon: Wifi,
      content: {
        title: 'Internet Access',
        description: 'Complimentary high-speed WiFi is available throughout the property including all guest rooms, lobby, and pool areas.'
      }
    }
  ];

  const activePolicy = policyTabs.find(tab => tab.id === activeTab);

  
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
              Where Ocean Wonders<br/>
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
  className="bg-[#D9D9D9] py-6 sm:py-10"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-3xl sm:text-4xl font-bold text-black">
            {stat.number}
          </p>
          <p className="mt-2 text-sm sm:text-base font-medium text-gray-600">
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
  <div className="relative w-full h-screen overflow-hidden">
  <div className="w-full h-screen flex items-center justify-center relative">
    {/* Background image div inside the content section */}
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

      {/* Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ImageCarousel />
      </motion.div>

{/* package section */}
<div className="relative w-full h-screen overflow-hidden -mt-46 -mb-46">
<div
      className="absolute top-0 left-0 w-full h-140 bg-cover bg-center -z-10"
      style={{ backgroundImage: `url(${img3})` }}
    />
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
              onClick={() => navigate('/Packages')}
              className="bg-[#023545] text-xl text-white px-3 py-3 rounded-lg hover:bg-[#06445f] transition-colors duration-300 w-[350px]"
            >
              Explore Packages
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* hotel policy section */}
       <div className="max-w-8xl mx-auto p-6 bg-[#EAF4F6] ">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hotel policies
        </h1>
      </div>

      {/* Policy Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {policyTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-6 flex flex-col items-center gap-2 transition-all duration-200 hover:bg-[#D9D9D9] relative ${
                  activeTab === tab.id
                    ? 'text-[#023545] bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <IconComponent size={24} />
                <span className="font-medium text-sm">
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9D9D9]"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {activePolicy.content.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {activePolicy.content.description}
          </p>
        </div>
      </div>
    </div>
  


      <Footer />
    </div>
  )
}

export default Home
