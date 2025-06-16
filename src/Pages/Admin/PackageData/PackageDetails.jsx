import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Package from './Packages';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';

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
    <div>
      <Navbar/>
      <div className="flex items-center justify-center mt-24">
        <h1 className="font-bold text-black text-lg">Package Details Display Page</h1>
      </div>

      <button
        onClick={() => navigate('/addPackages')}
        className="px-20 py-2 bg-[#023545] text-white rounded-md font-semibold hover:bg-[#014459] transition"
      >
        Add Package
      </button>

      <div className="overflow-x-auto w-full p-4">
        <div className="grid grid-cols-[100px_200px_150px_150px_80px_80px_120px_150px] gap-4 bg-gray-100 text-gray-700 uppercase text-sm font-semibold mb-2 p-2 rounded">
          <div>Image</div>
          <div>Title</div>
          <div>Description</div>
          <div>Includes</div>
          <div>Price</div>
          <div>Days</div>
          <div>Offers</div>
          <div>Type</div>
          <div>Actions</div>
        </div>
      </div>

      {noResults ? (
        <div><h2>No packages found</h2></div>
      ) : (
        <div>
          {packages.map((pack) => (
            <div key={pack._id}><Package pack={pack} onDelete={handleDelete} /></div>
          ))}
        </div>
      )}

      <br />
      <Footer/>
    </div>
  );
}

export default PackageDetails;