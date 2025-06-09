import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Home from './Pages/User/Home';
import About from './Pages/User/About';
import Contact from './Pages/User/Contact';
import Reef_Ride from './Pages/User/Reef_Ride';
import Stays from './Pages/User/Stays';
import Events from './Pages/User/Events';
import RoomBooking from './Components/Stays/RoomBooking';
import AdminDash from './Pages/Admin/AdminDash';
import ResetPassword from './Components/Auth/ResetPassword';

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
          <Route path="/stays" element={<Stays />} />
          <Route path="/events" element={<Events />} />
          <Route path="/room-booking" element={<RoomBooking />} />

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
