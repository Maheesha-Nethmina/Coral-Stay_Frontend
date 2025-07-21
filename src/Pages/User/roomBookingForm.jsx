// src/pages/RoomBookingForm/RoomBookingForm.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Calendar,
  BedDouble,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  MapPin,      // Added here
} from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const RoomBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  // If no booking data passed, redirect home
  if (!bookingData) {
    navigate('/');
    return null;
  }

  // Extract data passed via router state
  const {
    roomId,
    roomTitle,
    packageType,
    checkIn,
    checkOut,
    price, // e.g. 'LKR 20,000.00'
    quantity = 1,
  } = bookingData;

  // Extract numeric price from string (remove currency formatting)
  const priceNum = parseInt(price.replace(/[^0-9]/g, ''), 10);

  const serviceFee = 1500;
  const discount = 500;

  const roomPackageTotal = priceNum * quantity;
  const fullAmount = roomPackageTotal + serviceFee - discount;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    nicNumber: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
      const bookingPayload = {
        roomId,
        roomTitle,
        packageType,
        checkIn,
        checkOut,
        quantity,
        guestName: formData.fullName,
        guestEmail: formData.email,
        contactNumber: formData.contactNumber,
        nicNumber: formData.nicNumber,
        totalAmount: fullAmount,
      };

      const response = await axios.post(
        'http://localhost:3000/bookings/roombookings',
        bookingPayload
      );

      if (response.status === 201 || response.status === 200) {
        alert('Booking confirmed successfully!');
        navigate('/');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while processing your booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#EAF4F6] py-8 px-4 sm:px-6 lg:px-8 mt-18">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Room Booking Confirmation
            </h1>
            <p className="text-xl text-gray-600">
              Please confirm your booking details below
            </p>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <BedDouble className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Room Package</p>
                  <p className="font-semibold text-gray-900">
                    {roomTitle} - {packageType}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Check-In Date</p>
                  <p className="font-semibold text-gray-900">{checkIn}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Check-Out Date</p>
                  <p className="font-semibold text-gray-900">{checkOut}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Room Quantity</p>
                  <p className="font-semibold text-gray-900">{quantity}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Room Package Price:</span>
                  <span>Rs:{roomPackageTotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>Rs:{serviceFee.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>Rs:{discount.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-teal-600">
                  <span>Full Amount:</span>
                  <span>Rs:{fullAmount.toLocaleString()}.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-teal-600 mr-3" />
              Enter Guest Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Contact Number & NIC Number */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactNumber" className="sr-only">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="contactNumber"
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Contact Number"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                        errors.contactNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="nicNumber" className="sr-only">
                    NIC Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="nicNumber"
                      type="text"
                      name="nicNumber"
                      value={formData.nicNumber}
                      onChange={handleInputChange}
                      placeholder="NIC Number"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                        errors.nicNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.nicNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.nicNumber}</p>
                  )}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label className="text-sm text-gray-700">
                  I have read and agree to the{' '}
                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-500 underline font-medium"
                  >
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600 -mt-2">{errors.termsAccepted}</p>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#023545] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Book Now'
                  )}
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

export default RoomBookingForm;
