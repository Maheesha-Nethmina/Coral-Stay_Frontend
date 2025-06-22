import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function ReefTourdetails() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-[#eaf4f6]">
        <div className="w-60 bg-white shadow-md mt-10">
          <AdminNavbar />
        </div>

        {/* main content */}
        <div className="flex-1 flex mt-20">
          <div className=" p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-[#023545] mb-2">Reef Tour Booking Details</h2>
            <p className="mb-6 text-gray-600">Manage and block unavailable seats for upcoming reef tour dates.</p>
            <button
              onClick={() => navigate("/blockSheets")}
              className="bg-[#023545]  text-white font-medium px-5 py-2 rounded-md"
            >
              Disable Selected Seats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReefTourdetails;
