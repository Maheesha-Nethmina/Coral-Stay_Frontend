// src/Pages/User/SuggestionsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2, Lightbulb, CheckCircle2, Calendar, MapPin, User, Star } from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const SuggestionsPage = () => {
  const { bookingId } = useParams();
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
    <div>
      <Navbar/>
    <div className="p-6 bg-gray-50 min-h-screen pt-30">
      {/* Page header */}
      <div className="flex items-center mb-6 text-center">
        <Lightbulb className="w-8 h-8 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold ">Personalized Travel Suggestions</h2>
      </div>
      <p className="text-gray-600 mb-4">
        We've curated a personalized packing list based on your destination, duration, and local weather conditions. Don't forget the essentials!
      </p>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center text-gray-600">
          <Loader2 className="animate-spin w-5 h-5 mr-2" /> Loading...
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Success alert */}
          <div className="flex items-center bg-green-50 text-green-700 px-4 py-3 rounded-lg">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span>
              Your suggestions are ready! We found{" "}
              <strong>{data.suggestions?.length || 0}</strong> recommended items
              for your trip.
            </span>
          </div>

          {/* Booking details card */}
          <div className="bg-white shadow-sm rounded-xl p-6 border space-y-3">
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700">
              <p className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Guest:</span>&nbsp;{data.guest}
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Room type:</span>&nbsp;
                {data.roomType}
              </p>
              <p className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Check-in:</span>&nbsp;
                {new Date(data.checkIn).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Check-out:</span>&nbsp;
                {new Date(data.checkOut).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="flex items-center">
                <span className="font-medium">Quantity:</span>&nbsp;{data.quantity}
              </p>
            </div>
          </div>

          {/* Suggestions list */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              Recommended Packing Items
            </h3>
            {data.suggestions && data.suggestions.length > 0 ? (
              <ul className="grid md:grid-cols-2 gap-4 px-10 py-5">
                {data.suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm px-4 py-3 hover:shadow-md transition"
                  >
                       <Star className="w-4 h-4 text-yellow-400 mr-3" />

                    <span className="text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No suggestions available for this booking.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500">Error: Could not load suggestions.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default SuggestionsPage;
