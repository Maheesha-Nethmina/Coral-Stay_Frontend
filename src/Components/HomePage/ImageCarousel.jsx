import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import carousel01 from '../../assets/carousel01.jpg';
import carousel02 from '../../assets/carousel02.jpg';   
import carousel03 from '../../assets/carousel03.jpg';
import carousel04 from '../../assets/carousel04.jpg';
import carousel05 from '../../assets/carousel05.jpg';
import accomodetion from '../../assets/accomodetion.jpg'
const ImageCarousel = () => {
  // State for managing the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Array of underwater images
  const images = [
    {
      id: 1,
      url:carousel01 ,
      alt: "Sea turtle swimming in clear blue water"
    },
    {
      id: 2,
      url: carousel02,
      alt: "Vibrant coral reef with colorful fish"
    },
    {
      id: 3,
      url:carousel03 ,
      alt: "Majestic sea turtle gliding through the ocean"
    },
    {
      id: 4,
      url: carousel04,
      alt: "School of tropical fish swimming near coral"
    },
    {
      id: 5,
      url: carousel05,
      alt: "Underwater ecosystem with diverse marine life"
    }
  ];

  // Automatic slide transition with useEffect
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, isAutoPlaying]);

  // Handlers for carousel navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // Calculate visible images - show 3 on desktop, 1 on small screens
  const visibleImages = [];
  for (let i = 0; i < Math.min(4, images.length); i++) {
    const index = (currentIndex + i) % images.length;
    visibleImages.push(images[index]);
  }

  return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 -mt-43">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900">
        Unforgettable Moments Beneath the Waves
      </h1>
      
      {/* Image Carousel */}
      <div 
        className="relative" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel Container */}
        <div className="flex justify-center mb-8 relative">
          {/* Mobile View - Single Image */}
          <div className="block md:hidden w-full">
            <div 
              className="h-72 rounded-lg overflow-hidden shadow-lg transition-all duration-500"
              style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
              <img 
                src={images[currentIndex].url} 
                alt={images[currentIndex].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Desktop View - 3 Images */}
          <div className="hidden md:flex space-x-5 overflow-hidden">
            {visibleImages.map((image, idx) => (
              <div 
                key={image.id} 
                className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 transform
                          ${idx === 0 ? 'scale-100' : 'scale-95 opacity-90'}
                          hover:scale-[1.02] hover:opacity-100`}
                style={{ minWidth: '280px', height: '360px' }}
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide} 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md
                      opacity-80 hover:opacity-100 transition-all duration-300 z-10
                      focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>
          
          <button 
            onClick={nextSlide} 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md
                      opacity-80 hover:opacity-100 transition-all duration-300 z-10
                      focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-slate-800" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none
                        ${currentIndex === idx 
                          ? 'bg-slate-800 w-4' 
                          : 'bg-slate-400 hover:bg-slate-600'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Description and Button */}
      <div className="max-w-7xl mx-auto text-left flex">
        <p className="text-slate-700 text-lg mb-6 leading-relaxed w-4/5">
          Discover the underwater beauty of Hikkaduwa through real moments from our
          reef tours. See what makes every dive unforgettable.
        </p>
        
        <button 
          className="bg-slate-700 text-white px-2 py-1 rounded-md font-large font-bold
                   transition-all duration-300 hover:bg-slate-700 hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 w-1/5  mr-4 mb-4 mt-4"
        >
          View More
        </button>
      </div>

          {/* accommodation image section */}
       <div className="relative w-full max-w-8xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <img
        src={accomodetion} 
        alt="Accommodation"
        className="w-full h-auto object-cover"
      />
      <button
        className="absolute bottom-4 left-4 bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-slate-900 transition"
      >
        View Accommodation
      </button>
    </div>
    </div>
  </div>
  );
};

export default ImageCarousel;