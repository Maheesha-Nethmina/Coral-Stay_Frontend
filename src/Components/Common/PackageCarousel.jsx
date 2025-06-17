import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PackageCarousel = ({ 
  title, 
  description,
  includes,
  items, 
  itemsToShow = { mobile: 1, tablet: 2, desktop: 4 }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsToShow.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(itemsToShow.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(itemsToShow.tablet);
      } else {
        setVisibleItems(itemsToShow.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsToShow]);

  const maxIndex = Math.max(0, items.length - visibleItems);

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full pt-3 px-30">
      <div className="mb-8">
        <h2 className=" text-center text-2xl md:text-3xl font-bold text-gray-800 mb-15">{title}</h2>
        <p className='text-left text-xl md:text-xl font-semibold text-[#023545] mb-15'>{description}</p>
      </div>

      <div className="relative">
        {currentIndex > 0 && (
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <Link to={`/PackageDetail/${item.id}`} state={{ packageData: item }}>
                  <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl group cursor-pointer">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      {item.discount && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold py-1 px-3 rounded-md">
                          {item.discount}
                        </div>
                      )}

                      <div className="transform transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">Rs.{item.price}</span>
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                            {item.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {currentIndex < maxIndex && (
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex justify-center mt-6 mb-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-gray-700 w-4' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageCarousel;
