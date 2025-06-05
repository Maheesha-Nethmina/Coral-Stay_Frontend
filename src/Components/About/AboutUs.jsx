import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Replace these with your actual image imports
import whoWeAreImg from '../../assets/about01.jpeg';
import whatWeDoImg from '../../assets/about02.jpg';
import ourGoalImg from '../../assets/about03.jpeg';
import whyChooseImg from '../../assets/about04.jpeg';
import getToKnowImg from '../../assets/image03.jpg';

// FadeInSection component for reuse
const FadeInSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Section 1: Who We Are */}
      <FadeInSection>
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-6">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Welcome to CoralStay, a family-run hotel and coral reef boat tour service located in Hikkaduwa, Sri Lanka. 
              We offer a unique all-in-one experience: stay in comfort and explore the stunning coral reefs just steps away from your room.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our passion for the ocean and the local community inspired us to create a place where visitors can enjoy nature responsibly and relax by the sea.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src={whoWeAreImg} 
              alt="CoralStay family" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Section 2: What We Do */}
      <FadeInSection>
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <img 
              src={whatWeDoImg} 
              alt="Boat tours and hotel" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-6">What We Do</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#023545] mb-2">🛥️ Coral Reef Boat Tours</h3>
              <ul className="text-gray-700 text-lg space-y-2">
                <li className="flex items-start"><span className="mr-2">•</span>Guided daily tours with friendly, experienced crew</li>
                <li className="flex items-start"><span className="mr-2">•</span>Glass-bottom boats to view coral without getting wet</li>
                <li className="flex items-start"><span className="mr-2">•</span>Optional snorkeling to swim with colorful fish</li>
                <li className="flex items-start"><span className="mr-2">•</span>Learn about coral reefs and conservation efforts</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-#023545 mb-2">🏨 Hotel – CoralStay</h3>
              <ul className="text-gray-700 text-lg space-y-2">
                <li className="flex items-start"><span className="mr-2">•</span>Comfortable rooms with garden or ocean views</li>
                <li className="flex items-start"><span className="mr-2">•</span>Free breakfast and personalized hospitality</li>
                <li className="flex items-start"><span className="mr-2">•</span>Short walk from Hikkaduwa Beach</li>
                <li className="flex items-start"><span className="mr-2">•</span>Ideal for couples, families, and eco-travelers</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Section 3: Our Goal */}
      <FadeInSection>
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-6">Our Goal</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At CoralStay, we aim to:
            </p>
            <ul className="text-gray-700 text-lg space-y-2 mb-6 pl-5 list-disc">
              <li>Give guests a relaxing, enjoyable holiday</li>
              <li>Promote eco-friendly tourism</li>
              <li>Support conservation of Hikkaduwa's coral reefs</li>
            </ul>
            <p className="text-gray-700 text-lg leading-relaxed">
              We believe tourism should help protect what makes this place special — not harm it.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src={ourGoalImg} 
              alt="Conservation efforts" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Section 4: Why Choose CoralStay */}
      <FadeInSection>
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <img 
              src={whyChooseImg} 
              alt="Why choose CoralStay" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-6">Why Choose CoralStay</h2>
            <ul className="text-gray-700 text-lg space-y-4">
              <li className="flex items-start"><span className="text-teal-600 mr-2">✓</span>Stay and explore in one place – no separate bookings needed</li>
              <li className="flex items-start"><span className="text-teal-600 mr-2">✓</span>Locally owned and operated with personal care</li>
              <li className="flex items-start"><span className="text-teal-600 mr-2">✓</span>Clean, safe boats and peaceful rooms</li>
              <li className="flex items-start"><span className="text-teal-600 mr-2">✓</span>Steps away from the Hikkaduwa Marine Sanctuary</li>
              <li className="flex items-start"><span className="text-teal-600 mr-2">✓</span>Friendly team with deep knowledge of the reef</li>
            </ul>
          </div>
        </div>
      </FadeInSection>

      {/* Section 5: Get to Know Us */}
      <FadeInSection>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-6">Get to Know Us</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We're a small team who love the ocean and love sharing it with others:
            </p>
            <ul className="text-gray-700 text-lg space-y-2 pl-5 list-disc">
              <li>Our boat captain has over 15 years of reef tour experience</li>
              <li>Our hotel team is made up of welcoming locals</li>
              <li>Every stay helps support local conservation programs</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src={getToKnowImg} 
              alt="Our team" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
