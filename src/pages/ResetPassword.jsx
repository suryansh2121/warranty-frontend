import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const disabled = password.length < 6;

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/api/auth/reset-password/${token}`, { password });
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white p-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-md border border-white/20"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <p className="mb-6 text-white/70 text-sm">Enter your new password.</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-lg bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300`}
            placeholder="Enter your password"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            disabled={loading}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition"
          disabled={loading || disabled}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
