import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const ForgotPassword = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/authentication/forget-password", {
        email,
      });
      console.log("Reset link sent:", response.data);
      setAlertMessage("Password reset link sent to your email.");
      setAlertType("success");

      // refresh page after 3 seconds
      setTimeout(() => {
      window.location.reload();
      }, 3000);

    } catch (error) {
      console.error("Error sending reset link:", error.response?.data || error.message);
      setAlertMessage("Failed to send reset link. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-md z-50 ${
            alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {alertMessage}
        </div>
      )}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 shadow-lg rounded-3xl w-full max-w-md p-5 mx-4 relative text-gray-900">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 "
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#023545] text-white py-2 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition shadow-md"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-700">
          Remembered your password?{" "}
          <button
            onClick={onLogin}
            className="text-[#023545] font-medium hover:underline"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
