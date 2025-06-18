import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AuthForm({ onSubmit, submitText, showGoogleLogin = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await onSubmit(email, password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed",err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
  setLoading(true);
  try {
    console.log("Google Login Success: Starting backend request");
    const response = await api.post("/api/auth/google", {
      token: credentialResponse.credential,
    });
    console.log("Backend Response:", response.data);
    localStorage.setItem("token", response.data.token);
    console.log("Token stored, navigating to /dashboard");
    navigate("/dashboard");
  } catch (err) {
    console.error("Google login failed:", err);
    alert("Google login failed: " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : submitText}
        </button>
      </form>

      {showGoogleLogin && (
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google login failed")}
          />
        </div>
      )}
    </div>
  );
}

export default AuthForm;
