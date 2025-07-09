// src/pages/Admin/AdminDash.jsx

import React from 'react';

import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

function AdminDash() {
 

  return (
    <>
      <div className="flex flex-col min-h-screen mt-10">
        <Navbar />
        
        {/* Sidebar + Main Content */}
        <div className="flex flex-1">
          
          {/* Sidebar */}
          <div className="w-60 bg-white shadow-md">
            <AdminNavbar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 mt-8 bg-[#eaf4f6] ">
            <h1 className="text-3xl font-bold mb-4">Welcome to the CoralStay Admin Dashboard!</h1>
            
            <p className="mb-4 text-justify max-w-6xl">Here you can efficiently manage bookings, oversee guest interactions, update property listings, 
              monitor reef ride activities, and handle user messages and events. Use this panel to ensure a seamless experience 
              for both our guests and partners, and to maintain the high-quality standards CoralStay is known for.</p>
            
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminDash;
