import React, { useState, useEffect } from 'react';

function SheetBooking() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const timeSlots = ["09.00 am to 10.00 am", "10.30 am to 11.30 am"];

  const seatLayout = [
    ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
    ["24", null, null, null, null, null, null, null, "10"],
    ["23", null, null, null, null, null, null, null, "11"],
    ["22", null, null, null, null, null, null, null, "12"],
    ["21", "20", "19", "18", "17", "16", "15", "14", "13"]
  ];

  useEffect(() => {
    const tempDates = [];
    const now = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const formatted = `${yyyy}-${mm}-${dd}`;
      tempDates.push(formatted);
    }
    setDates(tempDates);
  }, []);

  const toggleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert('Please select a date, time slot, and at least one seat.');
      return;
    }

    alert(`Booking confirmed successfully for ${selectedDate} at ${selectedTime}!\nSeats: ${selectedSeats.join(', ')}`);

    // Ensure all seat values stored as strings
    const updatedBooked = [...bookedSeats, ...selectedSeats.map(String)];
    setBookedSeats(updatedBooked);
    setSelectedSeats([]);
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen">
      <div className="flex mt-10">
        <main className="flex-1 flex justify-center p-6 mt-20">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-[#023545] mb-6">
              Choose Your Dates and Let the Reef Welcome You!
            </h2>

            {/* Date Selector */}
            <section className="mb-6">
              <h3 className="font-medium mb-2">Select Date</h3>
              <div className="flex flex-wrap gap-2">
                {dates.map((date) => {
                  const display = date.slice(5);
                  return (
                    <button
                      key={date}
                      className={`px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm ${
                        selectedDate === date ? "bg-[#023545] text-white" : "bg-gray-200 hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                        setSelectedSeats([]);
                      }}
                    >
                      {display}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-sm text-gray-600">Selected Date: {selectedDate || 'None'}</p>
            </section>

            {/* Time Slot Selector */}
            {selectedDate && (
              <section className="mb-6">
                <h3 className="font-medium mb-2">Select Time Slot</h3>
                <div className="flex gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      className={`px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm ${
                        selectedTime === slot ? "bg-[#023545] text-white" : "bg-gray-200 hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        setSelectedTime(slot);
                        setSelectedSeats([]);
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Seat Layout */}
            {selectedDate && selectedTime && (
              <section>
                <h3 className="font-medium mb-3 text-[#023545]">Select Your Seats</h3>

                <div className="bg-gray-200 rounded-2xl p-4 inline-block">
                  {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-2">
                      {row.map((seat, index) => {
                        if (seat === null) return <div key={index} className="w-10 h-10 mx-1 pointer-events-none" />;

                        const isBooked = bookedSeats.includes(seat);
                        const isSelected = selectedSeats.includes(seat);

                        return (
                          <button
                            key={seat}
                            className={`w-10 h-10 mx-1 rounded-md border text-sm font-semibold transition-all duration-200
                              ${isBooked ? 'bg-red-400 text-white' : 'bg-white hover:bg-teal-100'}
                              ${isSelected ? '!bg-[#023545] !text-white' : ''}
                              ${isBooked ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={() => {
                              if (!isBooked) toggleSeatSelection(seat);
                            }}
                            disabled={isBooked}
                          >
                            {seat}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleConfirmBooking}
                    className="bg-[#023545] text-white px-6 py-2 rounded-md font-semibold transition-all duration-200"
                  >
                    Confirm Booking
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

export default SheetBooking;
