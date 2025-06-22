import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/package/${id}`);
        setPkg(res.data.package);
      } catch (err) {
        console.error(err);
        setError('Failed to load package');
      }
    };
    fetchPackage();
  }, [id]);

  const handlePackageBooking = () => {
    if (!pkg) return;
    navigate('/booking', {
      state: {
        type: 'package',
        package: {
          id: pkg._id,
          name: pkg.title,
          price: pkg.price
        }
      }
    });
  };

  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!pkg) return <div className="text-center mt-20">Loading...</div>;

  const features = Array.isArray(pkg.includes) ? pkg.includes : pkg.includes?.split(',') ?? [];

  return (
    <div className="bg-[#EAF4F6]">
      <Navbar />
      <div className="min-h-screen py-12 px-6 flex justify-center items-start mt-16">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 md:flex gap-10">
          
          {/* Image Section */}
          <div className="md:w-1/2 bg-gray-300 rounded-lg h-[400px] overflow-hidden">
            {pkg.imageUrl ? (
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 italic rounded-lg">
                No Image
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#023545]">{pkg.title}</h1>
            <p className="mb-4 text-gray-700">{pkg.description}</p>

            <h2 className="font-semibold text-md mb-1">Features</h2>
            <ul className="grid grid-cols-2 gap-x-4 text-gray-600 mb-4">
              {features.map((f, idx) => (
                <li key={idx}>{f.trim()}</li>
              ))}
              <li>{pkg.days} Day{pkg.days > 1 ? 's' : ''}</li>
            </ul>

            <div className="mb-2 font-bold text-xl text-[#023545]">
              Price: Rs.{pkg.price.toFixed(2)}
              <span className="ml-4 text-sm font-normal text-gray-600">All Taxes Included</span>
            </div>

            {pkg.offers && (
              <div className="text-yellow-600 font-semibold mb-4">
                Offers: {pkg.offers}
              </div>
            )}

            {/* Book Now */}
            <button
              onClick={handlePackageBooking}
              className="bg-[#014B54] hover:bg-[#013f48] text-white font-bold py-2 px-14 rounded-md mt-4"
            >
              Book Now
            </button>

            {/* Back to Packages */}
            <button
              onClick={() => navigate('/packages')}
              className="ml-4 bg-[#014B54] hover:bg-[#013f48] text-white font-bold py-2 px-6 rounded-md mt-4"
            >
              Back to Packages
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PackageDetail;
