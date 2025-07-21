import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Ban } from 'lucide-react';
import userprofile from '../../assets/userprofile.jpg';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user: currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?._id) return;

      try {
        const userRes = await axios.get(`http://localhost:3000/authentication/userDetailsToProfile/${currentUser._id}`);
        setUserInfo(userRes.data);

        const bookingRes = await axios.get(`http://localhost:3000/reeftour/displayUserBookings/${currentUser._id}`);
        setBookings(bookingRes.data);
      } catch (err) {
        console.error('Error loading profile data:', err?.response?.data || err.message);
      }
    };

    fetchData();
  }, [currentUser?._id]);

  const getRefundAmount = (bookingDateStr, totalAmount) => {
    const bookingDate = new Date(bookingDateStr);
    const today = new Date();
    const diffInMs = bookingDate - today;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays >= 2) {
      return totalAmount;
    } else if (diffInDays > 0) {
      return totalAmount / 2;
    } else {
      return 0;
    }
  };

  const handleCancelRequest = async () => {
    try {
      const refundAmount = getRefundAmount(selectedBooking.date, selectedBooking.totalAmount);

      await axios.post('http://localhost:3000/admin/requestCancellation', {
        bookingId: selectedBooking._id,
        userId: currentUser._id,
        reason: cancelReason,
        refundAmount,
        type: 'reefTour',
      });

      setShowModal(false);
      setCancelReason('');
      setSelectedBooking(null);

      const confirm = window.confirm(
        `Cancellation request sent successfully!\nYou will receive a confirmation email shortly.`
      );

      if (confirm) {
        navigate('/');
      }

    } catch (err) {
      alert('Failed to send cancellation request.');
      console.error(err);
    }
  };

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
                    {/* <th className="p-3 border">Booked Date</th> */}
                    <th className="p-3 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((booking, idx) => {
                      const refundAmount = getRefundAmount(booking.date, booking.totalAmount);

                      return (
                        <tr key={idx} className="hover:bg-gray-100">
                          <td className="p-3 border">{booking.date}</td>
                          <td className="p-3 border">{booking.timeSlot}</td>
                          <td className="p-3 border">{booking.seats?.join(', ')}</td>
                          <td className="p-3 border">Rs. {booking.totalAmount}.00</td>
                          {/* <td className="p-3 border">{new Date(booking.createdAt).toLocaleDateString()}</td> */}
                          <td className="p-3 border">
                            {refundAmount > 0 ? (
                              <button
                                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowModal(true);
                                }}
                              >
                                <Ban className="w-4 h-4 mr-2" /> Cancel
                              </button>
                            ) : (
                              <span className="text-gray-400">Not Allowed</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="p-3 border text-center" colSpan="6">
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

      {/* CANCELLATION MODAL */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-transparent bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[700px] bg-[#eaf4f6] border border-gray-300 p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Cancel Reef Tour Booking</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setCancelReason('');
                  setSelectedBooking(null);
                }}
                className="text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <p><strong>Full Name:</strong> {userInfo?.name}</p>
            <p><strong>Date:</strong> {selectedBooking?.date}</p>
            <p><strong>Time Slot:</strong> {selectedBooking?.timeSlot}</p>
            <p><strong>Seats:</strong> {selectedBooking?.seats.join(', ')}</p>
            <p><strong>Amount:</strong> Rs. {selectedBooking?.totalAmount}</p>
            <p className="mt-2 text-md text-green-600">
              <strong>Refund Amount:</strong> Rs. {getRefundAmount(selectedBooking?.date, selectedBooking?.totalAmount)}
            </p>

            <textarea
              placeholder="Reason for cancellation"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full mt-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              rows={4}
            />

            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => {
                  setShowModal(false);
                  setCancelReason('');
                  setSelectedBooking(null);
                }}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 rounded-xl ${
                  cancelReason.trim()
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-300 text-white cursor-not-allowed'
                }`}
                onClick={handleCancelRequest}
                disabled={!cancelReason.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
