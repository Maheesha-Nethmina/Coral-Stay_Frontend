// File: pages/Admin/ReefTourdetails.js

import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';

const bookedSeatsData = {
  '2025-06-19|09.00 am to 10.00 am': [7, 8],
  '2025-06-19|10.30 am to 11.30 am': [3, 4, 5, 6],
  '2025-06-20|09.00 am to 10.00 am': [1, 2, 9],
};

function ReefTourdetails() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const timeSlots = ["09.00 am to 10.00 am", "10.30 am to 11.30 am"];

  const seatLayout = [
    ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
    ["22", "23", "24", null, null, null, "10", "11", "12"],
    ["21", "20", "19", "18", "17", "16", "15", "14", "13"]
  ];

  useEffect(() => {
    const tempDates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      tempDates.push(nextDate.toISOString().split('T')[0]);
    }
    setDates(tempDates);
  }, []);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const key = `${selectedDate}|${selectedTime}`;
      setBookedSeats(bookedSeatsData[key] || []);
      setSelectedSeats([]);
    }
  }, [selectedDate, selectedTime]);

  const toggleSeatSelection = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBlockSeats = () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert("Please select a date, time slot, and at least one seat.");
      return;
    }
    console.log({
      blockedDate: selectedDate,
      blockedTime: selectedTime,
      blockedSeats: selectedSeats
    });
    alert("Seats successfully marked as blocked.");
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen ">
      <Navbar />
      <div className="flex mt-10">
        <aside className="w-60">
          <AdminNavbar />
        </aside>

        <main className="flex-1 flex justify-center p-6 mt-20">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mark Seats as Unavailable</h2>

            <section className="mb-6">
              <h3 className="font-medium mb-2">Select Date</h3>
              <div className="flex flex-wrap gap-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    className={`px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm ${selectedDate === date ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-100"}`}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                      setSelectedSeats([]);
                    }}
                  >
                    {new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                  </button>
                ))}
              </div>
            </section>

            {selectedDate && (
              <section className="mb-6">
                <h3 className="font-medium mb-2">Select Time Slot</h3>
                <div className="flex gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      className={`px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm ${selectedTime === slot ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-100"}`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {selectedDate && selectedTime && (
              <section>
                <h3 className="font-medium mb-3">Select Seats</h3>
                <div className="bg-gray-200 rounded-2xl p-4 inline-block">
                  {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-2">
                      {row.map((seat, index) => {
                        if (seat === null) return <div key={index} className="w-10 h-10 mx-1" />;
                        const seatNumber = parseInt(seat);
                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        return (
                          <button
                            key={seat}
                            className={`w-10 h-10 mx-1 rounded-md border text-sm font-semibold transition-all duration-200
                              ${isBooked ? "bg-red-400 text-white cursor-not-allowed" :
                                isSelected ? "bg-teal-800 text-white" : "bg-white hover:bg-teal-100"}`}
                            onClick={() => toggleSeatSelection(seatNumber)}
                            disabled={isBooked}
                          >
                            {seat}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="mt-4 ">
                  <button
                    onClick={handleBlockSeats}
                    className="bg-teal-900 hover:bg-teal-800 text-white px-6 py-2 rounded-md font-semibold transition-all duration-200"
                  >
                    Mark as Blocked
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ReefTourdetails;