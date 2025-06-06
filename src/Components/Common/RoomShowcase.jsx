import React from 'react';


const RoomShowcase = (props) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
        {props.title}
      </h1>
      
      {/* Description */}
      <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
        {props.description}
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {props.images.map((image, index) => (
          <div 
            key={index}
            className="relative h-80 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            <img 
              src={image} 
              alt={`Room view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Tagline and CTA */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-2xl font-semibold text-gray-900 max-w-2xl text-center md:text-left">
          {props.tagline}
        </h2>
        <button className="bg-teal-900 hover:bg-teal-800 text-white font-medium py-4 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]">
          {props.ctaText}
        </button>
      </div>

      {/* Amenities */}
      <div className="bg-gray-50 rounded-xl p-8">
       <ul className="grid grid-cols-2 gap-4 list-disc list-inside text-gray-700">
             {props.amenities.map((amenity, index) => (
      <li key={index}>{amenity}</li>
        ))}
     </ul>
      </div>
    </div>
  );
};

export default RoomShowcase;