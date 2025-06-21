import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ Import useLocation and useNavigate
import { Calendar, MapPin, DollarSign, User, Mail, Phone, CreditCard, CheckCircle } from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get the passed data from previous page
  const bookingData = location.state;

  if (!bookingData) {
    // If user directly comes to this page without selection, redirect them
    navigate('/');
    return null;
  }

  const { date, time, seats } = bookingData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    nicNumber: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Calculate booking summary
  const pricePerSheet = 30;
  const serviceFee = 0;
  const discount = 20;
  const fullAmount = (seats.length * pricePerSheet) + serviceFee - discount;

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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Booking confirmed successfully!');
      navigate('/'); // ✅ Redirect to home page after success
    } catch (error) {
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

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome to the Reef!
            </h1>
            <p className="text-xl text-gray-600">Here's Your Booking</p>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Selection Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Your Selection</p>
                    <p className="font-semibold text-gray-900">{`Sheet Number ${seats.join(', ')}`}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Selected Date</p>
                    <p className="font-semibold text-gray-900">{date.display} - {time.time}</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price per sheet:</span>
                  <span className="font-semibold">${pricePerSheet}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service fee:</span>
                  <span className="font-semibold">${serviceFee}</span>
                </div>

                <div className="flex items-center justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-semibold">-${discount}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Full Amount:</span>
                    <span className="text-teal-600">${fullAmount}</span>
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
              before completing your booking. By proceeding, you agree to the terms and conditions that apply to your use of our service.
            </p>
          </div>

          {/* Booking Form */}
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
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Add Your Email Address"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Contact and NIC Numbers */}
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
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
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

              {/* Terms Checkbox */}
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
                  <a href="#" className="text-teal-600 hover:text-teal-500 underline font-medium">
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
                  className={`w-full bg-[#023545] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Reserve Now'
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

export default Booking;
