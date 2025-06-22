import React from 'react';

function Hero(props) {
  return (
    <div className={`${props.cName} relative h-screen`}>
      {/* Background image */}
      <img 
        alt="HeroImg" 
        src={props.heroImg} 
        className="absolute inset-0 w-full h-170 object-cover z-0" 
      />

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black z-10 h-170" 
        style={{ opacity: Number(props.overlayOpacity) / 100 }} 
        aria-hidden="true"
      ></div>

      {/* Text content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center ">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-30">
          {props.title}
        </h1>
        <p className="text-2xl text-gray-200 max-w-3xl mx-auto mt-10">
          {props.text}
        </p>
      </div>
    </div>
  );
}

export default Hero;
