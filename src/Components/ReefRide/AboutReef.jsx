import React from 'react';
import video3 from '../../assets/video03.mp4'; 
const AboutReef = () => {
  return (
    <div className="bg-[#EAF4F6] py-10 md:py-20 -mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <video 
                className="w-full h-auto max-h-[500px] object-cover"
                controls
                muted
                autoPlay
                loop
                playsInline
                
              >
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Relax and Enjoy — We’ll Take Care of the Rest. 
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Your safety is our priority. Life jackets and snorkeling gear are provided, and a quick safety briefing is given before departure. Please wear comfortable clothing, non-slip footwear, and reef-safe sunscreen. 
                Let us know during booking if you have any medical conditions, accessibility needs, or allergies. Drinking water is available on board. Children under 12 must be accompanied by an adult. We aim to make your trip safe, relaxing, and truly memorable.
                <br/>
                For full details about bookings, cancellations, safety policies, and guest responsibilities, please visit our Terms & Conditions page.         
            </p>
            
            <div className="border-t border-gray-200 pt-6 -mt-10">
              <button className="text-white bg-[#023545] hover:text-[#9ebdc6] font-medium text-xl transition-colors py-3 px-25 rounded-lg ">
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutReef;