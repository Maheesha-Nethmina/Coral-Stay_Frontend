import React from 'react';
import video1 from '../../assets/final.mp4';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video1}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex items-center h-full px-4 pt-32 md:px-20">
        <div className="text-white max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Where Crystal Waters, <br className="hidden md:block" />
            Coral Gardens <br className="hidden md:block" />
            And Comfort Unite
          </h1>
          <p className="text-base md:text-xl mb-6">
            Marvel at vibrant coral reefs, savor smooth sea breezes; <br className="hidden md:block" />
            And unwind in coastal comfort — your perfect getaway begins here.
          </p>
          <button className="bg-[#023545] hover:bg-cyan-700 text-white font-semibold px-8 py-3 rounded-[10px] w-full md:w-[350px]"
           onClick={() => navigate('/reef_ride')}
          >
            Explore the Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
