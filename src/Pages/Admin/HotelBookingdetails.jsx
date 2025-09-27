import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function HotelBookingdetails() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/getAllRoomBookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/deleteBooking/${id}`);
      alert('Booking cancelled successfully. A confirmation email has been sent to the user.');
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to cancel booking.');
    }
  };

  // Group bookings by Check-In date
  const groupedByDate = bookings.reduce((acc, booking) => {
    const date = booking.checkIn;
    if (!acc[date]) acc[date] = [];
    acc[date].push(booking);
    return acc;
  }, {});

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#eaf4f6]">
        <div className="w-60 mt-10 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>

        <div className="flex-1 p-10 mt-20">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Hotel Bookings</h2>
          <div className="overflow-x-auto">
            {Object.keys(groupedByDate).map((date) => (
              <div key={date} className="mb-10">
                <h3 className="text-xl font-bold text-[#023545] mb-3">
                  Check-In: {formatDate(date)}
                </h3>
                <table className="min-w-full bg-white shadow">
                  <thead>
                    <tr className="bg-gray-200 text-[#023545] text-left">
                      <th className="py-3 px-4">Guest Name</th>
                      <th className="py-3 px-4">Room Title</th>
                      <th className="py-3 px-4">Package Type</th>
                      <th className="py-3 px-4">Check In</th>
                      <th className="py-3 px-4">Check Out</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedByDate[date].map((booking, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="py-2 px-4">{booking.guestName}</td>
                        <td className="py-2 px-4">{booking.roomTitle}</td>
                        <td className="py-2 px-4">{booking.packageType}</td>
                        <td className="py-2 px-4">{formatDate(booking.checkIn)}</td>
                        <td className="py-2 px-4">{formatDate(booking.checkOut)}</td>
                        <td className="py-2 px-4">
                          <button onClick={() => handleDelete(booking._id)}>
                            <Trash2 className="text-[#023545] hover:text-[#023545] cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelBookingdetails;
