import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const ContactForm = () => {
  return (
    <div className="bg-[#EAF4F6] -mt-15">
      <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Form */}
          <div className="flex-1">
            <div className="space-y-8 bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                Get In Touch With Us
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 w-full p-3 border border-gray-300 text-gray-700 bg-transparent rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="flex-1 w-full p-3 border border-gray-300 text-gray-700 bg-transparent rounded-lg"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 text-gray-700 bg-transparent rounded-lg"
              />
              <textarea
                placeholder="Add Your Message"
                className="w-full p-3 border border-gray-300 text-gray-700 bg-transparent h-32 rounded-lg"
              />
              <div className="pt-1 text-center">
                <button className="bg-[#023545] text-white px-12 md:px-44 py-3 rounded-sm hover:bg-blue-700 transition text-sm font-medium tracking-wide">
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Details */}
          <div className="flex-1 p-6 md:p-10 ">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 -mt-2 md:-mt-2">
              Contact Details
            </h3>
            <p className="mb-8 text-black leading-relaxed">
              To run Figma smoothly, especially in the desktop app or browser, your
              device needs to meet or exceed certain system requirements and you
              should optimize for performance. Here's a clear breakdown.
            </p>

            <div className="space-y-8">
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Address</span>
                    <span className="text-gray-700">No 123/A Hikkaduwa</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Email</span>
                    <span className="text-gray-700">coralstay@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-6 mt-6">
                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</span>
                    <span className="text-gray-700">072917345</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Whatsapp</span>
                    <span className="text-gray-700">072918348</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-bold text-gray-700 text-sm mb-4">Search Us On</p>
              <div className="flex gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Facebook className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Twitter className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Instagram className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
