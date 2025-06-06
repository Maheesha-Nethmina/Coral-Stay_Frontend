import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { X } from "lucide-react";

const Login = ({ onClose, onRegister, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const { login } = useAuth();

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMessage("Please enter both email and password.");
      setAlertType("error");
      return;
    }

    try {
      await login(email, password);
      resetForm();
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || "Login failed. Please try again.");
      setAlertType("error");
      resetForm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {alertMessage && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-md z-50 ${
          alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {alertMessage}
        </div>
      )}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 shadow-lg rounded-3xl w-full max-w-md p-5 mx-4 relative text-gray-900">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-700 hover:text-red-500">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg"
              placeholder="coralstay@gmail.com"
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg"
              placeholder="********"
            />
          </div>
          <button type="submit" className="w-full bg-[#023545] text-white py-2 rounded-xl hover:opacity-90">
            Login
          </button>
          <button
            type="button"
            onClick={() => alert("Google Sign-In not implemented")}
            className="w-full flex items-center justify-center gap-3 mt-3 border border-white/30 bg-white/10 py-2 text-sm font-medium text-gray-800 rounded-xl hover:bg-white/20"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
          <div className="text-sm text-center mt-2">
            <button type="button" onClick={onForgotPassword} className="text-[#023545] font-medium hover:underline">
              Forgot password?
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <button onClick={onRegister} className="text-[#023545] font-medium hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
