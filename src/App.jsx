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
import DeluxeRoom from './Pages/User/DeluxeRoom'
// Admin Pages
import AddEvents from './Pages/Admin/AddEvents';
import EventDetails from './Pages/Admin/EventDetails';
import UpdateEvent from './Pages/Admin/UpdateEvents';
import UserDetails from './Pages/Admin/UserDetails';
import ReefTourdetails from './Pages/Admin/ReefTourdetails';
import AdminDash from './Pages/Admin/AdminDash';
import HotelBookingdetails from './Pages/Admin/HotelBookingdetails';
import EditUser from './Pages/Admin/EditUser';



// Auth Components
import ResetPassword from './Components/Auth/ResetPassword';
// import Events from './Pages/User/Events';

function App() {
  const { user, loading } = useAuth();

  const ProtectedAdminRoute = ({ element }) => {
    if (loading) return <div>Loading...</div>;
    if (!user || user.role !== 'admin') {
      return <Navigate to="/" />;
    }
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
          <Route path="/Stays" element={<Stays />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/room-booking" element={<RoomBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/DeluxeRoom" element={<DeluxeRoom/>}/>


          {/* Admin panel routes */}
          <Route path="/addEvents" element={<AddEvents/>} />
          <Route path="/eventDetails" element={<EventDetails/>}/>
          <Route path="/eventDetails/:id" element={<UpdateEvent/>} />
          <Route path="/userDetails" element={<UserDetails/>} />
          <Route path="/editUser/:id" element={<EditUser/>} />
          <Route path="/reeftourdetails" element={<ReefTourdetails/>} />
          <Route path="/hotelbookingdetails" element={<HotelBookingdetails/>} />

         
          
          {/* Protected Admin Route */}
          <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDash />} />} />

          {/* Reset Password Route */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Catch-all Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
