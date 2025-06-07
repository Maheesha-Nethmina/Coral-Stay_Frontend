import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';  // To access the user's authentication state
import Home from './Pages/User/Home';
import About from './Pages/User/About';
import Contact from './Pages/User/Contact';
import Reef_Ride from './Pages/User/Reef_Ride';
import Stays from './Pages/User/Stays';
import AdminDash from './Pages/Admin/AdminDash';
import ResetPassword from './Components/Auth/ResetPassword';
import Events from './Pages/User/Events';

function App() {
  const { user, loading } = useAuth();

  // Protected Route for Admin
  const ProtectedAdminRoute = ({ element }) => {
    if (loading) return <div>Loading...</div>;  // Wait until loading is complete
    if (!user || user.role !== 'admin') {
      return <Navigate to="/" />; // Redirect to home if not an admin
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

         
          
          {/* Protected Admin Route */}
          <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDash />} />} />
          
          {/* Reset Password Route */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Catch-all Route for unknown pages */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
