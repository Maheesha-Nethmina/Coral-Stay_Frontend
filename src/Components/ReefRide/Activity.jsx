// Activity.jsx
import React from 'react';
import { X, MapPin, Star, ExternalLink } from 'lucide-react';
import img1 from '../../assets/turtle.png';
import img2 from '../../assets/turtle2.jpg';
import img3 from '../../assets/museum.png';
import img4 from '../../assets/museum3.jpg';
import img5 from '../../assets/cooking.jpg';
import img6 from '../../assets/ayurveda.png';
import img7 from '../../assets/ayurveda3.jpeg';

const Activity = ({ isOpen, onClose, suggestion }) => {
  if (!isOpen) return null;

  const activities = {
    "🐢 Turtle Hatcheries & Education Centres": [
      {
        title: "Hikkaduwa Sea Turtle Hatchery",
        description: "Learn about conservation work with endangered sea turtles, see incubation tanks, and sometimes release hatchlings—highly regarded by travelers",
        details: "Open daily from 9 AM to 6 PM.",
        maplink: "https://maps.app.goo.gl/49LFdZC8AbgGTcUG7",
        image: img1,
        rating: 4.8,
        tip: "Maintain proper hygiene: use sanitizer and follow staff instructions to avoid harming turtles"
      },
      {
        title: "Victor Hasselblad Sea Turtle Research & Conservation Centre",
        description: "Observe various sea turtle species and learn about their life cycles in a research-focused setting",
        details: "Located in Kosgoda, about 20–30 minutes from Hikkaduwa",
        maplink: "https://maps.app.goo.gl/mSZ8deYXZQ9AYgca6",
        image: img2,
        rating: 4.5,
        tip: "Visit early or late afternoon for cooler weather and fewer crowds."
      }
    ],
    "🏛️ Museums & Cultural Spaces": [
      {
        title: "Tsunami Photo Museum",
        description: "A moving exhibit that documents the devastating 2004 tsunami with photos, stories, and local survivor accounts",
        details: "Open daily from 8 or 9 AM to 6 or 8 PM, depending on the season",
        maplink: "https://maps.app.goo.gl/c77cHMo9nKstUHb9A",
        image: img3,
        rating: 4.6,
        tip: "Photos are often allowed, but ask first and be respectful"
      },
      {
        title: "Ariyapala Mask Museum",
        description: "Discover traditional Sri Lankan masks used in rituals, dance, and healing—an engaging cultural experience",
        details: "Open daily from 8.30AM to 5.30 PM.",
        maplink: "https://maps.app.goo.gl/1r7qeWVSYwwTCroe9",
        image: img4,
        rating: 4.4,
        tip: "There’s a gift shop with authentic masks—great for souvenirs and supports the museum."
      }
    ],
    "🍽️ Cooking Classes & Workshops": [
      {
        title: "Chintha´s Cooking Lessons Hikkaduwa",
        description: "Learn to prepare curries and local specialties in small-group sessions—highly rated as a must-do",
        details: "Book in advance, especially during weekends or peak seasons",
        rating: 4.9,
        maplink: "https://maps.app.goo.gl/SF2DkM2VLeYcRCo78",
        image: img5,
        tip: "Let them know dietary restrictions (vegetarian, gluten-free, allergies) before class."
      }
    ],
    "🧘 Spa & Wellness": [
      {
        title: "Sandagiri Ayurveda Centre",
        description: "Sandagiri Ayurveda Centre in Hikkaduwa offers traditional Ayurvedic treatments like full-body massages, herbal steam baths, and shirodhara (warm oil therapy).",
        details: "Open Daily: 8 AM–11 PM",
        maplink: "https://maps.app.goo.gl/ro1vmU3tHF5X9Udf6",
        image: img6,
        rating: 4.3,
        tip: "Book your treatment or class at least a day ahead to ensure availability."
      },
      {
        title: "Miracle Ayu Ayurveda Treatment Center",
        description: "Miracle Ayu Ayurveda Treatment Center in Hikkaduwa offers traditional Ayurvedic therapies like massages, steam baths, and herbal treatments.",
        details: "Hours: Open daily from 9 AM to 11 PM",
        maplink: "https://maps.app.goo.gl/hwc24MafythMowxv8",
        image: img7,
        rating: 4.2,
        tip: "Arrive 10–15 minutes early for yoga to settle in and avoid disrupting others."
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#023545] to-[#D9D9D9] text-white p-6 relative">
          <button
             onClick={onClose}
             className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 text-black"
          >
       <X size={24} />
</button>

          <div className="flex items-center gap-3">
            <MapPin size={32} className="text-white" />
            <div>
              <h1 className="text-3xl font-bold">Hikkaduwa Activities</h1>
              <p className="text-teal-100 mt-1">
                Discover the best attractions and experiences
              </p>
            </div>
          </div>
          {suggestion && (
            <div className="mt-4 bg-white text-black rounded-xl px-4 py-3 shadow-md">
              <p className="text-xl font-semibold text-center">{suggestion}</p>
              <p className="text-center text-sm text-gray-600 mt-1">
                Explore this activity to gain great experiences and lasting memories throughout your trip.

              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] ">
          <div className="space-y-8">
            {Object.entries(activities).map(([category, items]) => (
              <div key={category} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  {category}
                </h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#EAF4F6] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                      <p className="text-[#023545] mb-4">{item.details}</p>
                      <p className="text-blue-600 underline hover:text-blue-800 break-words mb-6">
                        <a href={item.maplink} target="_blank" rel="noopener noreferrer">
                          Google Maps Location <ExternalLink size={16} />
                        </a>
                      </p>
                      {item.tip && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4 rounded-r-lg">
                          <p className="text-amber-800 text-sm font-medium">
                            <span className="font-semibold">Tip:</span> {item.tip}
                          </p>
                        </div>
                      )}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full max-w-md rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <br/>
          <br/>
          <br/>
        </div>

      </div>
    </div>
  );
};

export default Activity;
