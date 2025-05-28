import React from "react";
import { MapPin, Mail, Phone, MessageSquare, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="bg-[#EAF4F6] -mt-15">
    <div className="max-w-7xl mx-auto p-8 font-sans ">

      <div className="flex flex-col lg:flex-row gap-8   overflow-hidden ">	
        {/* Left Section - Form (White) */}
        <div className="flex-1 p-10 rounded-lg ">
          <div className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">Get In Touch With Us</h1>

            <div className="flex gap-6">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="First Name"
                  className="w-full p-3 border-3 border-gray-300 focus:outline-none text-gray-700 bg-transparent rounded-lg"
                />
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Last Name"
                  className="w-full p-3 border-3 border-gray-300 focus:outline-none text-gray-700 bg-transparent rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full p-3 border-3 border-gray-300 focus:outline-none text-gray-700 bg-transparent rounded-lg"
              />
            </div>
            
            <div>
              <textarea 
                placeholder="Add Your Message"
                className="w-full p-3 border-3 border-gray-300 focus:outline-none text-gray-700 bg-transparent h-32 rounded-lg"
              />
            </div>
            <div className=" pt-1 ">
            <button className="bg-[#023545] text-white px-44 py-3 rounded-sm hover:bg-blue-700 transition text-sm font-medium tracking-wide">
              Send Message
            </button>
          </div>
          </div>
          
          
        </div>
        
        {/* Right Section - Contact Details (Light Blue) */}
        <div className="flex-1  p-10 bg-blue">
          <h3 className="text-3xl font-bold text-black mb-6 mt-8">Contact Details</h3>
          <p className="mb-8 text-black leading-relaxed">
            To run Figma smoothly, especially in the desktop app or browser, your device needs to meet or exceed certain system requirements and you should optimize for performance. Here's a clear breakdown: Would you like recommendations for a laptop or PC that fits these specs?
          </p>
          
          <div className="space-y-5">
            <div className="flex flex-row gap-15 mt-12">
            <div className="flex items-center gap-5 ">
              <div className="bg-blue-100 p-2 rounded-full">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Address</span>
                <span className="text-gray-700">No 123/A Hikkaduwa</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Email</span>
                <span className="text-gray-700">coralstay@gmail.com</span>
              </div>
            </div>
            </div>

            <div className="flex flex-row gap-35 mt-12">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</span>
                <span className="text-gray-700">072917345</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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


          <div className="mt-16 flex flex-row">
            <p className="font-bold text-gray-700 mb-4 text-sm mr-12 ">Search Us On</p>
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