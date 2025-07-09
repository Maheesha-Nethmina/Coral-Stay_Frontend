import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import img1 from '../../assets/contactQ&A.jpg'; 
const QandA = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questionsData = [
    {
      question: "What is the best time of year for coral reef watching?",
      answer: "The best time for coral reef watching is during the dry season (May to October) when water visibility is highest and sea conditions are calmer. Water temperatures are also ideal during these months."
    },
    {
      question: "Do you provide snorkeling equipment for reef tours?",
      answer: "Yes, we provide high-quality snorkeling gear including masks, snorkels, and fins. We also offer prescription masks upon request. All equipment is sanitized between uses."
    },
    {
      question: "What types of rooms are available at the resort?",
      answer: "We offer Deluxe Ocean View rooms, Beachfront Villas, and Premium Reef Suites. All rooms feature private balconies, air conditioning, and modern amenities. Room sizes range from 45 to 120 square meters."
    },
    {
      question: "Are there any special requirements for coral reef watching?",
      answer: "Participants should be comfortable in water and able to swim. We recommend wearing reef-safe sunscreen and following our guide's instructions to protect both yourself and the coral reef ecosystem."
    },
    {
      question: "What's included in the hotel booking package?",
      answer: "Our packages include accommodation, daily breakfast, round-trip airport transfers, welcome drinks, and one complimentary guided reef tour. Additional activities can be booked at the resort."
    },
    {
      question: "How can I make a reservation for both hotel and reef tours?",
      answer: "You can book through our website or contact our reservation desk. We recommend booking at least 2 months in advance during peak season. Special discounts are available for combined hotel and tour packages."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#EAF4F6] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Common Queries Answered
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-800">
            with Additional FAQs
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Questions Section */}
          <div className="lg:w-1/2 space-y-4">
            {questionsData.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-200 bg-opacity-70 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="font-medium text-left text-gray-800">
                    <span className="mr-2">Question {(index + 1).toString().padStart(2, '0')}</span>
                    <span className="text-gray-700 font-normal ml-2">{item.question}</span>
                  </div>
                  <div className="text-gray-600">
                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-white text-gray-700">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <img
              src={img1}
              alt="Snorkeling with sea turtle"
              className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;