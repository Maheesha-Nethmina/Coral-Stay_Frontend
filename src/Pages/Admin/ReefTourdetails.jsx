import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import AdminNavbar from '../../Components/Navbar/AdminNavbar'


function ReefTourdetails() {
  return (
    <div>
       <Navbar />
       <div className="flex min-h-screen bg-[#eaf4f6]">
         <div className="w-60 bg-white shadow-md mt-10">
        <AdminNavbar />
         </div>
         {/* main content */}
         <div>
          

         </div>

       </div>
    </div>
  )
}

export default ReefTourdetails