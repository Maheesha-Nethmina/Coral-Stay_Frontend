import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Reef Tours', path: '/admin/reef-tours' },
    { name: 'Hotel Bookings', path: '/admin/hotel-bookings' },
    { name: 'Messages', path: '/admin/messages' },
   { name: 'Events', path: '/eventDetails'},
  ];

  return (
    <div className="w-60 min-h-screen bg-[#eaf4f6] shadow-md p-6 mt-8">
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-3 rounded-lg transition-all duration-300 text-center font-medium cursor-pointer
                ${isActive
                  ? 'bg-[#023545] text-white font-semibold border-l-4 border-[#00ffff] pl-6' // Active state: darker background, white text, left border, extra padding
                  : 'text-black hover:bg-[#023545] hover:text-white hover:pl-6' // Hover state: dark background, white text, padding shift
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
