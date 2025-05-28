import React from 'react';

const SeatingChart = ({ selectedSeats, onSelectSeat, selectedDate }) => {
  const getAvailabilityForSeat = (seatNumber) => {
    const seed = selectedDate ? parseInt(selectedDate.value.replace(/\//g, '')) + seatNumber : 0;
    const random = (seed * 9301 + 49297) % 233280 / 233280;
    
    if (random < 0.15) return 'booked';
    if (random < 0.25) return 'partial';
    return 'available';
  };

  // Create arrays for the different sections of seats
  const topSeats = Array.from({ length: 9 }, (_, i) => i + 1);
  const leftSeats = Array.from({ length: 3 }, (_, i) => i + 24);
  const rightSeats = Array.from({ length: 3 }, (_, i) => i + 10);
  const bottomSeats = Array.from({ length: 9 }, (_, i) => i + 14).reverse();

  const renderSeat = (seatNumber) => {
    const availability = getAvailabilityForSeat(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);
    const seatString = seatNumber.toString().padStart(2, '0');
    
    let bgColor = 'bg-white';
    if (isSelected) bgColor = 'bg-blue-500 text-white';
    else if (availability === 'booked') bgColor = 'bg-teal-900 text-white cursor-not-allowed';
    else if (availability === 'partial') bgColor = 'bg-rose-200';

    return (
      <button
        key={seatNumber}
        className={`
          w-12 h-12 rounded-md flex items-center justify-center text-sm font-medium
          border border-gray-200 shadow-sm transition-all duration-200
          ${bgColor}
          ${availability !== 'booked' ? 'hover:scale-105 hover:shadow-md' : ''}
        `}
        onClick={() => availability !== 'booked' && onSelectSeat(seatNumber)}
        disabled={availability === 'booked'}
      >
        {seatString}
      </button>
    );
  };

  return (
    <div className="bg-blue-200/50 p-8 rounded-xl shadow-md">
      {/* Top row */}
      <div className="grid grid-cols-9 gap-2 mb-8 justify-center">
        {topSeats.map(seat => renderSeat(seat))}
      </div>

      <div className="flex justify-between mb-8">
        {/* Left side seats */}
        <div className="flex flex-col gap-2">
          {leftSeats.map(seat => renderSeat(seat))}
        </div>

        {/* Boat area */}
        <div className="mx-8 flex-grow bg-white/50 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center">
          <div className="text-blue-400 font-medium text-center">
            <div className="text-4xl mb-2">⛵</div>
            <div>Reef Explorer</div>
          </div>
        </div>

        {/* Right side seats */}
        <div className="flex flex-col gap-2">
          {rightSeats.map(seat => renderSeat(seat))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-9 gap-2 justify-center">
        {bottomSeats.map(seat => renderSeat(seat))}
      </div>
    </div>
  );
};

export default SeatingChart;