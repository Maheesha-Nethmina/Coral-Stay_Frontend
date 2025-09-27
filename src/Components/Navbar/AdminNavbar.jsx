import { useLocation, Link } from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Users', path: '/userDetails' },
    { name: 'Reef Tours', path: '/reeftourdetails' },
    { name: 'Hotel Bookings', path: '/hotelbookingdetails' },
    { name: 'Events', path: '/eventDetails'},
    { name: 'Packages', path: '/bookedpackagedetails'},
    { name: 'Cancellation Request', path: '/cancellationrequest'},
    { name:' Weather Alerts', path: '/weather-alerts'},

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
                  ? 'bg-[#023545] text-white  border-l-4 border-[#00ffff] pl-6'
                  : 'text-black hover:bg-[#023545] hover:text-white hover:pl-6'
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
