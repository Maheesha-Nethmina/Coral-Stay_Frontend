/**
 * Get an array of the next seven days starting from day after tomorrow,
 * or two days after tomorrow if current time is after 11:30 AM.
 * Tomorrow is always excluded.
 * @returns {Array} Array of date objects with "Mon DD" display and YYYY-MM-DD value
 */
export const getNextSevenDays = () => {
  const dates = [];
  const now = new Date();

  // Adjust for Sri Lanka timezone (UTC+5:30)
  const sriLankaOffsetMinutes = 5.5 * 60;
  const sriLankaTime = new Date(now.getTime() + sriLankaOffsetMinutes * 60000);

  const hour = sriLankaTime.getHours();
  const minute = sriLankaTime.getMinutes();
  const isAfter1130 = hour > 11 || (hour === 11 && minute >= 30);

  // Skip today and tomorrow
  const startDate = new Date(sriLankaTime);
  const startFrom = isAfter1130 ? 2 : 1; 
  startDate.setDate(startDate.getDate() + startFrom);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const formattedValue = date.toISOString().split('T')[0];
    const display = `${monthNames[date.getMonth()]} ${date.getDate()}`;

    dates.push({
      display,
      value: formattedValue,
      date,
      isToday: false
    });
  }

  return dates;
};

/**
 * Get time slots for a given date
 * The 3rd date in the list gets only one time slot that ends by 11:30 AM.
 * @param {string} selectedDate - The selected date in YYYY-MM-DD format
 * @returns {Array} Array of time slot objects
 */
export const getTimeSlots = (selectedDate) => {
  const allDates = getNextSevenDays();
  const limitedSlotDate = allDates[2]?.value; // 3rd future date (index 2)

  if (selectedDate === limitedSlotDate) {
    return [
      { id: 1, time: "09.00 am to 10.00 am" }
    ];
  }

  return [
    { id: 1, time: "09.00 am to 10.00 am" },
    { id: 2, time: "10.30 am to 11.30 am" }
  ];
};
