import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaLock, FaSpinner } from "react-icons/fa";
import AuthForm from "../components/auth/AuthForm";
import { Link } from "react-router-dom";

function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  const handleSubmit = async (email, password) => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful!", { position: "top-right" });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <motion.div
        className="z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl relative"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <Link
          to="/"
          className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors shadow-md"
        >
          Back
        </Link>

        <div className="text-center mb-4">
          <FaLock className="text-4xl text-yellow-300 mx-auto mb-2 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-white/70 mt-2 text-sm">
            Securely access your warranty dashboard
          </p>
        </div>

        <AuthForm
          onSubmit={handleSubmit}
          submitText={isLoading ? "Logging in..." : "Login"}
          showGoogleLogin={true}
          disabled={isLoading}
        />
      
        <p className="text-sm text-white/70 mt-4 text-center justify-between gap-5 flex flex-col">
        <span onClick={()=> navigate("/forgot-password")} className="text-yellow-300 hover:underline cursor-pointer">Forgot password</span>
        <span>
          New user?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-300 hover:underline cursor-pointer"
          >
            Create Account
          </span>
          </span>
        </p>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl"></div>
        )}
      </motion.div>
    </div>
  );
}

export default Login;