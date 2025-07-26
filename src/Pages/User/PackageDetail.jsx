// src/pages/PackageDetail/PackageDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/package/${id}`);
        setPkg(res.data.package);
      } catch (err) {
        console.error(err);
        setError('Failed to load package');
      }
    };
    fetchPackage();
  }, [id]);

  const handlePackageBooking = async () => {
    if (!pkg || !selectedDate) {
      alert('Please select a date before checking availability.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/package/check-availability', {
        date: selectedDate,
        seatNumber: pkg.seatNumber,
      });

      const { available } = response.data;

      if (available) {
        setAvailabilityStatus('available');
        setTimeout(() => {
          navigate('/booking', {
            state: {
              type: 'package',
              date: selectedDate,
              package: {
                id: pkg._id,
                name: pkg.title,
                price: pkg.price,
                roomtype: pkg.roomtype,
                seatNumber: pkg.seatNumber,
              }
            }
          });
        }, 1000);
      } else {
        setAvailabilityStatus('unavailable');
      }
    } catch (error) {
      console.error(error);
      alert('Error checking availability. Please try again.');
    }
  };

  const getMinBookingDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split('T')[0];
  };

  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!pkg) return <div className="text-center mt-20">Loading...</div>;

  const features = Array.isArray(pkg.includes)
    ? pkg.includes
    : pkg.includes?.split(',') ?? [];

  return (
    <div className="bg-[#EAF4F6] min-h-screen">
      <Navbar />
      <div className="py-16 px-6 md:px-12 lg:px-24 flex justify-center items-start mt-10">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6 md:flex gap-10">

          <div className="md:w-1/2 h-[470px] bg-gray-100 rounded-lg overflow-hidden">
            {pkg.imageUrl ? (
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                No Image Available
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-[#023545] mb-3">{pkg.title}</h1>
            <p className="text-gray-700 mb-4">{pkg.description}</p>

            <h2 className="text-md font-semibold mb-2">Features</h2>
            <ul className="grid grid-cols-2 gap-x-4 text-gray-600 mb-4">
              {features.map((f, idx) => (
                <li key={idx}>{f.trim()}</li>
              ))}
              <li>{pkg.days} Day{pkg.days > 1 ? 's' : ''}</li>
            </ul>

            <div className="mb-2 text-xl font-bold text-[#023545]">
              Price: Rs.{pkg.price.toFixed(2)}
              <span className="ml-4 text-sm font-normal text-gray-600">All Taxes Included</span>
            </div>

            {pkg.offers && (
              <div className="text-yellow-600 font-semibold mb-3">
                Offers: {pkg.offers}
              </div>
            )}

            {(pkg.type === 'Both' || pkg.type === 'hotel') && (
              <div className="text-gray-700 mb-2">
                <span className="font-semibold">Room Type:</span> {pkg.roomtype || 'N/A'}
              </div>
            )}

            {(pkg.type === 'Both' || pkg.type === 'boatTour') && (
              <div className="text-gray-700 mb-4">
                <span className="font-semibold">Number of seats received:</span> {pkg.seatNumber ?? 'N/A'}
              </div>
            )}

            {availabilityStatus === 'available' && (
              <div className="mb-4 text-green-700 bg-green-100 border border-green-400 px-4 py-2 rounded">
                Seats are available! Redirecting to booking...
              </div>
            )}
            {availabilityStatus === 'unavailable' && (
              <div className="mb-4 text-red-700 bg-red-100 border border-red-400 px-4 py-2 rounded">
                Sorry, the selected date does not have enough available seats.
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Select Date for Booking
              </label>
              <input
                type="date"
                id="date"
                min={getMinBookingDate()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#014B54] focus:border-[#014B54] sm:text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handlePackageBooking}
                className="w-full sm:w-auto bg-[#014B54] hover:bg-[#013f48] text-white font-bold py-3 px-8 rounded-xl transition duration-200"
              >
                Book Now
              </button>

              <button
                onClick={() => navigate('/packages')}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-[#014B54] font-bold py-3 px-6 rounded-xl transition duration-200"
              >
                Back to Packages
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PackageDetail;
