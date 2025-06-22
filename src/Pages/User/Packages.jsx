import React from 'react'
import img1 from '../../assets/package05.jpeg'
import Hero from '../../Components/Common/Hero'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import BoatPackages from '../../Components/PackagesPage/BoatPackages'
import BoatHotelPackages from '../../Components/PackagesPage/BoatHotelPackages'
import HotelPackages from '../../Components/PackagesPage/HotelPackages'
function Packages() {
  return (
    <div>
        <Navbar/>
      <Hero 
          cName="hero"
          heroImg={img1}
          title="Explore Our Exclusive Packages"
          text="Choose the perfect experience for your getaway. Whether you're looking for an exciting coral reef boat tour, a relaxing hotel stay, or a complete holiday bundle, we’ve got you covered with flexible packages to suit every traveler."
          overlayOpacity="20"
        />
        <BoatPackages/>
        <BoatHotelPackages/>
        <HotelPackages/>
        <Footer/>
    </div>
  )
}

export default Packages
