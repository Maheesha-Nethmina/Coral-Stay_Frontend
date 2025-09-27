import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Phone,
  Sailboat,
  LifeBuoy,
  UserRound,
  Gift,
  SatelliteIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import { useAuth } from "../../contexts/AuthContext";
import navLogo from "../../assets/navLogo.png";

// Chatbot imports
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../ChatBot/config";
import MessageParser from "../ChatBot/MessageParser";
import ActionProvider from "../ChatBot/ActionProvider";
import botimage from "../../assets/botimage.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [showChatbot, setShowChatbot] = useState(false);

  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Virtual Tour", path: "/virtualTour", icon: <SatelliteIcon size={18} /> },
    { name: "Reef Ride", path: "/reef_ride", icon: <Sailboat size={18} /> },
    { name: "Stays", path: "/Stays", icon: <LifeBuoy size={18} /> },
    { name: "Packages", path: "/packages", icon: <Gift size={18} /> },
    { name: "About Us", path: "/about", icon: <Info size={18} /> },
    { name: "Contact Us", path: "/contact", icon: <Phone size={18} /> },
  ];

  useEffect(() => {
    if (user && user._id) {
      console.log("Current User ID:", user._id);
    } else {
      console.log("No logged-in user");
    }
  }, [user]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      setIsOpen(false);
      navigate("/");
    }
  };

  const renderAuthModal = () => {
    switch (authView) {
      case "login":
        return (
          <Login
            onClose={() => setShowModal(false)}
            onRegister={() => setAuthView("register")}
            onForgotPassword={() => setAuthView("forgot")}
          />
        );
      case "register":
        return (
          <Register
            onClose={() => setShowModal(false)}
            onLogin={() => setAuthView("login")}
          />
        );
      case "forgot":
        return (
          <ForgotPassword
            onClose={() => setShowModal(false)}
            onLogin={() => setAuthView("login")}
          />
        );
      default:
        return null;
    }
  };

  if (loading) return null;

  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#EAF4F6] shadow-md">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-18 py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={navLogo} alt="Coral Stay Logo" className="h-25 w-auto" />
            </Link>

            {/* Center navigation links */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 whitespace-nowrap items-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-[#023545] font-medium text-[16px] px-2 transition-all duration-200 whitespace-nowrap hover:text-indigo-600 ${
                      isActive ? "text-indigo-600" : ""
                    } after:content-[''] after:block after:h-[2px] after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                      isActive ? "after:scale-x-100" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right side (Auth) */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/profile"}
                    className="text-[#023545] font-medium hover:underline flex items-center gap-1"
                  >
                    <UserRound size={18} />
                    {user.role === "admin"
                      ? "Admin"
                      : user.name?.split(" ")[0] || "User"}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-[#023545] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setAuthView("login");
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 bg-[#023545] text-white px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all duration-200 shadow-md"
                >
                  <UserRound size={18} />
                  Login
                </button>
              )}
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#023545] p-2 rounded-md hover:bg-white/40 transition"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mx-4 mt-2 bg-[#EAF4F6] px-6 pt-6 pb-6 space-y-3 shadow-xl rounded-2xl border border-white/30">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg font-medium hover:bg-white/60 transition text-[#023545] ${
                    isActive ? "bg-white/60" : ""
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/profile"}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium hover:bg-white/60 transition text-[#023545]"
                >
                  <UserRound size={18} />
                  {user.role === "admin"
                    ? "Admin"
                    : user.name?.split(" ")[0] || "User"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full bg-[#023545] text-white px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all duration-200 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setAuthView("login");
                  setShowModal(true);
                }}
                className="flex items-center justify-center gap-2 w-full bg-[#023545] text-white px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all duration-200 shadow-md"
              >
                <UserRound size={18} />
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {showModal && renderAuthModal()}

      {/* Chatbot */}
      {showChatbot && (
        <div
          style={{
            position: "fixed",
            top: "170px",
            right: "150px",
            zIndex: 999,
            width: "250px",
            height: "300px",
          }}
        >
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            saveMessages={saveMessages}
          />
        </div>
      )}

      {/* Bot icon */}
      <div
        style={{
          position: "fixed",
          top: "620px",
          right: "50px",
          zIndex: 999,
          width: "50px",
          height: "50px",
          cursor: "pointer",
          borderRadius: "15px", // Added radius
          overflow: "hidden",   // ensures image doesn't overflow the border radius
        }}
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <img src={botimage} alt="bot" />
      </div>
    </>
  );
};

export default Navbar;
