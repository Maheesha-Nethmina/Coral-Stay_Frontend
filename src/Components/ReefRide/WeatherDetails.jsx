import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDetails = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/weather/forecast')
      .then(res => setForecast(res.data.forecast))
      .catch(err => console.error('Failed to load forecast:', err));
  }, []);

  const groupedForecast = forecast.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentDateString = currentDate.toISOString().split('T')[0];

  const filteredEntries = Object.entries(groupedForecast)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .filter(([date]) => {
      if (date > currentDateString) return true;
      if (date === currentDateString && currentHour < 12) return true;
      return false;
    })
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">🌤️ 5-Day Coral Reef Weather Forecast</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredEntries.map(([date, entries], i) => {
          const slotEntry = entries.find(e => {
            const hour = parseInt(e.time.split(":")[0], 10);
            return hour >= 9 && hour <= 12;
          });

          if (!slotEntry) return null;

          return (
            <div key={i} className="rounded-2xl shadow-xl border overflow-hidden">
              <div className="p-0">
                <div className='bg-gradient-to-br from-[#023545] to-[#EAF4F6] w-full py-4'>
                  <h3 className="text-3xl font-bold text-white text-center">
                    {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </h3>
                </div>

                <div className={`${slotEntry.isSafe ? 'bg-green-100' : 'bg-red-100'} p-10`}>
                  <img
                    src={`https://openweathermap.org/img/wn/10d@2x.png`}
                    alt={slotEntry.description}
                    className="mx-auto w-16 h-26"
                  />
                  <p className="text-center capitalize text-sm text-gray-800 font-medium">{slotEntry.description}</p>
                  <p className="text-3xl text-center font-bold text-white mt-1">{Math.round(slotEntry.temperature)}°C</p>
                  <p className="text-center text-sm font-semibold mt-1">{slotEntry.suggestion}</p>

                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p><span className="font-semibold">Time:</span> {slotEntry.time}</p>
                    <p><span className="font-semibold">Humidity:</span> {slotEntry.humidity}%</p>
                    <p><span className="font-semibold">Wind:</span> {slotEntry.windSpeed} m/s</p>
                    <p><span className="font-semibold">Cloudiness:</span> {slotEntry.cloudiness}%</p>
                    <p><span className="font-semibold">Rain:</span> {slotEntry.rainVolume} mm</p>
                    <p><span className="font-semibold">Status:</span> {slotEntry.isSafe ? '✅ Safe' : '❌ Unsafe'}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetails;
