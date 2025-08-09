// File: frontend/src/pages/Bookedpackagedetails.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function Bookedpackagedetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this matches your backend port
    fetch('http://localhost:3000/package/booked-packages')
      .then(async res => {
        if (!res.ok) {
          // handle non-200 responses gracefully
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
  }, []);

  return (
    <div className="bg-[#eaf4f6] min-h-screen">
      <Navbar />
      <div className="flex w-full min-h-screen mt-10">
        <div className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Booked Package Details</h1>

          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Full Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Contact</th>
                    <th className="py-2 px-4 border-b">NIC</th>
                    <th className="py-2 px-4 border-b">Package Type</th>
                    <th className="py-2 px-4 border-b">Booked Date</th>
                    <th className="py-2 px-4 border-b">Check Out</th>
                    <th className="py-2 px-4 border-b">Total Amount</th>
                    <th className="py-2 px-4 border-b">Package Name</th>
                    <th className="py-2 px-4 border-b">Room Type / Seat No</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td className="py-2 px-4 border-b">{b.user?.fullName || '-'}</td>
                      <td className="py-2 px-4 border-b">{b.user?.email || '-'}</td>
                      <td className="py-2 px-4 border-b">{b.user?.contactNumber || '-'}</td>
                      <td className="py-2 px-4 border-b">{b.user?.nicNumber || '-'}</td>
                      <td className="py-2 px-4 border-b">{b.packageType}</td>
                      <td className="py-2 px-4 border-b">
                        {b.bookedDate ? new Date(b.bookedDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {b.checkOutDate ? new Date(b.checkOutDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-2 px-4 border-b">{b.totalAmount}</td>
                      <td className="py-2 px-4 border-b">{b.packageDetails?.name || '-'}</td>
                      <td className="py-2 px-4 border-b">
                        {b.packageDetails?.roomtype || b.packageDetails?.seatNumber || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookedpackagedetails;
