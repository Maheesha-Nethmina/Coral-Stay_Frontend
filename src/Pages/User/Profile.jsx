import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Mail } from 'lucide-react';
import userprofile from '../../assets/userprofile.jpg';

function Profile() {
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?._id) return;
      // Log the current user ID 
      console.log('Fetching profile for user ID:', currentUser._id);

      try {
        // Fetch user info
        const userRes = await axios.get(`http://localhost:3000/authentication/userDetailsToProfile/${currentUser._id}`);
        setUserInfo(userRes.data);
        console.log('User info loaded:', userRes.data);

        // Fetch bookings
        const bookingRes = await axios.get(`http://localhost:3000/reeftour/displayUserBookings/${currentUser._id}`);
        setBookings(bookingRes.data);
        console.log('Bookings loaded:', bookingRes.data);
      } catch (err) {
        console.error('Error loading profile data:', err?.response?.data || err.message);
      }
    };

    fetchData();
  }, [currentUser?._id]);

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-[#eaf4f6]">
        <div className="max-w-4xl mx-auto bg-[#eaf4f6] rounded-xl shadow-md overflow-hidden p-6 mt-26">
          {/* PROFILE HEADER */}
          <div className="flex items-center space-x-6">
            <img
              src={currentUser?.profileImage || userprofile}
              alt="User"
              className="w-28 h-28 object-cover rounded-xl"
            />
            <div>
              <h2 className="text-2xl font-semibold">{userInfo?.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Mail className="w-4 h-4 mr-2" />
                {userInfo?.email}
              </div>
            </div>
          </div>

          {/* BOOKINGS TABLE */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Reef Tour Bookings</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 border">Date</th>
                    <th className="p-3 border">Time Slot</th>
                    <th className="p-3 border">Seat Numbers</th>
                    <th className="p-3 border">Full Amount</th>
                    <th className="p-3 border">Booked Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((booking, idx) => (
                      <tr key={idx} className="hover:bg-gray-100">
                        <td className="p-3 border">{booking.date}</td>
                        <td className="p-3 border">{booking.timeSlot}</td>
                        <td className="p-3 border">{booking.seats?.join(', ')}</td>
                        <td className="p-3 border">Rs. {booking.totalAmount}</td>
                        <td className="p-3 border">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-3 border text-center" colSpan="5">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
