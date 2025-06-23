import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import Footer from '../../Components/Footer/Footer';

function ReefTourdetails() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [mode, setMode] = useState('block');

  const seatLayout = [
    ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
    ["24", null, null, null, null, null, null, null, "10"],
    ["23", null, null, null, null, null, null, null, "11"],
    ["22", null, null, null, null, null, null, null, "12"],
    ["21", "20", "19", "18", "17", "16", "15", "14", "13"]
  ];

  useEffect(() => {
    const generateValidDates = () => {
      const now = new Date();
      const sriLankaOffsetMinutes = 5.5 * 60;
      const sriLankaTime = new Date(now.getTime() + sriLankaOffsetMinutes * 60000);

      const hour = sriLankaTime.getHours();
      const minute = sriLankaTime.getMinutes();

      const startFromOffset = hour > 11 || (hour === 11 && minute >= 30) ? 2 : 1;

      const result = [];
      const startDate = new Date(sriLankaTime);
      startDate.setDate(startDate.getDate() + startFromOffset);

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        result.push({
          label: date.toLocaleString('en-US', { month: 'short', day: 'numeric' }), // "Jun 24"
          value: date.toISOString().split('T')[0] // "YYYY-MM-DD"
        });
      }

      return result;
    };

    const dateObjects = generateValidDates();
    setDates(dateObjects);
  }, []);

  const limitedSlotDate = dates[2]?.value;
  const isLimitedSlotDate = selectedDate === limitedSlotDate;

  const getTimeSlots = () => {
    if (isLimitedSlotDate) {
      return ["09.00 am to 10.00 am"];
    }
    return ["09.00 am to 10.00 am", "10.30 am to 11.30 am"];
  };

  useEffect(() => {
    const fetchBlockedSeats = async () => {
      if (selectedDate && selectedTime) {
        try {
          const res = await axios.get(`http://localhost:3000/reeftour/blocked?date=${selectedDate}&timeSlot=${selectedTime}`);
          setBookedSeats(res.data.blockedSeats || []);
          setSelectedSeats([]);
        } catch (error) {
          console.error('Error fetching blocked seats', error);
        }
      }
    };
    fetchBlockedSeats();
  }, [selectedDate, selectedTime]);

  const toggleSeatSelection = (seatNumber) => {
    if (mode === 'block' && bookedSeats.includes(seatNumber)) return;
    if (mode === 'unblock' && !bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBlockSeats = async () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert('Please select a date, time slot, and at least one seat.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/reeftour/block', {
        date: selectedDate,
        timeSlot: selectedTime,
        seats: selectedSeats
      });

      alert('Seats successfully marked as blocked.');

      const res = await axios.get(`http://localhost:3000/reeftour/blocked?date=${selectedDate}&timeSlot=${selectedTime}`);
      setBookedSeats(res.data.blockedSeats || []);
      setSelectedSeats([]);
    } catch (error) {
      console.error('Error blocking seats', error);
      alert('Failed to block seats');
    }
  };

  const handleUnblockSeats = async () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert('Please select a date, time slot, and at least one seat.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/reeftour/unblock', {
        date: selectedDate,
        timeSlot: selectedTime,
        seats: selectedSeats
      });

      alert('Seats successfully unblocked.');

      const res = await axios.get(`http://localhost:3000/reeftour/blocked?date=${selectedDate}&timeSlot=${selectedTime}`);
      setBookedSeats(res.data.blockedSeats || []);
      setSelectedSeats([]);
    } catch (error) {
      console.error('Error unblocking seats', error);
      alert('Failed to unblock seats');
    }
  };

  return (
    <div className="bg-[#eaf4f6] min-h-screen">
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
                    key={date.value}
                    className={`px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm ${selectedDate === date.value ? "bg-[#023545] text-white" : "bg-gray-200 hover:bg-blue-100"}`}
                    onClick={() => {
                      setSelectedDate(date.value);
                      setSelectedTime(null);
                      setSelectedSeats([]);
                    }}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </section>

            {selectedDate && (
              <section className="mb-6">
                <h3 className="font-medium mb-2">Select Time Slot</h3>
                <div className="flex gap-2">
                  {getTimeSlots().map((slot) => (
                    <button
                      key={slot}
                      className={`px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm ${selectedTime === slot ? "bg-[#023545] text-white" : "bg-gray-200 hover:bg-blue-100"}`}
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

            {selectedDate && selectedTime && (
              <section>
                <div className="flex mb-4">
                  <button
                    onClick={() => {
                      setMode('block');
                      setSelectedSeats([]);
                    }}
                    className={`mr-4 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${mode === 'block' ? 'bg-[#023545] text-white' : 'bg-gray-200 hover:bg-blue-100'}`}
                  >
                    Block Seats
                  </button>
                  <button
                    onClick={() => {
                      setMode('unblock');
                      setSelectedSeats([]);
                    }}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${mode === 'unblock' ? 'bg-[#023545] text-white' : 'bg-gray-200 hover:bg-blue-100'}`}
                  >
                    Unblock Seats
                  </button>
                </div>

                <h3 className="font-medium mb-3">Select Seats ({mode === 'block' ? 'Available Seats' : 'Blocked Seats'})</h3>
                <div className="bg-gray-200 rounded-2xl p-4 inline-block">
                  {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-2">
                      {row.map((seat, index) => {
                        if (seat === null) return <div key={index} className="w-10 h-10 mx-1" />;
                        const seatNumber = parseInt(seat);
                        const isBooked = bookedSeats.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        const isSelectable = (mode === 'block' && !isBooked) || (mode === 'unblock' && isBooked);

                        return (
                          <button
                            key={seat}
                            className={`w-10 h-10 mx-1 rounded-md border text-sm font-semibold transition-all duration-200
                              ${isBooked ? "bg-red-400 text-white" : "bg-white hover:bg-teal-100"}
                              ${isSelected ? "!bg-[#023545] !text-white" : ""}
                              ${!isSelectable ? "cursor-not-allowed opacity-50" : ""}`}
                            onClick={() => {
                              if (isSelectable) {
                                toggleSeatSelection(seatNumber);
                              }
                            }}
                            disabled={!isSelectable}
                          >
                            {seat}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  {mode === 'block' ? (
                    <button
                      onClick={handleBlockSeats}
                      className="bg-[#023545] text-white px-6 py-2 rounded-md font-semibold transition-all duration-200 mr-10"
                    >
                      Mark as Blocked
                    </button>
                  ) : (
                    <button
                      onClick={handleUnblockSeats}
                      className="bg-[#023545] text-white px-6 py-2 rounded-md font-semibold transition-all duration-200 mr-10"
                    >
                      Unblock Selected Seats
                    </button>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ReefTourdetails;
