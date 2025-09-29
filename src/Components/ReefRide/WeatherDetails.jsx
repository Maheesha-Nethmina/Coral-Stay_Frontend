import React, { useEffect, useState } from 'react';
import axios from 'axios';
import rainBg from '../../assets/rain.jpg';
import cloudsBg from '../../assets/clouds.jpg';
import clearBg from '../../assets/clear.jpg';
import defaultBg from '../../assets/defaultWeather.jpg';

import Lottie from 'lottie-react';
import sunAnim from '../../assets/sunny.json';
import rainAnim from '../../assets/rainy.json';
import cloudAnim from '../../assets/cloudy.json';
import unknownAnim from '../../assets/thunder.json';
import Activity from '../../Components/ReefRide/Activity';

const WeatherDetails = () => {
  const [forecast, setForecast] = useState([]);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/weather/forecast')
      .then(res => {
        console.log('Forecast:', res.data);
        setForecast(res.data.forecast || []);
      })
      .catch(err => console.error('API Error:', err));
  }, []);

  const grouped = forecast.reduce((a, e) => {
    (a[e.date] ||= []).push(e);
    return a;
  }, {});

  const getBg = desc => {
    const d = desc.toLowerCase();
    if (d.includes('rain')) return rainBg;
    if (d.includes('cloud')) return cloudsBg;
    if (d.includes('clear')) return clearBg;
    return defaultBg;
  };
  // animation icon based on weather description
  const getWeatherIcon = desc => {
    const d = desc.toLowerCase();
    let anim = unknownAnim;
    if (d.includes('rain')) anim = rainAnim;
    else if (d.includes('cloud')) anim = cloudAnim;
    else if (d.includes('clear')) anim = sunAnim;

    return (
      <Lottie
        animationData={anim}
        loop
        autoplay
        style={{ width: 80, height: 80 }}
      />
    );
  };

  const now = new Date();
  const isAfterNoon = now.getHours() >= 12;

  const filtered = Object.entries(grouped)
    .filter(([date]) => {
      const dateObj = new Date(date);
      return dateObj > now || (isAfterNoon && dateObj.toDateString() !== now.toDateString());
    })
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#023545] mb-10">
        🌤️ 5-Day Coral Reef Weather Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {filtered.map(([date, entries], i) => {
          const slot = entries.find(e => {
            const hour = parseInt(e.time.split(":")[0], 10);
            return hour === 9;
          }) || entries[0];

          if (!slot) return null;

          const bg = getBg(slot.description);

          return (
            <div key={i} className="relative rounded-2xl shadow-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-gradient-to-br from-teal-50 to-white opacity-80"
                style={{ backgroundImage: `url('${bg}')` }}
              />
              <div className="relative">
                <div className="bg-gradient-to-br from-[#023545] to-[#EAF4F6] w-full py-4">
                  <h3 className="text-3xl font-bold text-white text-center">
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: 'short', month: 'short', day: 'numeric'
                    })}
                  </h3>
                </div>
                <div className="p-5">
                  <div className="rounded-2xl p-6">
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(slot.description)}
                    </div>
                    <p className="text-center capitalize text-2xl text-white font-medium">
                      {slot.description}
                    </p>
                    <p className="text-3xl text-center font-bold text-black mt-1">
                      {Math.round(slot.temperature)}°C
                    </p>
                    <p className="text-center text-lg font-bold mt-1">
                      {slot.suggestion}
                    </p>
                    <div className="mt-4 text-lg text-white space-y-1">
                      <p><span className="font-semibold">Time:</span> {slot.time}</p>
                      <p><span className="font-semibold">Humidity:</span> {slot.humidity}%</p>
                      <p><span className="font-semibold">Wind:</span> {slot.windSpeed} m/s</p>
                      <p><span className="font-semibold">Cloud:</span> {slot.cloudiness}%</p>
                      <p><span className="font-semibold">Rain:</span> {slot.rainVolume} mm</p>
                      <p><span className="font-semibold">Status:</span> {slot.isSafe ? '✅ Safe' : '❌ Unsafe'}</p>
                      <button
                        onClick={() => {
                          setSelectedSuggestion(slot.suggestion);
                          setSelectedDate(date);
                          setIsActivityOpen(true);
                        }}
                        className="mt-6 px-16 py-2 rounded-full text-white font-semibold bg-black">
                        Activities
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Activity
                isOpen={isActivityOpen}
                onClose={() => setIsActivityOpen(false)}
                suggestion={selectedSuggestion}
                date={selectedDate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetails;
