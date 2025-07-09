import React from 'react';

const DateSelector = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <div className="bg-[#d9d9d9] p-4 rounded-xl shadow-md transition-all duration-300">
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => (
          <button
            key={date.value}
            className={`
              py-3 px-2 rounded-md text-center transition-all duration-200
              ${selectedDate?.value === date.value 
                ? 'bg-[#023545] text-white shadow-md font-medium scale-105' 
                : 'bg-white hover:bg-gray-100 text-slate-700 hover:shadow-md'}
            `}
            onClick={() => onSelectDate(date)}
          >
            <div className="text-sm md:text-base">{date.display}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;