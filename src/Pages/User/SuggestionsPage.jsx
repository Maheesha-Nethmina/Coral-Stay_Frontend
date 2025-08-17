// src/Pages/User/SuggestionsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2, Lightbulb } from "lucide-react";

const SuggestionsPage = () => {
  const { bookingId } = useParams(); // must match route path="/suggestions/:bookingId"
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/suggestions/${bookingId}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching suggestions:", err);
        setLoading(false);
      });
  }, [bookingId]);

  return (
    <div className="p-6">
      {/* Page title */}
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
        Suggestions for Your Booking
      </h2>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center text-gray-600">
          <Loader2 className="animate-spin w-5 h-5 mr-2" /> Loading...
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Booking info */}
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p><span className="font-semibold">Guest:</span> {data.guest}</p>
            <p><span className="font-semibold">Check-in:</span> {new Date(data.checkIn).toDateString()}</p>
            <p><span className="font-semibold">Check-out:</span> {new Date(data.checkOut).toDateString()}</p>
          </div>

          {/* Suggestions list */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Recommended Packing Items:</h3>
            {data.suggestions && data.suggestions.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {data.suggestions.map((item, idx) => (
                  <li key={idx} className="text-gray-800">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No suggestions available for this booking.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500">Error: Could not load suggestions.</p>
      )}
    </div>
  );
};

export default SuggestionsPage;
