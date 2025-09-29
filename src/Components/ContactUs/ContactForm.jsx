
import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setStatusType("info");

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setStatusType("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      setStatus("Error sending message.");
      setStatusType("error");
    }
  };

  return (
    <div className="bg-[#EAF4F6] -mt-15">
      <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Form */}
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-white p-6 md:p-8 rounded-lg shadow-lg"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                Get In Touch With Us
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="flex-1 w-full p-3 border border-gray-300 text-gray-700 bg-transparent rounded-lg"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="flex-1 w-full p-3 border border-gray-300 text-gray-700 bg-transparent rounded-lg"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 text-gray-700 bg-transparent rounded-lg"
              />
              <textarea
                name="message"
                placeholder="Add Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 text-gray-700 bg-transparent h-32 rounded-lg"
              />
              <div className="pt-1 text-center">
                <button
                  type="submit"
                  className="bg-[#023545] text-white px-12 md:px-44 py-3 rounded-sm hover:bg-blue-700 transition text-sm font-medium tracking-wide"
                >
                  Send Message
                </button>
              </div>
              {status && (
                <p
                  className={`text-center text-sm mt-2 font-semibold transition-colors duration-200 ${
                    statusType === "success"
                      ? "text-blue-600"
                      : statusType === "error"
                      ? "text-red-600"
                      : "text-blue-500"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Right Section - Contact Details */}
          <div className="flex-1 p-6 md:p-10 ">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 -mt-2 md:-mt-2">
              Contact Details
            </h3>
            <p className="mb-8 text-black leading-relaxed">
              CoralStay is your gateway to an unforgettable reef tour and stay
              experience. Feel free to reach out to us!
            </p>

            <div className="space-y-8">
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=No+123%2FA+Hikkaduwa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 underline transition-colors duration-200"
                      title="View on Google Maps"
                    >
                      No 123/A, CoralStay, Hikkaduwa
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </span>
                    <a
                      href="mailto:coralstayhikkaduwa@gmail.com"
                      className="text-gray-700 hover:text-blue-600 underline transition-colors duration-200"
                      title="Send Email"
                    >
                      coralstayhikkaduwa@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-6 mt-6">
                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile
                    </span>
                    <a
                      href="tel:072917345"
                      className="text-gray-700 hover:text-blue-600 underline transition-colors duration-200"
                      title="Call Mobile"
                    >
                      0712917345
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-[250px]">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Whatsapp
                    </span>
                    <a
                      href="https://wa.me/9472918348"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-green-600 underline transition-colors duration-200"
                      title="Chat on WhatsApp"
                    >
                      0712918348
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-bold text-gray-700 text-sm mb-4">
                Search Us On
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-110 group"
                  title="Connect with us on Facebook"
                >
                  <Facebook className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-blue-600" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-110 group"
                  title="Connect with us on Twitter"
                >
                  <Twitter className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-sky-400" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-110 group"
                  title="Connect with us on Instagram"
                >
                  <Instagram className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-pink-500" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-110 group"
                  title="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-blue-800" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
