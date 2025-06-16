import React from 'react';
import PackageCarousel from '../Common/PackageCarousel';
import img1 from '../../assets/package01.jpeg'
import img2 from '../../assets/package02.jpeg';
import img3 from '../../assets/package03.jpeg'; 
import img4 from '../../assets/package04.jpeg';
import img5 from '../../assets/package05.jpeg';

// Mock data that could be fetched from an API in the future
const boatPackagesData = [
  {
    id: 1,
    title: "Family Reef Retreat",
    description: "Fun for all ages – snorkel reefs, stay in family resorts, and enjoy nature walks plus bonfires.",
    image: img1,
    price: 1299,
    duration: "5 days",
    featured: true,
    discount: null
  },
  {
    id: 2,
    title: "Eco Explorer Package",
    description: "Connect on nature sustainable stays, guided reef tours, and conservation activities.",
    image: img2,
    price: 1499,
    duration: "7 days",
    featured: false,
    discount: null
  },
  {
    id: 3,
    title: "Reef Romance Getaway",
    description: "Create memories with your loved one – explore reefs by day and enjoy romantic seaside nights.",
    image: img3,
    price: 1899,
    duration: "4 days",
    featured: true,
    discount: "50% Off Now"
  },
  {
    id: 4,
    title: "Adventure Seeker Package",
    description: "Thrilling adventures with jet skiing, parasailing, and deep-sea diving for adrenaline lovers.",
    image: img4,
    price: 1699,
    duration: "6 days",
    featured: false,
    discount: null
  },
  {
    id: 5,
    title: "Island Hopping Expedition",
    description: "Explore multiple pristine islands with guided tours and overnight stays on different beaches.",
    image: img5,
    price: 2199,
    duration: "8 days",
    featured: true,
    discount: "Early Bird 30% Off"
  },
  

];

const BoatPackages = () => {
  const handleExploreClick = () => {
    console.log("Explore Packages clicked");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 bg-[#EAF4F6] -mt-20">
      <PackageCarousel
        title="Coral Escape Package"
        items={boatPackagesData}
        buttonText="Explore Packages"
        onButtonClick={handleExploreClick}
        itemsToShow={{ mobile: 1, tablet: 2, desktop: 4 }}
      />
    </div>
  );
};

export default BoatPackages;