import React from 'react';
import video2 from '../../assets/video02.mp4'; 
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#EAF4F6] py-12 md:py-20 -mb-42">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-2 md:order-1 relative z-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <video 
                className="w-full h-auto max-h-[500px] object-cover"
                controls
                muted
                autoPlay
                loop
                playsInline
                
              >
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="order-1 md:order-2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed text-justify">
              Hey there! We’re CoralStay, your home by the sea in beautiful Hikkaduwa, Sri Lanka. We run a laid-back beachfront hotel and our very own coral reef watching boat, so you can enjoy the best of both worlds — comfy coastal living and up-close reef adventures, all in one place.

              Our mission is simple: to help you experience the magic of Hikkaduwa’s coral reefs in a fun, safe, and eco-friendly way. Whether you're lounging in one of our sea-view rooms, sipping a drink under a palm tree, or heading out on a boat to explore the underwater world, we’re here to make it all easy and unforgettable.

              So come stay with us, hop on the boat, and discover what makes Hikkaduwa so special — both above and below the surface.
              </p>
            <div className="border-t border-gray-200 pt-4">
              <button 
               onClick={() => navigate('/about')}
              className="text-white bg-[#023545]  hover:text-[#9ebdc6] font-medium text-xl transition-colors py-3 px-15 rounded-lg"
              >
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