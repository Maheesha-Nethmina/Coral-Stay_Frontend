/**
 * Get an array of the next seven days starting from tomorrow
 * @returns {Array} Array of date objects with display format and value
 */
export const getNextSevenDays = () => {
  const dates = [];
  const today = new Date();
  
  // Set to Sri Lankan time (UTC+5:30)
  const sriLankaOffset = 5.5 * 60 * 60 * 1000;
  const sriLankaTime = new Date(today.getTime() + sriLankaOffset);
  
  // Start from tomorrow since today's slots are past
  for (let i = 1; i < 8; i++) {
    const date = new Date(sriLankaTime);
    date.setDate(sriLankaTime.getDate() + i);
    
    // Format as MM/DD
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    dates.push({
      display: `${month}/${day}`,
      value: `${month}/${day}`,
      date: date,
      isToday: false
    });
  }
  
  return dates;
};

export const getTimeSlots = (selectedDate) => {
  // Always show both time slots since we're only showing future dates
  return [
    { id: 1, time: "9:00 AM - 10:00 AM" },
    { id: 2, time: "10:30 AM - 11:30 AM" }
  ];
};