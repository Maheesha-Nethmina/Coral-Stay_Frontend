// ResetPassword.jsx
import { X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const ResetPassword = ({ onClose, onLogin }) => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) return setMessage("Missing token. Please use the link from your email.");
    if (password !== confirmPassword) return setMessage("Passwords do not match.");
    if (password.length < 8) return setMessage("Password must be at least 8 characters.");

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/authentication/reset-password", {
        token, // Use raw token, no encoding
        newPassword: password,
      });

      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/50 shadow-lg rounded-3xl w-full max-w-md p-5 mx-4 relative text-gray-900">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-center mb-4">Set New Password</h2>
          {message && (
            <p className={`text-center mb-4 ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#023545] text-white py-2 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition shadow-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-700">
            Back to{" "}
            <button
              onClick={onLogin}
              className="text-[#023545] font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
