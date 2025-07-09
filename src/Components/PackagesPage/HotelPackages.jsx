// HotelPackages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageCarousel from '../Common/PackageCarousel';

const HotelPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/package');
        const hotelPackages = (res.data?.packages || []).filter(pkg => pkg.type === 'hotel');
        const transformed = hotelPackages.map(pkg => ({
          id: pkg._id,
          image: pkg.imageUrl,
          title: pkg.title,
          description: pkg.description,
          features: pkg.includes,
          price: pkg.price,
          duration: `${pkg.days} Day${pkg.days > 1 ? 's' : ''}`,
          discount: pkg.offers || null,
        }));
        setPackages(transformed);
      } catch (err) {
        setError('Failed to fetch packages');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleExploreClick = () => {
    console.log("Explore Packages clicked");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 bg-[#EAF4F6] -mt-20">
      {loading ? (
        <p className="text-center text-gray-600">Loading packages...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <PackageCarousel
          title="Hotel Packages"
          description="Relax and unwind at CoralStay, your beachfront getaway in Hikkaduwa. Click a card to explore our hotel package options and find your perfect stay."
          items={packages}
          buttonText="Explore Packages"
          onButtonClick={handleExploreClick}
          itemsToShow={{ mobile: 1, tablet: 2, desktop: 4 }}
        />
      )}
    </div>
  );
};

export default HotelPackages;
