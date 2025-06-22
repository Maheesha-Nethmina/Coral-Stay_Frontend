import React from 'react';
import { Clock } from 'lucide-react';

const TimeSlotSelector = ({ timeSlots, selectedTimeSlot, onSelectTimeSlot }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Select Time Slot</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            className={`
              flex items-center justify-center p-4 rounded-lg border transition-all duration-200
              ${selectedTimeSlot?.id === slot.id 
                ? 'bg-[#023545] text-white border-teal-800' 
                : 'bg-white text-slate-700 border-gray-200 hover:border-teal-500'}
            `}
            onClick={() => onSelectTimeSlot(slot)}
          >
            <Clock className="w-5 h-5 mr-2" />
            <span>{slot.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;