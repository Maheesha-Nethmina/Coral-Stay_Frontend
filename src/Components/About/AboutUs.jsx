import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 3 reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/reviews/');
          const data = await res.json();

          // Sort reviews by createdAt descending and get latest 3
          const latestReviews = (data.reviews || [])
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

          setReviews(latestReviews);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        } finally {
          setLoading(false);
        }
      };


    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      ));
  };

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
              alt="CoralStay family by the reef" 
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
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#023545' }}>Coral Reef Boat Tours</h3>
              <ul className="text-gray-700 text-lg space-y-2">
                <li className="flex items-start"><span className="mr-2">•</span>Guided daily tours with friendly, experienced crew</li>
                <li className="flex items-start"><span className="mr-2">•</span>Glass-bottom boats to view coral without getting wet</li>
                <li className="flex items-start"><span className="mr-2">•</span>Optional snorkeling to swim with colorful fish</li>
                <li className="flex items-start"><span className="mr-2">•</span>Learn about coral reefs and conservation efforts</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#023545' }}>Hotel – CoralStay</h3>
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
              alt="Coral reef conservation team" 
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
              alt="Why choose CoralStay experience" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-6">Why Choose CoralStay</h2>
            <ul className="text-gray-700 text-lg space-y-4">
              <li className="flex items-start"><span className="mr-2">•</span>Stay and explore in one place – no separate bookings needed</li>
              <li className="flex items-start"><span className="mr-2">•</span>Locally owned and operated with personal care</li>
              <li className="flex items-start"><span className="mr-2">•</span>Clean, safe boats and peaceful rooms</li>
              <li className="flex items-start"><span className="mr-2">•</span>Steps away from the Hikkaduwa Marine Sanctuary</li>
              <li className="flex items-start"><span className="mr-2">•</span>Friendly team with deep knowledge of the reef</li>
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
              alt="CoralStay team smiling" 
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Section 6: Guest Reviews */}
      <FadeInSection>
        <div className="mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 font-serif mb-12 text-center">What Our Guests Say</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-500">No reviews yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                      <p className="text-gray-600 text-sm">{review.location}</p>
                    </div>
                    <div className="flex items-center">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.content}"</p>
                  <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              onClick={() => navigate('/reviews/new')}
            >
              Leave Your Review
            </button>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
