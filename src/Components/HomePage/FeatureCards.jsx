import React from 'react';
import { useNavigate } from 'react-router-dom';
import image01 from '../../assets/carousel02.jpg';
import image03 from '../../assets/image03.jpg';
import image04 from '../../assets/image04.jpg';

const cards = [
  {
    id: 'snorkeling',
    highlight: "Nature's colors, your front-row seat.",
    subtext: "Cruise the coast and catch stunning reef views.\nNo diving, just pure ocean magic.",
    image: image01,
    size: 'large',
    hasButton: true,
    path: '/reef_ride',
  },
  {
    id: 'accommodation',
    highlight: "Comfort is just a click away.",
    subtext: "Explore Our Exclusive Packages.",
    image: image03,
    size: 'small',
    hasButton: true,
    path: '/packages',
  },
  {
    id: 'luxury',
    highlight: "Your private slice of paradise.",
    subtext: "Personalized service meets\nunmatched luxury.",
    image: image04,
    size: 'small',
    hasButton: true,
    path: '/Stays',
  },
];

const AfterHeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#e7f8fe]">
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-12 mx-auto max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[800px]">
          <div className="lg:w-3/5 h-[400px] lg:h-full relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
            <img
              src={cards[0].image}
              alt={cards[0].id}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
              <div className="pt-4 mb-6">
                <p className="text-white font-semibold text-2xl md:text-4xl mb-2">{cards[0].highlight}</p>
                <p className="text-white/90 text-sm md:text-base whitespace-pre-line">{cards[0].subtext}</p>
              </div>
              <button
                className="bg-[#023545] hover:bg-teal-700 text-white font-medium py-2 md:py-3 px-6 md:px-8 rounded-lg text-sm md:text-lg w-full md:w-[300px]"
                onClick={() => navigate(cards[0].path)}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="lg:w-2/5 flex flex-col gap-6">
            {cards.slice(1).map((card) => (
              <div key={card.id} className="relative rounded-xl overflow-hidden h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img
                  src={card.image}
                  alt={card.id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
                  <div className="pt-4 mb-6">
                    <p className="text-white font-semibold text-2xl md:text-3xl mb-2">{card.highlight}</p>
                    <p className="text-white/90 text-sm md:text-base whitespace-pre-line">{card.subtext}</p>
                  </div>
                  <button
                    className="bg-[#023545] hover:bg-teal-700 text-white font-medium py-3 md:py-3 px-6 md:px-8 rounded-lg text-sm md:text-lg w-full"
                    onClick={() => navigate(card.path)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:hidden gap-6 mt-10">
          {cards.map((card) => (
            <div key={card.id} className="relative rounded-xl overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
              <img
                src={card.image}
                alt={card.id}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
                <div className="pt-4 mb-6">
                  <p className="text-white font-semibold text-2xl md:text-3xl mb-2">{card.highlight}</p>
                  <p className="text-white/90 text-sm md:text-base whitespace-pre-line">{card.subtext}</p>
                </div>
                <button
                  className="bg-[#023545] hover:bg-teal-700 text-white font-medium py-2 md:py-3 px-6 md:px-8 rounded-lg text-sm md:text-lg w-full"
                  onClick={() => navigate(card.path)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AfterHeroSection;
