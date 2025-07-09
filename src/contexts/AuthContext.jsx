import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Ensure credentials (cookies) are sent with every request
axios.defaults.withCredentials = true;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/authentication/getme");
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("Session validation failed", err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Check existing auth state on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/authentication/login",
        { email, password }
      );
      await refreshUser();
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/authentication/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
