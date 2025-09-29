//roomBookingForm.jsx

import React, { useState, useEffect } from 'react';
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
  MapPin,
} from 'lucide-react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { loadStripe } from '@stripe/stripe-js';

const RoomBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const {
    roomId,
    roomTitle,
    packageType,
    checkIn,
    checkOut,
    price,
  } = bookingData;

  const [quantity, setQuantity] = useState(1);
  const [availableRooms, setAvailableRooms] = useState(null);

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      : 0;




  // Extract numeric price from string (remove currency formatting but keep decimal)
  const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''));

  const serviceFee = 300;
  const discount = 0;

  // Include nights in total
  const roomPackageTotal = priceNum * quantity * nights;
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

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.post('http://localhost:3000/bookings/availability', {
          roomId,
          packageType,
          checkIn,
          checkOut,
        });
        setAvailableRooms(response.data.availableRooms);
        if (response.data.availableRooms < quantity) {
          setQuantity(response.data.availableRooms > 0 ? response.data.availableRooms : 1);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, [roomId, packageType, checkIn, checkOut, quantity]);

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
    if (quantity < 1 || (availableRooms !== null && quantity > availableRooms)) {
      newErrors.quantity = 'Please select a valid room quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Combined function to handle booking reservation and payment
  const handlePayNow = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Step 1: Create the booking reservation in backend
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

      console.log('Creating booking reservation:', bookingPayload);

      // Create booking in backend
      const bookingResponse = await axios.post(
        'http://localhost:3000/bookings/roombookings',
        bookingPayload
      );

      if (bookingResponse.status === 201 || bookingResponse.status === 200) {
        const bookingId = bookingResponse.data._id || bookingResponse.data.bookingId;

        // Step 2: Initialize Stripe payment
        const stripe = await loadStripe("pk_test_51RzzoCEzo5x88U62SNchE3SDZSjMQFaTShBDVcPyNs0GJV1H085YABKU3nxRL1Fa6aUAPbsi3TMNdWikf3i5y6xs00t7JwV0qp");

        const paymentBody = {
          roomId,
          roomTitle,
          packageType,
          checkIn,
          checkOut,
          quantity,
          customerName: formData.fullName,
          customerEmail: formData.email,
          contactNumber: formData.contactNumber,
          nicNumber: formData.nicNumber,
          amount: fullAmount,
          bookingId: bookingId // Pass booking ID to link payment
        };

        console.log('Creating payment session:', paymentBody);

        const paymentResponse = await fetch("http://localhost:3000/bookings/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentBody),
        });

        const session = await paymentResponse.json();

        if (paymentResponse.ok) {
          // Store booking info for retrieval after payment
          localStorage.setItem('pendingRoomBooking', JSON.stringify({
            bookingId: bookingId,
            bookingData: bookingPayload,
            userDetails: formData
          }));

          // Redirect to Stripe Checkout
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            console.error('Stripe redirect error:', result.error);
            // Update booking status to failed if redirect fails
            await updateBookingStatus(bookingId, 'failed');
            alert('Payment initialization failed. Please try again.');
          }
        } else {
          throw new Error('Payment session creation failed');
        }
      } else {
        throw new Error('Booking creation failed');
      }
    } catch (error) {
      console.error('Error during booking or payment:', error);
      alert('An error occurred while processing your booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to update booking status
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:3000/bookings/update-booking-status/${bookingId}`, {
        status: status
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Alternative function for direct booking without payment (for testing)
  const handleDirectBooking = async (e) => {
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
        nights,
        guestName: formData.fullName,
        guestEmail: formData.email,
        contactNumber: formData.contactNumber,
        nicNumber: formData.nicNumber,
        totalAmount: fullAmount,
        status: 'confirmed' // Direct confirmation for testing
      };

      const response = await axios.post(
        'http://localhost:3000/bookings/roombookings',
        bookingPayload
      );

      if (response.status === 201 || response.status === 200) {
        alert('Booking confirmed successfully!');
        navigate('/profile');
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

              {/* Duration */}
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{nights} night(s)</p>
                </div>
              </div>

              {/* Available rooms */}
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">Rooms Available</p>
                  <p className="font-semibold text-gray-900">
                    {availableRooms !== null ? availableRooms : 'Loading...'}
                  </p>
                </div>
              </div>

              {/* Quantity selector */}
              {availableRooms !== null && availableRooms > 0 && (
                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-700">Select Room Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    {Array.from({ length: availableRooms }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                  )}
                </div>
              )}

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
              Confirm and Complete Booking
            </h2>

            <form onSubmit={handlePayNow} className="space-y-6">
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
                  required
                />
                <label className="text-sm text-gray-700">
                  I have read and agree to the{' '}
                  <a
                    href="http://localhost:5173/reef_ride"
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

              {/* Single Pay Now Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || availableRooms === 0}
                  className={`w-full bg-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 ${
                    isSubmitting || availableRooms === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  {isSubmitting ? 'Processing...' : 'Pay Now'}
                </button>
                
                {availableRooms === 0 && (
                  <p className="mt-2 text-red-600 text-center font-semibold">
                    Sorry, no rooms available for the selected dates.
                  </p>
                )}
              </div>

              {/* Test Booking Button (without payment) */}
              {/* <div className="pt-2">
                <button
                  type="button"
                  onClick={handleDirectBooking}
                  disabled={isSubmitting || availableRooms === 0}
                  className={`w-full bg-green-600 text-white py-3 px-6 rounded-lg text-md font-semibold shadow-lg ${
                    isSubmitting || availableRooms === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Book Now (Test - No Payment)'}
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomBookingForm;