import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Calendar, MapPin, DollarSign, User, Mail, Phone, CreditCard,
  CheckCircle, Package, Bed, Users
} from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const { type } = bookingData;

  // Debugging logs
  console.log('Package Room Type:', bookingData?.package?.roomtype);
  console.log('Package Seat Number:', bookingData?.package?.seatNumber);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    nicNumber: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceSettings, setPriceSettings] = useState(null);
  const [loadingPrices, setLoadingPrices] = useState(true);

  useEffect(() => {
    const fetchPriceSettings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reeftour/getPriceSetting');
        setPriceSettings(response.data);
      } catch (error) {
        console.error('Error fetching price settings:', error);
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPriceSettings();
  }, []);

  if (loadingPrices) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading price settings...</div>
      </div>
    );
  }

  if (!priceSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold text-red-600">Failed to load price settings.</div>
      </div>
    );
  }

  const { pricePerSeat, serviceFee, discount } = priceSettings;
  let fullAmount = 0;

  if (type === 'seat') {
    fullAmount = (bookingData.seats.length * pricePerSeat) + serviceFee - discount;
  } else if (type === 'package') {
    fullAmount = bookingData.package.price + serviceFee - discount;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }
    if (!formData.nicNumber.trim()) {
      newErrors.nicNumber = 'NIC number is required';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formattedDate = bookingData.date?.value;

      const bookingPayload = {
        userId: bookingData.userId || '663e2d9f7b456d070df83aa4',
        googleId: bookingData.googleId || '',
        date: formattedDate,
        timeSlot: bookingData.time?.time,
        seats: type === 'seat' ? bookingData.seats : [],
        user: {
          fullName: formData.fullName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          nicNumber: formData.nicNumber,
        },
        totalAmount: fullAmount,
        packageDetails: type === 'package' ? {
          id: bookingData.package.id,
          name: bookingData.package.name,
          roomtype: bookingData.package.roomtype,
          seatNumber: bookingData.package.seatNumber
        } : undefined
      };

      const response = await axios.post('http://localhost:3000/reeftour/bookSeats', bookingPayload);

      if (response.status === 201) {
        alert('Booking confirmed successfully!');
        navigate('/profile');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#EAF4F6] py-8 px-4 sm:px-6 lg:px-8 mt-18">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Welcome to the Reef!</h1>
            <p className="text-xl text-gray-600">Here's Your Booking</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Booking Summary */}
              <div className="space-y-4">
                {type === 'seat' && (
                  <>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Your Selection</p>
                        <p className="font-semibold text-gray-900">{`Seat Number ${bookingData.seats.join(', ')}`}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Selected Date</p>
                        <p className="font-semibold text-gray-900">{bookingData.date.display} - {bookingData.time.time}</p>
                      </div>
                    </div>
                  </>
                )}

                {type === 'package' && (
                  <>
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Package</p>
                        <p className="font-semibold text-gray-900">{bookingData.package.name}</p>
                      </div>
                    </div>

                    {bookingData.package.roomtype && (
                      <div className="flex items-center space-x-3">
                        <Bed className="h-5 w-5 text-teal-600" />
                        <div>
                          <p className="text-sm text-gray-500">Room Type</p>
                          <p className="font-semibold text-gray-900">{bookingData.package.roomtype}</p>
                        </div>
                      </div>
                    )}

                    {bookingData.package.seatNumber && (
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-teal-600" />
                        <div>
                          <p className="text-sm text-gray-500">Seats Included</p>
                          <p className="font-semibold text-gray-900">{bookingData.package.seatNumber}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-500">Booking Date</p>
                        <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                {type === 'seat' && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price per seat:</span>
                    <span className="font-semibold">Rs:{pricePerSeat}.00</span>
                  </div>
                )}

                {type === 'package' && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Package Price:</span>
                    <span className="font-semibold">Rs:{bookingData.package.price}.00</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service fee:</span>
                  <span className="font-semibold">Rs:{serviceFee}.00</span>
                </div>

                <div className="flex items-center justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-semibold">Rs:{discount}.00</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Full Amount:</span>
                    <span className="text-teal-600">Rs:{fullAmount}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-amber-800">
              Please read our{' '}
              <a href="#" className="text-amber-900 underline hover:text-amber-700 transition-colors font-medium">
                Terms of Service
              </a>{' '}
              before completing your booking. By proceeding, you agree to the terms and conditions.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-teal-600 mr-3" />
              Confirm and Complete Booking
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-4">Add Your Details:</p>
              </div>

              {/* Full Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Add Your Full Name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Add Your Email Address"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Contact and NIC */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Contact Number"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.contactNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.contactNumber && <p className="text-sm text-red-600">{errors.contactNumber}</p>}
                </div>

                <div>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="nicNumber"
                      value={formData.nicNumber}
                      onChange={handleInputChange}
                      placeholder="NIC Number"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.nicNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.nicNumber && <p className="text-sm text-red-600">{errors.nicNumber}</p>}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-teal-600 underline font-medium">Terms and Conditions</a>.
                </label>
              </div>
              {errors.termsAccepted && <p className="text-sm text-red-600 -mt-2">{errors.termsAccepted}</p>}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#023545] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                >
                  {isSubmitting ? 'Processing...' : 'Reserve Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
