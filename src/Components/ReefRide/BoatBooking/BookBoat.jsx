
import React, { useState, useEffect } from 'react';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import SeatingChart from './SeatingChart';
import { getNextSevenDays, getTimeSlots } from './dateUtils';

const BookBoat = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatingChart, setShowSeatingChart] = useState(false);

  useEffect(() => {
    setDates(getNextSevenDays());
    setSelectedDate(getNextSevenDays()[0]);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const availableTimeSlots = getTimeSlots(selectedDate);
      setTimeSlots(availableTimeSlots);
      setSelectedTimeSlot(null);
    }
  }, [selectedDate]);

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
    setSelectedSeats(
      selectedSeats.includes(seatNumber)
        ? selectedSeats.filter(seat => seat !== seatNumber)
        : [...selectedSeats, seatNumber]
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to book');
      return;
    }
    
    alert(`Booking confirmed for ${selectedDate.display} at ${selectedTimeSlot.time} with seats: ${selectedSeats.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-[#EAF4F6] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Choose Your Dates and Let the Reef Welcome You!
        </h1>
        
        {dates.length > 0 && (
          <DateSelector 
            dates={dates} 
            selectedDate={selectedDate} 
            onSelectDate={handleDateSelect} 
          />
        )}

        {selectedDate && timeSlots.length > 0 && (
          <TimeSlotSelector
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        )}
        
        {showSeatingChart && (
          <div className="mt-8 animate-fade-in">
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Select Your Seats</h2>
              <SeatingChart 
                selectedSeats={selectedSeats}
                onSelectSeat={handleSeatSelect}
                selectedDate={selectedDate}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-start mt-6">
              <div className="flex items-center">
                <div className="w-6 h-6 border border-gray-300 bg-white mr-2"></div>
                <span className="text-sm text-slate-700">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-rose-200 border border-gray-300 mr-2"></div>
                <span className="text-sm text-slate-700">Partially Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#023545] border border-gray-300 mr-2"></div>
                <span className="text-sm text-slate-700">Booked</span>
              </div>
            </div>
            
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