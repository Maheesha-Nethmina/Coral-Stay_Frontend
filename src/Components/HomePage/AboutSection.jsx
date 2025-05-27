import React from 'react';
import video2 from '../../assets/video02.mp4'; 
const AboutSection = () => {
  return (
    <div className="bg-[#EAF4F6] py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <video 
                className="w-full h-auto max-h-[500px] object-cover"
                controls
                muted
                autoPlay={false}
                loop
                playsInline
                
              >
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Welcome to the heart of Sri Lanka's underwater paradise! At Hikkaduwa Reef Tours, we are passionate about showcasing the breathtaking beauty of coral reefs through safe, eco-friendly experiences. With years of local expertise, our dedicated team offers guided reef watching tours that connect you with vibrant marine life, crystal-clear waters, and unforgettable coastal adventures. Whether you're a first-time visitor or a seasoned explorer, our goal is to make every journey beneath the surface magical, memorable, and respectful of nature's wonders.
            </p>
            
            <div className="border-t border-gray-200 pt-6">
              <button className="text-white bg-[#023545] hover:text-[#9ebdc6] font-medium text-xl transition-colors py-3 px-12 rounded-lg">
                Read More 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;