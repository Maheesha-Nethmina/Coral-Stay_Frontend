// BoatPackages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageCarousel from '../Common/PackageCarousel';

const BoatPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/package');
        const boatPackages = (res.data?.packages || []).filter(pkg => pkg.type === 'boatTour');
        const transformed = boatPackages.map(pkg => ({
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
          title="Coral Escape Package"
          description="Discover vibrant corals and marine life on a relaxing glass-bottom boat tour in Hikkaduwa. Click a card if you want more details about our Coral Escape Packages."
          items={packages}
          buttonText="Explore Packages"
          onButtonClick={handleExploreClick}
          itemsToShow={{ mobile: 1, tablet: 2, desktop: 4 }}
        />
      )}
    </div>
  );
};

export default BoatPackages;
