import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import footerLogo from '../../assets/footerLogo.png'; 

const Footer = () => {
  return (
    <footer className="bg-[#003744] text-white py-10">
      <div className="container mx-auto px-4">
       {/* Top section with logo and right-aligned links */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 mb-10">
  
  {/* Logo on the left */}
  <div className="flex-shrink-0">
    <img 
      src={footerLogo} 
      alt="CoralStay Logo" 
      className="h-40 w-auto"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/120x50?text=CoralStay';
      }}
    />
  </div>

  {/* Right-side columns container */}
  <div className="flex flex-col md:flex-row gap-15 mt-10">

    {/* Services column */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Services</h3>
      <ul className="space-y-2">
        <li><a href="/" className="text-gray-300 hover:text-white transition duration-300">Home</a></li>
        <li><a href="/reef_ride" className="text-gray-300 hover:text-white transition duration-300">Reef Ride</a></li>
        <li><a href="/packages" className="text-gray-300 hover:text-white transition duration-300">Packages</a></li>
        <li><a href="/stays" className="text-gray-300 hover:text-white transition duration-300">Stays</a></li>
      </ul>
    </div>

    {/* Useful Links column */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
      <ul className="space-y-2">
        <li><a href="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact Us</a></li>
        <li><a href="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</a></li>
        {/* <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Conditions</a></li> */}
      </ul>
    </div>

    {/* Company column */}
    <div>
      <h3 className="text-lg font-semibold mb-4">More..</h3>
      <ul className="space-y-2">
        <li><a href="/events" className="text-gray-300 hover:text-white transition duration-300">Events</a></li>
        <li><a href="/reviews/new" className="text-gray-300 hover:text-white transition duration-300">Reviews</a></li>
      </ul>
    </div>

  </div>
</div>


        {/* Navigation links section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-10 -mt-25">
          {/* Brand section */}
          <div className="col-span-1">
           
            <p className="text-gray-300 mb-4 text-xl font-bold">Experience the reef, embrace the comfort.</p>
            <p className="text-gray-300 text-sm">
              Explore vibrant coral gardens, enjoy coastal serenity, and make every moment a tropical escape to remember.
            </p>
          </div>

          
        </div>

        {/* Bottom section with copyright and social */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Coral Adventures. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white hover:text-pink-400 transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white hover:text-green-400 transition-colors duration-300">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;