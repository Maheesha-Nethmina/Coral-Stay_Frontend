/**
 * Get an array of the next seven days starting from day after tomorrow,
 * or two days after tomorrow if current time is after 11:30 AM
 * @returns {Array} Array of date objects with "Mon DD" display and YYYY-MM-DD value
 */
export const getNextSevenDays = () => {
  const dates = [];

  const now = new Date();
  const sriLankaOffsetMinutes = 5.5 * 60;
  const sriLankaTime = new Date(now.getTime() + sriLankaOffsetMinutes * 60000);

  const hour = sriLankaTime.getHours();
  const minute = sriLankaTime.getMinutes();

  const isAfter1130 = hour > 11 || (hour === 11 && minute >= 30);

  // Skip today and tomorrow
  const startDate = new Date(sriLankaTime);
  const startFrom = isAfter1130 ? 3 : 2;
  startDate.setDate(startDate.getDate() + startFrom);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const formattedValue = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const display = `${monthNames[date.getMonth()]} ${date.getDate()}`; // e.g., "Jun 24"

    dates.push({
      display,          // 👉 "Jun 24"
      value: formattedValue,  // YYYY-MM-DD
      date,
      isToday: false
    });
  }

  return dates;
};

/**
 * Get time slots for a given date
 * Limits to one slot if the date is the 3rd in the 7-day list
 * @param {string} selectedDate - The selected date in YYYY-MM-DD format
 * @returns {Array} Array of time slot objects
 */
export const getTimeSlots = (selectedDate) => {
  const allDates = getNextSevenDays();
  const limitedDate = allDates[2]?.value; // 3rd date in the list

  if (selectedDate === limitedDate) {
    return [
      { id: 1, time: "09.00 am to 10.00 am" }
    ];
  }

  return [
    { id: 1, time: "09.00 am to 10.00 am" },
    { id: 2, time: "10.30 am to 11.30 am" }
  ];
};
