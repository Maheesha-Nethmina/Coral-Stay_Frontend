import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Register = ({ onClose, onLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const { login } = useAuth();

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setAlertMessage("Passwords do not match");
      setAlertType("error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/authentication/register", {
        name: fullName,
        email,
        password,
        retypePassword,
      });

      console.log("Registration successful:", response.data);
      setAlertMessage("Registration successful");
      setAlertType("success");

      await login(email, password); // auto login after registration
      resetForm();
      onClose();
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setAlertMessage("Registration failed. Please try again.");
      setAlertType("error");
      resetForm();
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
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Coral Stay_Hikkaduwa"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              placeholder="coralstay@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block font-medium">Retype Password</label>
            <input
              type="password"
              placeholder="********"
              value={retypePassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#023545] text-white py-2 rounded-xl hover:opacity-90 transition shadow-md"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={onLogin}
            className="text-[#023545] font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
