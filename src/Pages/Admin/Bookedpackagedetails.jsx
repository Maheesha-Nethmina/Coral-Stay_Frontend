import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Bookedpackagedetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch('http://localhost:3000/package/booked-packages')
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server responded ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      });
  };

  // Delete booking
  const handleDelete = async (id, email) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const res = await fetch(`http://localhost:3000/package/booked-packages/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded ${res.status}: ${text}`);
      }

      alert(`Booking deleted successfully. An email has been sent to ${email}`);
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting booking. Please try again.');
    }
  };

  // divide into different package types
  const boatTourPackages = bookings.filter(b => b.packageType?.toLowerCase() === 'boattour');
  const hotelPackages = bookings.filter(b => b.packageType?.toLowerCase() === 'hotel');
  const bothPackages = bookings.filter(b => b.packageType?.toLowerCase() === 'both');

  // Table render function
  const renderTable = (data, title) => {
    if (data.length === 0) return null;

    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>
                {/* <th className="py-2 px-4 border-b">Email</th> */}
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">NIC</th>
                {/* <th className="py-2 px-4 border-b">Package Type</th> */}
                <th className="py-2 px-4 border-b">Booked Date</th>
                <th className="py-2 px-4 border-b">Check Out</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Package Name</th>
                <th className="py-2 px-4 border-b">Room Type / Seat No</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((b) => (
                <tr key={b._id}>
                  <td className="py-2 px-4">{b.user?.fullName || '-'}</td>
                  {/* <td className="py-2 px-4">{b.user?.email || '-'}</td> */}
                  <td className="py-2 px-4">{b.user?.contactNumber || '-'}</td>
                  <td className="py-2 px-4">{b.user?.nicNumber || '-'}</td>
                  {/* <td className="py-2 px-4">{b.packageType}</td> */}
                  <td className="py-2 px-4">
                    {b.bookedDate ? new Date(b.bookedDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-2 px-4">
                    {b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-2 px-4">Rs.{b.totalAmount}.00</td>
                  <td className="py-2 px-4">{b.packageDetails?.name || '-'}</td>
                  <td className="py-2 px-4">
                    {b.packageDetails?.roomtype || b.packageDetails?.seatNumber || '-'}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(b._id, b.user?.email)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen">
      <Navbar />
      <div className="flex w-full min-h-screen mt-10">
        <div className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>

        <div className="flex-1 p-6 mt-10">
          <h1 className="text-2xl font-bold mb-6">Booked Package Details</h1>
          <button
            onClick={() => navigate('/addPackages')}
            className="mb-6 px-6 py-2 bg-[#023545] text-white rounded-md font-semibold hover:bg-[#014459] transition"
          >
            Add Package
          </button>
          <button
            onClick={() => navigate('/packagedetails')}
            className="m-6 px-6 py-2 bg-[#023545] text-white rounded-md font-semibold hover:bg-[#014459] transition"
          >
            Package Details
          </button>
          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <>
              {renderTable(boatTourPackages, 'Boat Tour Packages')}
              {renderTable(hotelPackages, 'Hotel Packages')}
              {renderTable(bothPackages, 'Combined Packages')}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookedpackagedetails;
