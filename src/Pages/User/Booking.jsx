import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Calendar, MapPin, DollarSign, User, Mail, Phone, CreditCard,
  CheckCircle, Package, Bed, Users, Lock, AlertCircle
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
    termsAccepted: false,
    // New payment fields
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card',
    cardType: 'credit' // Default to credit card
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceSettings, setPriceSettings] = useState(null);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [activePaymentMethod, setActivePaymentMethod] = useState('card');
  const [detectedCardBrand, setDetectedCardBrand] = useState('unknown');

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
    fullAmount = (bookingData.seats.length * (pricePerSeat || 0)) + (serviceFee || 0) - (discount || 0);
  } else if (type === 'package') {
    fullAmount = (bookingData.package.price || 0) + (serviceFee || 0) - (discount || 0);
  }

  // Detect card brand based on number
  const detectCardBrand = (number) => {
    const cleanedNumber = number.replace(/\s/g, '');
    
    if (/^4/.test(cleanedNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanedNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanedNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cleanedNumber)) return 'discover';
    if (/^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763)/.test(cleanedNumber)) return 'maestro';
    
    return 'unknown';
  };

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,19}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return value;
  };

  // Validate individual card fields in real-time
  const validateCardField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'cardNumber':
        const cleanedNumber = value.replace(/\s/g, '');
        if (!cleanedNumber) {
          error = 'Card number is required';
        } else if (cleanedNumber.length < 16) {
          error = 'Card number must be at least 16 digits';
        } else if (cleanedNumber.length > 19) {
          error = 'Card number cannot exceed 19 digits';
        } else if (!/^\d+$/.test(cleanedNumber)) {
          error = 'Card number must contain only digits';
        } else if (detectCardBrand(cleanedNumber) === 'unknown') {
          error = 'Unsupported card type';
        }
        break;
        
      case 'cardName':
        if (!value.trim()) {
          error = 'Cardholder name is required';
        } else if (value.trim().length < 3) {
          error = 'Name is too short';
        }
        break;
        
      case 'expiryDate':
        if (!value) {
          error = 'Expiry date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          error = 'Invalid format (MM/YY required)';
        } else {
          const [month, year] = value.split('/').map(Number);
          const now = new Date();
          const currentYear = now.getFullYear() % 100;
          const currentMonth = now.getMonth() + 1;
          
          if (month < 1 || month > 12) {
            error = 'Invalid month';
          } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
            error = 'Card has expired';
          }
        }
        break;
        
      case 'cvv':
        if (!value) {
          error = 'CVV is required';
        } else if (!/^\d+$/.test(value)) {
          error = 'CVV must contain only digits';
        } else if (formData.cardType === 'debit' && value.length !== 3) {
          error = 'Debit card CVV must be 3 digits';
        } else if (formData.cardType === 'credit' && detectedCardBrand === 'amex' && value.length !== 4) {
          error = 'AMEX requires 4-digit CVV';
        } else if (formData.cardType === 'credit' && detectedCardBrand !== 'amex' && value.length !== 3) {
          error = 'Credit card CVV must be 3 digits';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;
    
    // Format specific fields
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
      setDetectedCardBrand(detectCardBrand(value));
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      // Limit CVV length based on card type
      const maxLength = (formData.cardType === 'debit') ? 3 : 
                       (detectedCardBrand === 'amex') ? 4 : 3;
      formattedValue = value.replace(/\D/g, '').slice(0, maxLength);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    // Validate in real-time
    if (name.startsWith('card')) {
      const error = validateCardField(name, formattedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCardTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      cardType: type,
      cvv: '' // Reset CVV when card type changes
    }));
    
    // Clear CVV error when card type changes
    if (errors.cvv) {
      setErrors(prev => ({
        ...prev,
        cvv: ''
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

    // Payment validation (only if card payment is selected)
    if (activePaymentMethod === 'card') {
      const cardFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
      cardFields.forEach(field => {
        const error = validateCardField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formattedDate = bookingData.date?.value || bookingData.date;

      if (type === 'seat') {
        const bookingPayload = {
          userId: bookingData.userId || '663e2d9f7b456d070df83aa4',
          googleId: bookingData.googleId || '',
          date: formattedDate,
          timeSlot: bookingData.time?.time,
          seats: bookingData.seats,
          user: {
            fullName: formData.fullName,
            email: formData.email,
            contactNumber: formData.contactNumber,
            nicNumber: formData.nicNumber,
          },
          payment: {
            method: activePaymentMethod,
            cardType: formData.cardType,
            ...(activePaymentMethod === 'card' && {
              cardLastFour: formData.cardNumber.slice(-4),
              cardBrand: detectedCardBrand
            })
          },
          totalAmount: fullAmount,
          packageDetails: undefined,
        };

        const response = await axios.post('http://localhost:3000/reeftour/bookSeats', bookingPayload);

        if (response.status === 201) {
          alert('Booking confirmed successfully!');
          navigate('/profile');
        } else {
          alert('Booking failed. Please try again.');
        }
      } else if (type === 'package') {
        const checkIn = new Date(formattedDate);
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkIn.getDate() + bookingData.package.days);

        const packageBookingPayload = {
          userId: bookingData.userId || '663e2d9f7b456d070df83aa4',
          googleId: bookingData.googleId || '',
          user: {
            fullName: formData.fullName,
            email: formData.email,
            contactNumber: formData.contactNumber,
            nicNumber: formData.nicNumber,
          },
          packageType: bookingData.package.type,
          bookedDate: checkIn.toISOString(),
          checkOutDate: checkOut.toISOString(),
          payment: {
            method: activePaymentMethod,
            cardType: formData.cardType,
            ...(activePaymentMethod === 'card' && {
              cardLastFour: formData.cardNumber.slice(-4),
              cardBrand: detectedCardBrand
            })
          },
          totalAmount: fullAmount,
          packageDetails: {
            id: bookingData.package.id,
            name: bookingData.package.title,
            roomtype: bookingData.package.roomtype,
            seatNumber: bookingData.package.seatNumber
          },
          roomBooking: bookingData.package.roomtype
            ? {
                roomId: Number(bookingData.package.roomId ?? bookingData.package._id ?? bookingData.package.id),
                roomTitle: bookingData.package.roomtype,
                packageType: bookingData.package.type,
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                quantity: 1,
                guestName: formData.fullName,
                guestEmail: formData.email,
                nicNumber: formData.nicNumber,
                contactNumber: formData.contactNumber,
                totalAmount: fullAmount,
              }
            : null,
          seatBooking: bookingData.package.seatNumber
            ? {
                userId: bookingData.userId || '663e2d9f7b456d070df83aa4',
                googleId: bookingData.googleId || '',
                date: checkIn.toISOString().split('T')[0],
                timeSlot: bookingData.time?.time || '09.00 am to 10.00 am',
                seats: (() => {
                  const totalAvailableSeats = 24;
                  const seatCount = bookingData.package.seatNumber || 0;
                  const allSeats = Array.from({ length: totalAvailableSeats }, (_, i) => i + 1);
                  const shuffled = allSeats.sort(() => 0.5 - Math.random());
                  return shuffled.slice(0, seatCount);
                })(),
                user: {
                  fullName: formData.fullName,
                  email: formData.email,
                  contactNumber: formData.contactNumber,
                  nicNumber: formData.nicNumber,
                },
                totalAmount: fullAmount,
              }
            : null,
        };

        const response = await axios.post('http://localhost:3000/package/book-package', packageBookingPayload);

        if (response.status === 201) {
          alert('Package booking successful!');
          navigate('/profile');
        } else {
          alert('Package booking failed. Please try again.');
        }
      }

    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get card icon based on brand
  const getCardIcon = () => {
    switch(detectedCardBrand) {
      case 'visa': return '🔵';
      case 'mastercard': return '🔴';
      case 'amex': return '🔶';
      case 'discover': return '🟠';
      case 'maestro': return '🟣';
      default: return '💳';
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
                        <p className="font-semibold text-gray-900">{bookingData.package.title}</p>
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
                      <p className="font-semibold text-gray-900">
                        {bookingData.date ? new Date(bookingData.date).toLocaleDateString() : 'Not Selected'}
                      </p>
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

              {/* Payment Method Selection */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${activePaymentMethod === 'card' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                    onClick={() => setActivePaymentMethod('card')}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${activePaymentMethod === 'card' ? 'border-teal-500 bg-teal-500' : 'border-gray-400'}`}>
                        {activePaymentMethod === 'card' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${activePaymentMethod === 'cash' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                    onClick={() => setActivePaymentMethod('cash')}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${activePaymentMethod === 'cash' ? 'border-teal-500 bg-teal-500' : 'border-gray-400'}`}>
                        {activePaymentMethod === 'cash' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                      <span className="font-medium">Pay on Arrival</span>
                    </div>
                  </div>
                </div>

                {/* Card Payment Fields */}
                {activePaymentMethod === 'card' && (
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    {/* Card Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.cardType === 'credit' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                          onClick={() => handleCardTypeChange('credit')}
                        >
                          <div className="flex items-center">
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${formData.cardType === 'credit' ? 'border-teal-500 bg-teal-500' : 'border-gray-400'}`}>
                              {formData.cardType === 'credit' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                            </div>
                            <span className="font-medium">Credit Card</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.cardType === 'debit' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}
                          onClick={() => handleCardTypeChange('debit')}
                        >
                          <div className="flex items-center">
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${formData.cardType === 'debit' ? 'border-teal-500 bg-teal-500' : 'border-gray-400'}`}>
                              {formData.cardType === 'debit' && <div className="h-2 w-2 rounded-full bg-white"></div>}
                            </div>
                            <span className="font-medium">Debit Card</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Card Number */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={23}
                            className={`w-full pl-10 pr-10 py-3 border rounded-lg ${errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl">
                            {getCardIcon()}
                          </div>
                        </div>
                        {errors.cardNumber && (
                          <p className="text-sm text-red-600 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      {/* Cardholder Name */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 border rounded-lg ${errors.cardName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        />
                        {errors.cardName && (
                          <p className="text-sm text-red-600 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.cardName}
                          </p>
                        )}
                      </div>

                      {/* Expiry Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-3 border rounded-lg ${errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        />
                        {errors.expiryDate && (
                          <p className="text-sm text-red-600 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>

                      {/* CVV */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV {formData.cardType === 'debit' ? '(3 digits)' : detectedCardBrand === 'amex' ? '(4 digits)' : '(3 digits)'}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder={formData.cardType === 'debit' ? '3 digits' : detectedCardBrand === 'amex' ? '4 digits' : '3 digits'}
                            maxLength={formData.cardType === 'debit' ? 3 : detectedCardBrand === 'amex' ? 4 : 3}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                          />
                        </div>
                        {errors.cvv && (
                          <p className="text-sm text-red-600 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Lock className="h-4 w-4 mr-1" />
                      Your payment details are encrypted and secure
                    </div>
                  </div>
                )}

                {/* Cash Payment Notice */}
                {activePaymentMethod === 'cash' && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-blue-800">
                      You've selected to pay on arrival. Your booking will be confirmed, and payment will be collected when you arrive at the facility.
                    </p>
                  </div>
                )}
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
                  {isSubmitting ? 'Processing...' : activePaymentMethod === 'cash' ? 'Confirm Booking' : `Pay Rs.${fullAmount}.00 Now`}
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