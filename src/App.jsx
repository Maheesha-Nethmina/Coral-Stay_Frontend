import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// User Pages
import Home from './Pages/User/Home';
import About from './Pages/User/About';
import Contact from './Pages/User/Contact';
import Reef_Ride from './Pages/User/Reef_Ride';
import Stays from './Pages/User/Stays';
import Events from './Pages/User/Events';
import RoomBooking from './Pages/User/RoomBooking';
import Profile from './Pages/User/Profile';
import Booking from './Pages/User/Booking';
import Packages from './Pages/User/Packages';
import DeluxeRoom from './Pages/User/DeluxeRoom';
import PremierRoom from './Pages/User/PremierRoom';
import RoyalSuiteRoom from './Pages/User/RoyalSuiteRoom';
import PremierOceanRoom from './Pages/User/PremierOceanRoom';
import PresidentialSuiteRoom from './Pages/User/PresidentialSuiteRoom';
import PackageDetail from './Pages/User/PackageDetail';

// Admin Pages
import AddEvents from './Pages/Admin/AddEvents';
import EventDetails from './Pages/Admin/EventDetails';
import UpdateEvent from './Pages/Admin/UpdateEvents';
import UserDetails from './Pages/Admin/UserDetails';
import ReefTourdetails from './Pages/Admin/ReefTourdetails';
import AdminDash from './Pages/Admin/AdminDash';
import HotelBookingdetails from './Pages/Admin/HotelBookingdetails';
import EditUser from './Pages/Admin/EditUser';
import AddPackages from './Pages/Admin/PackageData/AddPackages';
import PackageDetails from './Pages/Admin/PackageData/PackageDetails';
import UpdatePackages from './Pages/Admin/PackageData/UpdatePackages';
import SendEmail from './Pages/Admin/SendEmail';

// Auth Component
import ResetPassword from './Components/Auth/ResetPassword';

function App() {
  const { user, loading } = useAuth();

  const ProtectedAdminRoute = ({ element }) => {
    if (loading) return <div>Loading...</div>;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;
    return element;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reef_ride" element={<Reef_Ride />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/events" element={<Events />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deluxeroom" element={<DeluxeRoom />} />
          <Route path="/premierroom" element={<PremierRoom />} />
          <Route path="/royalsuiteroom" element={<RoyalSuiteRoom />} />
          <Route path="/presidentialsuiteroom" element={<PresidentialSuiteRoom />} />
          <Route path="/premieroceanroom" element={<PremierOceanRoom />} />
          <Route path="/packagedetail/:id" element={<PackageDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/packages" element={<Packages />} />

          {/* Admin Routes */}
          <Route path="/addevents" element={<AddEvents />} />
          <Route path="/eventdetails" element={<EventDetails />} />
          <Route path="/eventdetails/:id" element={<UpdateEvent />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/editUser/:id" element={<EditUser />} />
          <Route path="/reeftourdetails" element={<ReefTourdetails />} />
          <Route path="/hotelbookingdetails" element={<HotelBookingdetails />} />
          <Route path="/addpackages" element={<AddPackages />} />
          <Route path="/packagedetails" element={<PackageDetails />} />
          <Route path="/packagedetails/:id" element={<UpdatePackages />} />
          <Route path="/sendEmail/:id" element={<SendEmail />} />

          {/* Admin Protected */}
          <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDash />} />} />

          {/* Auth */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Catch-all */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
