import React from 'react'
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

function Home() {
     const categories = [
    { name: 'Nature', image:turtle},
    { name: 'Snorkeling', image: goggles },
    { name: 'Accommodation', image: accomodation },
    { name: 'Atmosphere', image: Atmosphere }
  ];

  const stats = [
    { number: "25,000+", label: "Happy Travelers" },
    { number: "50+", label: "Unique Coral Reef Types" },
    { number: "10+", label: "Years in Travel & Tourism" },
    { number: "5,000+", label: "Tours Successfully Organized" }
  ];
  return (
    <div>
        
    <Navbar/>
    <HeroSection/>

    {/* after hero */}
    <div className="relative bg-blue-50 min-h-[25vh] flex items-center ">
      {/* Background image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c8a668] to-white bg-cover bg-center opacity-30 "></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-50">
          {/* Text content */}
          <div className="md:w-1/2 mr-2">
            <h1 className="text-4xl md:text-3xl font-bold text-gray-800 mb-2 mt-10 leading-tight">
              Where Ocean Wonders Meet Island Comfort.
            </h1>
            <p className="text-lg text-gray-600 mb-8 ">
              Dive,relax, and unwind in paradise All in one place
            </p>
            
          </div>

          {/* Categories in a single row */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-4 gap-x-5 ">
              {categories.map((item, index) => (
                <div 
                  key={index}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover text-center "
                  />
                  <span className="font-medium text-gray-700 text-center ">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* end of after hero */}

    {/* 3 card with image */}
    <FeatureCards/>
    {/* end of 3 card with image */}

    {/* Stats Section */}
              <div className="bg-gradient-to-b from-[#ecd7af] to-white py-2 sm:py-10">
      <div className="mx-25 max-w-7xl px-5 lg:px-1">
        <div className="grid grid-cols-2 gap-15 md:grid-cols-4 md:gap-10 ">
          {stats.map((stat, index) => (
            <div key={index} className="text-center mx-17 ">
              <p className="text-4xl font-bold text-black-600 sm:text-4xl">
                {stat.number}
              </p>
              <p className="mt-2 text-base font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* end of stats section */}

    {/* about section start */}
    <AboutSection/>
    {/* about section end */}
    
    {/* Gallery Carousel Section start */}
    <ImageCarousel />
    {/* Gallery Carousel Section end */}
    
    {/* Footer Section */}
    <Footer/>
    {/* Footer Section end */}
    </div>
  )
}

export default Home
