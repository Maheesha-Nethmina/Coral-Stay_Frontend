import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { X } from "lucide-react";

const Login = ({ onClose, onRegister, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Destructure refreshUser from AuthContext
  const { login, refreshUser } = useAuth();

  useEffect(() => {
    if (!alertMessage) return;
    const timer = setTimeout(() => setAlertMessage(""), 5000);
    return () => clearTimeout(timer);
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
      setTimeout(onClose, 500);
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setAlertType("error");
      resetForm();
    }
  };

  /* -------------------- GOOGLE LOGIN HANDLER  -------------------- */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:3000/authentication/google-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tokenId: credentialResponse.credential }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Refresh user context state to update navbar immediately
      await refreshUser();

      setAlertMessage("Login successful");
      setAlertType("success");
      setTimeout(onClose, 500);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertType("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-md z-50 ${
            alertType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
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

          <button
            type="submit"
            className="w-full bg-[#023545] text-white py-2 rounded-xl hover:opacity-90"
          >
            Login
          </button>

          <div className="flex items-center gap-4 my-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-600">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="w-full max-w-[500px]">
            <div className="bg-[#023545] rounded-full overflow-hidden p-[2px]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setAlertMessage("Google Sign-In failed.");
                  setAlertType("error");
                }}
                useOneTap
                shape="pill"
                theme="outline"
                width="100%"
              />
            </div>
          </div>

          <div className="text-sm text-center mt-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-[#023545] font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <button
            onClick={onRegister}
            className="text-[#023545] font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
