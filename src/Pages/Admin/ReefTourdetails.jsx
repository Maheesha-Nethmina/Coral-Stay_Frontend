import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import Footer from '../../Components/Footer/Footer';
import { Trash2, Mail } from 'lucide-react';

function ReefTourdetails() {
  const navigate = useNavigate();
  const [bookingsByDate, setBookingsByDate] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/reeftour/getAllReefTourBookings');
      const groupedByDate = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      res.data.forEach(group => {
        const bookingDate = new Date(group.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate >= today) {
          if (!groupedByDate[group.date]) {
            groupedByDate[group.date] = [];
          }
          groupedByDate[group.date].push(group);
        }
      });

      setBookingsByDate(groupedByDate);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setStatus('Failed to fetch bookings.');
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId, date) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking? Deletion details will be sent to the user automatically.');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/reeftour/deleteSheetBooking/${bookingId}`);
      const updatedGroups = bookingsByDate[date]
        .map(group => ({
          ...group,
          bookings: group.bookings.filter(b => b._id !== bookingId),
        }))
        .filter(group => group.bookings.length > 0);

      setBookingsByDate(prev => ({
        ...prev,
        [date]: updatedGroups,
      }));
      setStatus('Booking deleted successfully.');
    } catch (error) {
      console.error('Error deleting booking:', error);
      setStatus('Failed to delete booking.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#eaf4f6]">
        <div className="w-60 mt-10 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>

        <div className="flex-1 flex flex-col mt-20 p-6">
          <h2 className="text-2xl font-bold text-[#023545] mb-4">Reef Tour Booking Details</h2>

          <div className="mb-6 flex gap-4">
            <button
              onClick={() => navigate("/blockSheets")}
              className="bg-[#023545] text-white font-medium px-5 py-2 rounded-md"
            >
              Disable Selected Seats
            </button>
            <button
              onClick={() => navigate("/updatepriceSettings")}
              className="bg-[#023545] text-white font-medium px-5 py-2 rounded-md"
            >
              Update Price Settings
            </button>
          </div>

          {status && <p className="text-sm text-green-600 mb-4">{status}</p>}

          {loading ? (
            <p className="text-gray-600">Loading bookings...</p>
          ) : Object.keys(bookingsByDate).length === 0 ? (
            <p className="text-gray-700">No upcoming bookings available.</p>
          ) : (
            Object.entries(bookingsByDate).map(([date, groups]) => (
              <div key={date} className="mb-10">
                <div className="bg-gray-300 text-[#023545] font-semibold px-4 py-2 rounded-t-md shadow">
                  Date: {date}
                </div>

                <div className="bg-white shadow rounded-b-md overflow-x-auto">
                  <table className="w-full table-auto border-collapse text-sm">
                    <thead className="bg-[#f8f8f8] text-[#023545] border-b">
                      <tr className="text-left">
                        <th className="p-3">#</th>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Time Slot</th>
                        <th className="p-3">Seat Numbers</th>
                        <th className="p-3">No of Seats</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.flatMap((group) =>
                        group.bookings.map((booking, idx) => (
                          <tr key={booking._id} className="border-b hover:bg-[#f4f4f4]">
                            <td className="p-3">{idx + 1}</td>
                            <td className="p-3">{booking.fullName}</td>
                            <td className="p-3">{booking.contactNumber}</td>
                            <td className="p-3">{booking.email}</td>
                            <td className="p-3">{group.timeSlot}</td>
                            <td className="p-3">{booking.seats.join(', ')}</td>
                            <td className="p-3">{booking.seats.length.toString().padStart(2, '0')}</td>
                            <td className="p-3 flex justify-center items-center gap-3">
                              <Mail
                                className="text-gray-600 cursor-pointer hover:text-blue-600"
                                size={18}
                                onClick={() => {
                                  if (booking.userId) {
                                    navigate(`/sendEmail/${booking.userId}`);
                                  } else {
                                    alert("User ID not found.");
                                  }
                                }}
                              />
                              <Trash2
                                className="text-red-600 cursor-pointer hover:text-red-800"
                                size={18}
                                onClick={() => handleDelete(booking._id, date)}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReefTourdetails;
