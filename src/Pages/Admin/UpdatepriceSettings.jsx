import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import Footer from '../../Components/Footer/Footer';

function UpdatepriceSettings() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pricePerSeat: '',
    serviceFee: '',
    discount: '',
  });

  const [loading, setLoading] = useState(false);

  // Load current price settings
  useEffect(() => {
    const fetchPriceSettings = async () => {
      try {
        const res = await axios.get('http://localhost:3000/reeftour/getPriceSetting');
        if (res.data) {
          setForm({
            pricePerSeat: res.data.pricePerSeat || '',
            serviceFee: res.data.serviceFee || '',
            discount: res.data.discount || '',
          });
        }
      } catch (err) {
        console.error('Error loading price settings:', err);
      }
    };
    fetchPriceSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/reeftour/updatePriceSetting', form);
      navigate('/reeftourdetails');
    } catch (err) {
      console.error('Error updating price settings:', err);
      alert('Failed to update price settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen">
      <Navbar />
      <div className="flex mt-10">
        <aside className="w-60">
          <AdminNavbar />
        </aside>

        <main className="flex-1 px-6 mt-20 flex">
          <div>
            <h1 className="text-2xl font-bold mb-6 text-[#023545] text-center">Update Price Settings</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-[#023545]">Price Per Seat (LKR)</label>
                <input
                  type="number"
                  name="pricePerSeat"
                  value={form.pricePerSeat}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-[#023545]">Service Fee (LKR)</label>
                <input
                  type="number"
                  name="serviceFee"
                  value={form.serviceFee}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-[#023545]">Discount (LKR)</label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#023545] text-white px-6 py-2 rounded hover:bg-[#023545]"
              >
                {loading ? 'Updating...' : 'Update Prices'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/reeftourdetails')}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
              >
                ← Back to Reef Tour Details
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default UpdatepriceSettings;
