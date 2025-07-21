import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Package from './Packages';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import AdminNavbar from '../../../Components/Navbar/AdminNavbar';

const URL = 'http://localhost:3000/package';

const fetchHandler = async () => {
  return await axios.get(URL).then((response) => response.data);
};

function PackageDetails() {
  const [packages, setPackages] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      setPackages(data.packages);
      setNoResults(!data.packages || data.packages.length === 0);
    });
  }, []);

  const handleDelete = (id) => {
    setPackages((prev) => prev.filter((pack) => pack._id !== id));
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 bg-[#eaf4f6] mt-10">
        <aside className="w-60 bg-[#eaf4f6]">
          <AdminNavbar />
        </aside>

        <main className="flex-1 p-6 mt-10 bg-[#eaf4f6]">
          <h1 className="font-bold text-black text-lg mb-4">Package Details Display Page</h1>

          <button
            onClick={() => navigate('/addPackages')}
            className="mb-6 px-6 py-2 bg-[#023545] text-white rounded-md font-semibold hover:bg-[#014459] transition"
          >
            Add Package
          </button>

          <div className="overflow-x-auto w-full mb-4">
            <div className="grid grid-cols-[100px_150px_150px_100px_80px_80px_120px_80px_80px_80px_80px] gap-3 bg-gray-100 text-gray-700 uppercase text-sm font-semibold p-2 rounded">
              <div>Image</div>
              <div>Title</div>
              <div>Description</div>
              <div>Includes</div>
              <div>Price</div>
              <div>Days</div>
              <div>Offers</div>
              <div>Type</div>
              <div>RType</div>
              <div>Seat</div>
              <div>Actions</div>
            </div>
          </div>

          {noResults ? (
            <div className="text-center text-red-600 font-semibold mt-4">
              <h2>No packages found</h2>
            </div>
          ) : (
            <div className="space-y-4">
              {packages.map((pack) => (
                <div key={pack._id}>
                  <Package pack={pack} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default PackageDetails;
