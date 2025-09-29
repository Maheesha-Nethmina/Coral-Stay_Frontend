import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from "../../contexts/AuthContext"; //Auth Context

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); //  Logged-in user

  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [availableRoomId, setAvailableRoomId] = useState(null);

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

  const checkBoatAvailability = async () => {
    const response = await axios.post('http://localhost:3000/package/check-availability', {
      date: selectedDate,
      seatNumber: pkg.seatNumber,
    });
    return response.data.available;
  };

  const checkRoomAvailability = async () => {
    if (!pkg.roomtype || !selectedDate || !pkg.days) {
      console.warn('Missing room type or package days');
      return false;
    }

    const checkInDate = new Date(selectedDate);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + pkg.days);

    try {
      const response = await axios.post('http://localhost:3000/bookings/checkRoomTypeAvailability', {
        roomTitle: pkg.roomtype,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        quantity: 1,
      });

      if (response.data.available && response.data.roomId) {
        setAvailableRoomId(response.data.roomId);
      }

      return response.data.available;
    } catch (err) {
      console.error('Room availability check failed:', err.response?.data || err.message);
      return false;
    }
  };

  const handlePackageBooking = async () => {
    // ✅ Check if user is logged in
    if (!user || !user._id) {
      alert("You must be logged in to book a package.");
      return;
    }

    if (!pkg || !selectedDate) {
      alert('Please select a date before checking availability.');
      return;
    }

    setAvailabilityStatus(null);

    const checkInDate = new Date(selectedDate);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + pkg.days);
    const checkOutString = checkOutDate.toISOString().split('T')[0];

    try {
      let seatAvailable = true;
      let roomAvailable = true;

      if (pkg.type === 'boatTour') {
        seatAvailable = await checkBoatAvailability();
        if (seatAvailable) {
          setAvailabilityStatus('seatsAvailable');
          setTimeout(() => {
            navigate('/booking', {
              state: {
                type: 'package',
                date: selectedDate,
                checkOut: checkOutString,
                userId: user._id, //  Pass userId
                package: {
                  ...pkg,
                  roomId: pkg.roomId || pkg._id,
                },
              },
            });
          }, 1000);
        } else {
          setAvailabilityStatus('seatsUnavailable');
        }
      } else if (pkg.type === 'hotel') {
        roomAvailable = await checkRoomAvailability();
        if (roomAvailable) {
          setAvailabilityStatus('roomAvailable');
          setTimeout(() => {
            navigate('/booking', {
              state: {
                type: 'package',
                date: selectedDate,
                checkOut: checkOutString,
                userId: user._id, //  Pass userId
                package: {
                  ...pkg,
                  roomId: availableRoomId || pkg.roomId,
                },
              },
            });
          }, 1000);
        } else {
          setAvailabilityStatus('roomUnavailable');
        }
      } else if (pkg.type === 'Both') {
        [seatAvailable, roomAvailable] = await Promise.all([
          checkBoatAvailability(),
          checkRoomAvailability(),
        ]);

        if (seatAvailable && roomAvailable) {
          setAvailabilityStatus('bothAvailable');
          setTimeout(() => {
            navigate('/booking', {
              state: {
                type: 'package',
                date: selectedDate,
                checkOut: checkOutString,
                userId: user._id, // Pass userId
                package: {
                  ...pkg,
                  roomId: availableRoomId || pkg.roomId,
                },
              },
            });
          }, 1000);
        } else if (!seatAvailable && !roomAvailable) {
          setAvailabilityStatus('bothUnavailable');
        } else if (!seatAvailable) {
          setAvailabilityStatus('seatsUnavailable');
        } else if (!roomAvailable) {
          setAvailabilityStatus('roomUnavailable');
        }
      }
    } catch (error) {
      console.error('Error checking availability:', error);
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
              <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
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

            {/* Alerts */}
            {availabilityStatus === 'seatsAvailable' && (
              <div className="mb-4 text-green-700 bg-green-100 border border-green-400 px-4 py-2 rounded">
                Seats are available! Redirecting to booking...
              </div>
            )}
            {availabilityStatus === 'roomAvailable' && (
              <div className="mb-4 text-green-700 bg-green-100 border border-green-400 px-4 py-2 rounded">
                Room is available! Redirecting to booking...
              </div>
            )}
            {availabilityStatus === 'bothAvailable' && (
              <div className="mb-4 text-green-700 bg-green-100 border border-green-400 px-4 py-2 rounded">
                Both room and seats are available! Redirecting to booking...
              </div>
            )}
            {availabilityStatus === 'seatsUnavailable' && (
              <div className="mb-4 text-red-700 bg-red-100 border border-red-400 px-4 py-2 rounded">
                Not enough boat seats available.
              </div>
            )}
            {availabilityStatus === 'roomUnavailable' && (
              <div className="mb-4 text-red-700 bg-red-100 border border-red-400 px-4 py-2 rounded">
                Not enough rooms available.
              </div>
            )}
            {availabilityStatus === 'bothUnavailable' && (
              <div className="mb-4 text-red-700 bg-red-100 border border-red-400 px-4 py-2 rounded">
                Neither rooms nor boat seats available.
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
