import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatingChart = ({ selectedSeats, onSelectSeat, selectedDate, selectedTime }) => {
  const [blockedSeats, setBlockedSeats] = useState([]);

  useEffect(() => {
    const fetchBlockedSeats = async () => {
      if (selectedDate && selectedTime) {
        console.log('Fetching blocked seats for:', selectedDate, selectedTime);
        try {
          const url = `http://localhost:3000/reeftour/blocked?date=${selectedDate}&timeSlot=${selectedTime}`;
          console.log('API Request URL:', url);

          const res = await axios.get(url);
          console.log('Blocked seats:', res.data.blockedSeats);

          setBlockedSeats(res.data.blockedSeats || []);
        } catch (error) {
          console.error('Error fetching blocked seats', error);
        }
      }
    };
    fetchBlockedSeats();
  }, [selectedDate, selectedTime]);

  const topSeats = Array.from({ length: 9 }, (_, i) => i + 1);
  const leftSeats = Array.from({ length: 3 }, (_, i) => 24 - i);
  const rightSeats = Array.from({ length: 3 }, (_, i) => i + 10);
  const bottomSeats = Array.from({ length: 9 }, (_, i) => i + 13).reverse();

  const renderSeat = (seatNumber) => {
    const isBlocked = blockedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);
    const seatString = seatNumber.toString().padStart(2, '0');

    let bgColor = 'bg-white text-gray-800';
    if (isBlocked) {
      bgColor = 'bg-red-400 text-white cursor-not-allowed';
    } else if (isSelected) {
      bgColor = 'bg-[#023545] text-white';
    }

    return (
      <button
        key={seatNumber}
        className={`
          w-12 h-12 rounded-md border text-sm font-semibold flex items-center justify-center shadow-sm transition-all duration-200
          ${bgColor}
          ${!isBlocked ? 'hover:bg-teal-100 hover:scale-105' : ''}
        `}
        onClick={() => !isBlocked && onSelectSeat(seatNumber)}
        disabled={isBlocked}
      >
        {seatString}
      </button>
    );
  };

  return (
    <div className="bg-[#d9d9d9] p-8 rounded-xl shadow-md">
      <div className="grid grid-cols-9 gap-2 mb-8 justify-center">
        {topSeats.map(renderSeat)}
      </div>

      <div className="flex justify-between mb-8">
        <div className="flex flex-col gap-2">{leftSeats.map(renderSeat)}</div>

        <div className="mx-8 flex-grow bg-white/50 rounded-xl border-2 border-dashed border-[#023545] flex items-center justify-center">
          <div className="text-[#023545] font-medium text-center">
            <div className="text-4xl mb-2">⛵</div>
            <div>CoralStay</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">{rightSeats.map(renderSeat)}</div>
      </div>

      <div className="grid grid-cols-9 gap-2 justify-center">
        {bottomSeats.map(renderSeat)}
      </div>
    </div>
  );
};

export default SeatingChart;
