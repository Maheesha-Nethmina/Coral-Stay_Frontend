import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import carousel01 from '../../assets/carousel01.jpg';
import carousel02 from '../../assets/carousel02.jpg';   
import carousel03 from '../../assets/carousel03.jpg';
import carousel04 from '../../assets/carousel04.jpg';
import carousel05 from '../../assets/carousel05.jpg';
import accomodetion from '../../assets/accomodetion.jpg';
import { useNavigate } from 'react-router-dom';


const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const images = [
    { id: 1, url: carousel01, alt: 'Sea turtle swimming in clear blue water' },
    { id: 2, url: carousel02, alt: 'Vibrant coral reef with colorful fish' },
    { id: 3, url: carousel03, alt: 'Majestic sea turtle gliding through the ocean' },
    { id: 4, url: carousel04, alt: 'School of tropical fish swimming near coral' },
    { id: 5, url: carousel05, alt: 'Underwater ecosystem with diverse marine life' }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCount(4);
      else if (window.innerWidth >= 768) setVisibleCount(3);
      else setVisibleCount(2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToSlide = (index) => setCurrentIndex(index);
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const visibleImages = [];
  for (let i = 0; i < Math.min(visibleCount, images.length); i++) {
    visibleImages.push(images[(currentIndex + i) % images.length]);
  }

  const navigate = useNavigate();
  
  return (
    <div className="bg-white -mt-42">
      <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900">
          Unforgettable Moments Beneath the Waves
        </h1>

        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="flex justify-center mb-8 relative">
            {/* Responsive Multi-Card View */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {visibleImages.map((image) => (
                <div
                  key={image.id}
                  className="rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:opacity-100
                             w-[48%] sm:w-[48%] md:w-[31%] lg:w-[23%] h-80"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10">
              <ChevronLeft className="w-6 h-6 text-slate-800" />
            </button>

            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10">
              <ChevronRight className="w-6 h-6 text-slate-800" />
            </button>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${currentIndex === idx ? 'bg-slate-800 w-4' : 'bg-slate-400 hover:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-left flex flex-col md:flex-row md:items-start gap-4">
          <p className="text-slate-700 text-lg mb-6 leading-relaxed md:w-4/5">
            Discover the underwater beauty of Hikkaduwa through real moments from our reef tours. See what makes every dive unforgettable.
          </p>

          <button className="bg-slate-700 text-white px-4 py-2 rounded-md font-bold hover:bg-slate-800 transition w-full md:w-1/5">
            View More
          </button>
        </div>

        <div className="relative w-full mt-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={accomodetion} 
            alt="Accommodation"
            className="w-full h-auto object-cover"
          />
          <button
           onClick={() => navigate('/stays')}
            className="absolute bottom-4 left-4 bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-slate-900 transition z-50"
          >
            View Accommodation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
