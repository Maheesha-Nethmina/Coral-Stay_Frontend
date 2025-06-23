
import React, { useState, useEffect } from 'react';

function DatePicker() {
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    // Set minDate to today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  return (
    <input
      type="date"
      min={minDate}  // Disables dates before today
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-teal-600"
    />
  );
}

export default DatePicker;