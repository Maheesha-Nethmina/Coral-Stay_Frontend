import React from 'react';
import { X, MapPin, Users, Star, ExternalLink } from 'lucide-react';


const Activity = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const activities = {
    "🐢 Turtle Hatcheries & Education Centres": [
      {
        title: "Hikkaduwa Sea Turtle Hatchery",
        description: "Learn about conservation work with endangered sea turtles, see incubation tanks, and sometimes release hatchlings—highly regarded by travelers",
        sources: ["Reddit +15", "Tusktravel +15", "Reddit +15", "Tripadvisor +3", "omeeyo +3", "magicalisleholidays.com +3"],
        rating: 4.8
      },
      {
        title: "Victor Hasselblad Sea Turtle Research & Conservation Centre",
        description: "Observe various sea turtle species and learn about their life cycles in a research-focused setting",
        sources: ["Peek"],
        rating: 4.5
      }
    ],
    "🏛️ Museums & Cultural Spaces": [
      {
        title: "Tsunami Photo Museum",
        description: "A moving exhibit that documents the devastating 2004 tsunami with photos, stories, and local survivor accounts",
        sources: ["Tusktravel +2", "magicalisleholidays.com +2", "Holidify +2"],
        rating: 4.6
      },
      {
        title: "Ariyapala Mask Museum",
        description: "Discover traditional Sri Lankan masks used in rituals, dance, and healing—an engaging cultural experience",
        sources: ["Peek"],
        rating: 4.4
      }
    ],
    "🍽️ Cooking Classes & Workshops": [
      {
        title: "Traditional Sri Lankan Cooking Classes",
        description: "Learn to prepare curries and local specialties in small-group sessions—highly rated as a must-do",
        sources: ["Tripadvisor +5", "Tusktravel +5", "Reddit +5"],
        rating: 4.9,
        tip: "Stick to reputable kitchens or hotels—local Redditors warn against spontaneously arranged classes from beach sellers"
      }
    ],
    "🧘 Spa & Wellness": [
      {
        title: "Ayurvedic & Massage Spas",
        description: "Options like Sandagiri Ayurveda Centre, Thebodynsoul Spa, Retreat Spa, and Haritha Villas offer body massages, facials, steam rooms, and full Ayurvedic treatments",
        sources: ["Tripadvisor +1", "en.wikipedia.org +1"],
        rating: 4.3
      },
      {
        title: "Yoga Sessions",
        description: "Indoor or covered beach pavilions offering yoga flow classes—ideal when it's too hot or raining",
        sources: ["Reddit +1", "Reddit +1"],
        rating: 4.2
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3">
            <MapPin size={32} className="text-white" />
            <div>
              <h1 className="text-3xl font-bold">Hikkaduwa Activities</h1>
              <p className="text-teal-100 mt-1">Discover the best attractions and experiences</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {Object.entries(activities).map(([category, items]) => (
              <div key={category} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  {category}
                </h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {items.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                          <Star size={16} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">{item.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {item.tip && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4 rounded-r-lg">
                          <p className="text-amber-800 text-sm font-medium">
                            <span className="font-semibold">Tip:</span> {item.tip}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.sources.map((source, sourceIndex) => (
                          <span 
                            key={sourceIndex}
                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            <Users size={12} />
                            {source}
                          </span>
                        ))}
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2">
                        <ExternalLink size={16} />
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Information compiled from various travel sources and reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activity;