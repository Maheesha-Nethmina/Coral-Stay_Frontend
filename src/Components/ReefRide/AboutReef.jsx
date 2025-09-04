import React, { useState } from 'react';
import video3 from '../../assets/video03.mp4';

const AboutReef = () => {
  const [showTerms, setShowTerms] = useState(false);

  const termsContent = `
    <h2 class="text-4xl font-bold mb-4 text-center">Terms and Conditions</h2>
    
    <div class="hover:bg-[#EAF4F6] cursor-pointer p-1 rounded">
    <h3 class="text-xl font-semibold mt-4 mb-2">1. Booking and Payment</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Full payment is required at the time of booking to secure your reservation</li>
      <li>We accept major credit cards and bank transfers</li>
      <li>Prices include all government taxes and service charges</li>
    </ul>
    </div>
    
    <div class="hover:bg-[#EAF4F6] cursor-pointer p-1 rounded">
    <h3 class="text-xl font-semibold mt-4 mb-2">2. Cancellation Policy</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Cancellations made 48 hours or more before the tour: Full refund</li>
      <li>Cancellations made within 48 hours of the tour: 50% refund</li>
      <li>No-shows will be charged the full amount</li>
    </ul>
     </div>
    
    <div class="hover:bg-[#EAF4F6] cursor-pointer p-1 rounded">
    <h3 class="text-xl font-semibold mt-4 mb-2">3. Safety Regulations</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>All participants must wear life jackets during boat transit</li>
      <li>Follow crew instructions at all times</li>
      <li>Do not touch or stand on coral reefs</li>
      <li>Children under 12 must be supervised by an adult</li>
    </ul>
     </div>
    
    <div class="hover:bg-[#EAF4F6] cursor-pointer p-1 rounded">
    <h3 class="text-xl font-semibold mt-4 mb-2">4. Health Requirements</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Notify us of any medical conditions before booking</li>
      <li>Not recommended for pregnant women or people with heart conditions</li>
      <li>Basic swimming ability required for snorkeling activities</li>
    </ul>
     </div>
    
    <div class="hover:bg-[#EAF4F6] cursor-pointer p-1 rounded">
    <h3 class="text-xl font-semibold mt-4 mb-2">5. Environmental Policy</h3>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Use only reef-safe sunscreen (available for purchase)</li>
      <li>Do not feed fish or disturb marine life</li>
      <li>Take only photos, leave only bubbles</li>
    </ul>
     </div>
    
    <p class="mt-6">By booking with us, you agree to these terms and conditions.</p>
  `;

  return (
    <div className="bg-[#EAF4F6] py-10 md:py-20 -mt-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-2 md:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <video 
                className="w-full h-auto max-h-[500px] object-cover"
                controls
                muted
                autoPlay
                loop
                playsInline
              >
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Relax and Enjoy — We'll Take Care of the Rest. 
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your safety is our priority. Life jackets and snorkeling gear are provided, and a quick safety briefing is given before departure. Please wear comfortable clothing, non-slip footwear, and reef-safe sunscreen. 
              Let us know during booking if you have any medical conditions, accessibility needs, or allergies. Drinking water is available on board. Children under 12 must be accompanied by an adult. We aim to make your trip safe, relaxing, and truly memorable.
              <br/>
              For full details about bookings, cancellations, safety policies, and guest responsibilities, please visit our Terms & Conditions page.         
            </p>
            
            <div className="border-t border-gray-200 pt-6 -mt-10">
              <button 
                onClick={() => setShowTerms(true)}
                className="text-white bg-[#023545] hover:bg-[#01212d] font-medium text-xl transition-colors py-3 px-8 rounded-lg"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div 
            className="absolute inset-0 bg-[#EAF4F6] opacity-95"
            onClick={() => setShowTerms(false)}
          ></div>
          <div className="bg-[#F4F2F2] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 ">
            <div className="p-6">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: termsContent }}
              />
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowTerms(false)}
                  className="bg-[#023545] text-white font-medium py-2 px-10 rounded-lg hover:bg-[#01212d] transition-colors"
                >
                  Yes I Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutReef;