import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WeatherDetails() {
     const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch weather alerts when admin logs in
    axios.get('http://localhost:3000/api/weather/alerts')
      .then(res => {
        setAlerts(res.data.alerts);
      })
      .catch(err => console.error('Weather fetch failed:', err));
  }, []);

  return (
    <div>
      <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🌧 Coral Reef Weather Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((alert, idx) => (
          <div key={idx} className="bg-[#4f9090] text-black p-3 mb-2 rounded">
            <strong>{alert.date} at {alert.time}</strong> - {alert.reason}
          </div>
        ))
      ) : (
        <p className="text-green-600">✅ No unsafe conditions detected</p>
      )}
    </div>
    </div>
  )
}

export default WeatherDetails
