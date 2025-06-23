import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaLock, FaSpinner } from "react-icons/fa";
import AuthForm from "../components/auth/AuthForm";

function Signup() {
  const { signup, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSubmit = async (email, password) => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password);
      toast.success("Signup successful!", { position: "top-right" });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed", {
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
        className="z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-4">
          <FaLock className="text-4xl text-yellow-300 mx-auto mb-2 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white">Welcome </h2>
          <p className="text-white/70 mt-2 text-sm">
            Securely access your warranty dashboard
          </p>
        </div>

        <AuthForm
          onSubmit={handleSubmit}
          submitText={isLoading ? "Creating account..." : "Sign up"}
          showGoogleLogin={true}
          disabled={isLoading}
        />
        <p className="text-sm text-white/70 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-300 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl z-20">
            <FaSpinner className="animate-spin text-white text-3xl" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Signup;
