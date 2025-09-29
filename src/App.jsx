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
import RoomBookingForm from './Pages/User/RoomBookingForm';
import Profile from './Pages/User/Profile';
import Booking from './Pages/User/Booking';
import Packages from './Pages/User/Packages';
import DeluxeRoom from './Pages/User/DeluxeRoom';
import PremierRoom from './Pages/User/PremierRoom';
import RoyalSuiteRoom from './Pages/User/RoyalSuiteRoom';
import PremierOceanRoom from './Pages/User/PremierOceanRoom';
import PresidentialSuiteRoom from './Pages/User/PresidentialSuiteRoom';
import PackageDetail from './Pages/User/PackageDetail';
import SuggestionsPage  from './Pages/User/SuggestionsPage';

import VirtualTour from './Pages/User/3D_model/3d_coral_life';
import MarineLife from './Pages/User/3D_model/MarineLife';
import CoralReefs from './Pages/User/3D_model/CoralReefs';



import PaymentGateway from './Pages/User/PaymentGateway';

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
import BlockSheets from './Pages/Admin/BlockSheets';
import UpdatepriceSettings from './Pages/Admin/UpdatepriceSettings';
import CancellationRequest from './Pages/Admin/cancellationrequest';
import WeatherAlertPanel from './Pages/Admin/WeatherAlertPanel';
import Bookedpackagedetails from './Pages/Admin/bookedpackagedetails';

// Auth Component
import ResetPassword from './Components/Auth/ResetPassword';
import AddReview from './Pages/User/AddReview';

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
          <Route path="/virtualTour" element={<VirtualTour/>}/>
          <Route path="/reef_ride" element={<Reef_Ride />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/events" element={<Events />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/roomBookingForm" element={<RoomBookingForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deluxeroom" element={<DeluxeRoom />} />
          <Route path="/premierroom" element={<PremierRoom />} />
          <Route path="/royalsuiteroom" element={<RoyalSuiteRoom />} />
          <Route path="/presidentialsuiteroom" element={<PresidentialSuiteRoom />} />
          <Route path="/premieroceanroom" element={<PremierOceanRoom />} />
          <Route path="/packagedetail/:id" element={<PackageDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/reviews/new" element={<AddReview />} />

          <Route path="/suggestions/:bookingId" element={<SuggestionsPage />} />

          <Route path="/payment" element={<PaymentGateway />} />

          <Route path="/MarineLife" element={<MarineLife/>}/>
          <Route path="/CoralReefs" element={<CoralReefs/>}/>
          <Route path="/VirtualTour" element={<VirtualTour/>}/>



          {/* Admin Routes */}
          <Route path="/addevents" element={<ProtectedAdminRoute element={<AddEvents />} />} />
          <Route path="/eventdetails"  element={<ProtectedAdminRoute element={<EventDetails />} />} />
          <Route path="/eventdetails/:id"  element={<ProtectedAdminRoute element={<UpdateEvent />} />} />
          <Route path="/userdetails"  element={<ProtectedAdminRoute element={<UserDetails />} />} />
          <Route path="/editUser/:id"  element={<ProtectedAdminRoute element={<EditUser />} />} />
          <Route path="/reeftourdetails" element={<ProtectedAdminRoute element={<ReefTourdetails />} />} />
          <Route path="/hotelbookingdetails" element={<ProtectedAdminRoute element={<HotelBookingdetails />} />} />
          <Route path="/addpackages"  element={<ProtectedAdminRoute element={<AddPackages />} />} />
          <Route path="/packagedetails"  element={<ProtectedAdminRoute element={<PackageDetails />} />} />
          <Route path="/packagedetails/:id" element={<ProtectedAdminRoute element={<UpdatePackages />} />} />
          <Route path="/sendEmail/:id" element={<ProtectedAdminRoute element={<SendEmail />} />} />
          <Route path="/blockSheets" element={<ProtectedAdminRoute element={<BlockSheets />} />} />
          <Route path="/updatepriceSettings"  element={<ProtectedAdminRoute element={<UpdatepriceSettings />} />} />
          <Route path="/cancellationrequest" element={<ProtectedAdminRoute element={<CancellationRequest />} />} />
          <Route path="/weather-alerts" element={<ProtectedAdminRoute element={<WeatherAlertPanel />} />} />
          <Route path="/bookedpackagedetails" element={<ProtectedAdminRoute element={<Bookedpackagedetails />} />} />

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
