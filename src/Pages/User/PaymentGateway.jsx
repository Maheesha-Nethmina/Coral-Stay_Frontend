import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingPayload } = location.state || {};

  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  if (!bookingPayload) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
    setError('');
  };

  const handlePay = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!card.name || !card.number || !card.expiry || !card.cvc) {
      setError('Please fill all card details.');
      return;
    }
    setIsPaying(true);

    // Simulate payment API call
    setTimeout(() => {
      setIsPaying(false);
      alert('Payment successful! Booking confirmed.');
      navigate('/');
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#EAF4F6] py-8 px-4 sm:px-6 lg:px-8 mt-18">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Payment Gateway</h2>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Amount to Pay:</p>
            <p className="text-2xl text-teal-600 font-bold mb-2">Rs: {bookingPayload.totalAmount.toLocaleString()}.00</p>
            <p className="text-gray-500 text-sm">Booking for: {bookingPayload.guestName}</p>
          </div>
          <form className="space-y-4" onSubmit={handlePay}>
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              value={card.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              value={card.number}
              onChange={handleChange}
              maxLength={16}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex space-x-2">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={handleChange}
                maxLength={5}
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={card.cvc}
                onChange={handleChange}
                maxLength={4}
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isPaying}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              {isPaying ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentGateway;