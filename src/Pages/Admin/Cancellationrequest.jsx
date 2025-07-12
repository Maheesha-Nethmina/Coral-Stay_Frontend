import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import Footer from '../../Components/Footer/Footer';

function CancellationRequest() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/getallcancellationRequests');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const handleAccept = async (id) => {
  try {
    await axios.post(`http://localhost:3000/admin/acceptCancellationRequest/${id}/accept`);
    fetchRequests();
  } catch (err) {
    console.error('Error accepting request:', err);
    alert('Failed to accept cancellation request');
  }
};



  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-[#eaf4f6] min-h-screen">
      <Navbar />
      <div className="flex mt-10">
        <div className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </div>
        <div className="flex-1 p-4 mt-10 mr-10">
          <h2 className="text-2xl font-bold mb-4">Cancellation Requests</h2>
          <table className="w-full table-auto bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Refund</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t">
                  <td className="px-4 py-2">{req.date}</td>
                  <td className="px-4 py-2">{req.type}</td>
                  <td className="px-4 py-2">{req.reason}</td>
                  <td className="px-4 py-2">Rs.{req.amount}.00</td>
                  <td className="px-4 py-2">Rs.{req.refundAmount}.00</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No cancellation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CancellationRequest;
