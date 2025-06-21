import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

import { useAuth } from "../../context/AuthContext";






const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
  });

function AuthForm({
  onSubmit,
  submitText,
  showGoogleLogin = false,
  disabled = false,
}) {
  const {loginGoogle} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      loginSchema.parse({ email, password });
      const res = await onSubmit(email, password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        toast.success("Login successful!", { position: "top-right" });
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error(err.response?.data?.message || "Login failed", {
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

 const handleGoogleSuccess = async (credentialResponse) => {
  setLoading(true);
  await loginGoogle(credentialResponse.credential);
  setLoading(false);
};

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 w-full max-w-md mx-auto space-y-4 text-white relative overflow-hidden"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {" "}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaSpinner className="text-3xl text-yellow-400 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <label className="block mb-2 font-semibold text-white/90">Email</label>
        <motion.div variants={inputVariants} whileFocus="focus">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-lg bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
            disabled={loading || disabled}
            required
          />
        </motion.div>
        {errors.email && (
          <p className="text-red-400 text-sm mt-1 animate-pulse">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2 font-semibold text-white/90">
          Password
        </label>
        <div className="relative">
          <motion.div variants={inputVariants} whileFocus="focus">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg bg-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              disabled={loading || disabled}
              required
            />
          </motion.div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            disabled={loading || disabled}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mt-1 animate-pulse">
            {errors.password}
          </p>
        )}
      </div>
      <motion.button
        type="submit"
        className={`w-full py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center space-x-2 ${
          loading || disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading || disabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading && <FaSpinner className="animate-spin" />}
        <span>{loading ? "Submitting..." : submitText}</span>
      </motion.button>
      {showGoogleLogin && (
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() =>
              toast.error("Google login failed", { position: "top-right" })
            }
            disabled={loading || disabled}
            theme="filled_blue"
            size="large"
            text="continue_with"
          />
        </motion.div>
      )}
    </motion.form>
  );
}

export default AuthForm;
