import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import SeatingChart from './SeatingChart';
import { getNextSevenDays, getTimeSlots } from './dateUtils';
import { useAuth } from "../../../contexts/AuthContext";

const BookBoat = () => {
  const { user } = useAuth();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatingChart, setShowSeatingChart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const days = getNextSevenDays();
    setDates(days);
    setSelectedDate(days[0]);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const availableTimeSlots = getTimeSlots(selectedDate);
      setTimeSlots(availableTimeSlots);
      setSelectedTimeSlot(null);
    }
  }, [selectedDate]);

  // Log current user ID when user changes
  useEffect(() => {
    if (user && user._id) {
      console.log(' Current logged-in User ID:', user._id);
    }
  }, [user]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setSelectedSeats([]);
    setShowSeatingChart(false);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
    setShowSeatingChart(true);
    setSelectedSeats([]);
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    if (!user || !user._id) {
      alert('You must be logged in to book seats.');
      return;
    }

    // Pass user ID along with booking data
    navigate('/booking', {
      state: {
        type: 'seat',
        date: selectedDate,
        time: selectedTimeSlot,
        seats: selectedSeats,
        userId: user._id,
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#EAF4F6] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Choose Your Dates and Let the Reef Welcome You!
        </h1>

        {/* Date selection */}
        {dates.length > 0 && (
          <DateSelector
            dates={dates}
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
          />
        )}

        {/* Time slot selection */}
        {selectedDate && timeSlots.length > 0 && (
          <TimeSlotSelector
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        )}

        {/* Seat selection UI */}
        {showSeatingChart && (
          <div className="mt-8 animate-fade-in">
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Select Your Seats
              </h2>
              <SeatingChart
                selectedSeats={selectedSeats}
                onSelectSeat={handleSeatSelect}
                selectedDate={selectedDate?.value} // YYYY-MM-DD
                selectedTime={selectedTimeSlot?.time}
              />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-start mt-6">
              <div className="flex items-center">
                <div className="w-6 h-6 border border-gray-300 bg-white mr-2" />
                <span className="text-sm text-slate-700">Available Seats</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-400 border border-gray-300 mr-2" />
                <span className="text-sm text-slate-700">Blocked Seats</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#023545] border border-gray-300 mr-2" />
                <span className="text-sm text-slate-700">Selected Seats</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-400 border border-gray-300 mr-2" />
                <span className="text-sm text-slate-700">Booked Seats</span>
              </div>
            </div>

            {/* Confirm Booking Button */}
            <button
              onClick={handleConfirmBooking}
              className="mt-8 w-full py-4 bg-[#023545] hover:bg-teal-900 text-white font-bold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookBoat;
