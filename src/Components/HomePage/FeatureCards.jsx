import React from 'react';
import image01 from '../../assets/carousel02.jpg'
import image03 from '../../assets/image03.jpg'
import image04 from '../../assets/image04.jpg'
function FeatureCards() {
  const cards = [
    {
      id: 'snorkeling',
      highlight: "Nature's colors, your front-row seat.",
      subtext: "Cruise the coast and catch stunning reef views.\nNo diving, just pure ocean magic.",
      image: image01,
      size: 'large',
      hasButton: true
    },
    {
      id: 'accommodation',
      highlight: "Comfort is just a click away.",
      subtext: "Private beaches and premium amenities.",
      image: image03,
      size: 'small',
      hasButton: true
    },
    {
      id: 'luxury',
      highlight: "Your private slice of paradise.",
      subtext: "Personalized service meets\nunmatched luxury.",
      image: image04,
      size: 'small',
      hasButton: true
    }
  ];

  return (
    <div className="bg-[#e7f8fe]">
      {/* FULL WIDTH CONTAINER */}
      <section className="w-full px-4 py-12 mx-auto max-w-screen-xl"> {/* Max width 1536px */}
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[800px]"> {/* Fixed container height */}
          
          {/* LARGE CARD (Left) */}
          <div className="lg:col-span-2 h-full relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"/>
            <img 
              src={cards[0].image} 
              alt={cards[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
             
              <div className="  pt-4 mb-6">
                <p className="text-white font-semibold text-4xl mb-2">{cards[0].highlight}</p>
                <p className="text-white/90 text-base whitespace-pre-line">{cards[0].subtext}</p>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg text-lg">
                Book Now
              </button>
            </div>
          </div>

          {/* SMALL CARDS COLUMN (Right) */}
          <div className="flex flex-col gap-6 h-full">
            {cards.slice(1).map((card) => (
              <div key={card.id} className="relative flex-1 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"/>
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  
                  <div className=" pt-3 mb-4">
                    <p className="text-white font-semibold text-4xl mb-1">{card.highlight}</p>
                    <p className="text-white/80 text-sm whitespace-pre-line">{card.subtext}</p>
                  </div>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeatureCards;