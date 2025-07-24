import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import AdminNavbar from '../../Components/Navbar/AdminNavbar'

const WeatherAlertPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/weather-alerts/unsafe-bookings');
        console.log("API Response:", res.data);
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sendEmail = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/weather-alerts/send-alert-email/${id}`);
      setStatus((prev) => ({ ...prev, [id]: 'Sent' }));
      alert('Email sent successfully!'); 
    } catch (err) {
      setStatus((prev) => ({ ...prev, [id]: 'Failed' }));
      console.error('Email send error:', err);
    }
  };

  if (loading) return <p className="text-center">Loading unsafe weather bookings...</p>;

  return (

    <div>
      <Navbar />
    <div className='flex   bg-white rounded-xl'>
     
      <div className="flex-shrink-0 mt-10">
    <AdminNavbar />
      </div>
    <div className="flex-grow p-6  bg-[#eaf4f6] rounded-2xl shadow-xl mt-15">
      <h2 className="text-2xl font-bold mb-4">Unsafe Boat Ride Bookings Details</h2>
      {Array.isArray(bookings) && bookings.length === 0 ? (
        <p className="text-gray-500">No unsafe bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          {console.log("Final bookings before render:", bookings)}
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-2">User</th>
                <th scope="col" className="px-4 py-2">Email</th>
                <th scope="col" className="px-4 py-2">Date</th>
                <th scope="col" className="px-4 py-2">Time Slot</th>
                <th scope="col" className="px-4 py-2">Seats</th>
                <th scope="col" className="px-4 py-2">Total</th>
                <th scope="col" className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookings) && bookings.map((booking) => (
                <tr key={booking._id} className="bg-white border-b">
                  <td className="px-4 py-2">{booking.user?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{booking.user?.email || 'N/A'}</td>
                  <td className="px-4 py-2">{booking.date}</td>
                  <td className="px-4 py-2">{booking.timeSlot}</td>
                  <td className="px-4 py-2">{booking.seats.join(', ')}</td>
                  <td className="px-4 py-2">RS.{booking.totalAmount}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#023545] text-white px-3 py-1 rounded hover:bg-[ #2e6060ff] transition-colors"
                      onClick={() => sendEmail(booking._id)}
                    >
                      Send Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
   
    </div>
     <Footer />
    </div>
  );
};

export default WeatherAlertPanel;
