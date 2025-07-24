import React, { useState } from 'react';

const RoomCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=' my-10 mx-3'>
      <div
        className="relative rounded-xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsHovered(!isHovered);
          if (props.onImageClick) props.onImageClick();
        }}
      >
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? 'opacity-50' : 'opacity-0'
          }`}
        />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{props.title}</h3>
          <p
            className={`text-white text-sm transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
