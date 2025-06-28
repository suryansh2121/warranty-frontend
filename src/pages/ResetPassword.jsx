import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/auth/reset-password/${token}`, { password });
      toast.success("Password reset successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return(

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white p-4">
        <form onSubmit={handleReset}
        className="w-full max-w-md bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-md border border-white/20" 
        >
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <p className="mb-6 text-white/70 text-sm">Enter your new password.</p>
            <input type="password"
            required
            placeholder="New password"
            className="w-full p-3 rounded-lg bg-white/20 text-white mb-4 placeholder-white/60"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg transition">
                Reset Password
            </button>
        </form>
      </div>
  )
}

export default ResetPassword;
