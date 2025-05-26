import { useState, useEffect } from "react";
import { Menu, X, Home, Info, Phone, Sailboat,LifeBuoy , UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgotPassword from "../Auth/ForgotPassword";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [showModal, setShowModal] = useState(false);
  const [authView, setAuthView] = useState("login");

  const { user, logout, loading } = useAuth();
  const location = useLocation();

const navLinks = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Reef Ride", path: "/reef_ride", icon: <Sailboat size={18} /> },
  { name: "Reef Dive", path: "/reef_dive", icon: <LifeBuoy  size={18} /> },
  { name: "About Us", path: "/about", icon: <Info size={18} /> },
  { name: "Contact Us", path: "/contact", icon: <Phone size={18} /> },
];

useEffect(() => {
  const currentPath = location.pathname;
  const activeLink = navLinks.find((link) => link.path === currentPath);
  if (activeLink) {
    setActive(activeLink.name);
  }
}, [location.pathname]);


  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      setIsOpen(false);
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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-extrabold text-indigo-600 tracking-wide"
              onClick={() => setActive("Home")}
            >
              NeMa
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setActive(link.name)}
                  className={`relative text-gray-800 font-medium transition-all duration-200 ${
                    active === link.name ? "text-indigo-600" : ""
                  } after:content-[''] after:block after:h-[2px] after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                    active === link.name ? "after:scale-x-100" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to={user.role === "admin" ? "/admin" : "/profile"}
                    className="text-indigo-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <UserRound size={18} />
                    {user.role === "admin" ? "Admin" : user.name?.slice(0, 5)}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition shadow-md"
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
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                >
                  <UserRound size={18} />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-indigo-600 p-2 rounded-md hover:bg-white/40 transition"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mx-4 mt-2 bg-white/50 backdrop-blur-xl px-6 pt-6 pb-6 space-y-3 shadow-xl rounded-2xl border border-white/30">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  setActive(link.name);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-800 font-medium hover:text-indigo-600 hover:bg-white/60 transition ${
                  active === link.name ? "text-indigo-600 bg-white/60" : ""
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/profile"}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-600 font-medium hover:bg-white/60 transition"
                >
                  <UserRound size={18} />
                  {user.role === "admin" ? "Admin" : user.name?.slice(0, 5)}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full bg-red-500 text-white px-5 py-2.5 rounded-2xl hover:bg-red-600 transition-all duration-200 shadow-md"
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
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md"
              >
                <UserRound size={18} />
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {showModal && renderAuthModal()}
    </>
  );
};

export default Navbar;
