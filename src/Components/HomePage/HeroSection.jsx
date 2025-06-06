import React from 'react';
import video1 from '../../assets/final.mp4'; // Adjust the path as necessary

const HeroSection = () => {
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

  {/* LEFT GRADIENT Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

  {/* Text Content */}
  <div className="relative z-20 flex items-center h-full  pl-40 pt-40">
    <div className="text-white max-w-2xl">
      <h1 className="text-6xl md:text-6xl font-bold mb-10 leading-tight">
        Where Crystal Waters, <br/>Coral Gardens <br /> And Comfort Unite
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Marvel at vibrant coral reefs, savor smooth sea breezes; <br />
        And unwind in coastal comfort — your perfect getaway begins here.
      </p>
      <button className="bg-[#023545] hover:bg-cyan-700 text-white font-semibold px-10 py-3 rounded-[10px] w-[350px]">
        Explore the Experience
      </button>
    </div>
  </div>
</div>

  );
};

export default HeroSection;
