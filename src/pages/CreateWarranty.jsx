import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import WarrantyForm from "../components/warranty/WarrantyForm";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaPlusCircle, FaArrowLeft } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, staggerChildren: 0.2, ease: "easeOut" },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CreateWarranty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/api/warranty/create", data);
      toast.success("Warranty created successfully!");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create warranty";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <div className="absolute inset-0  opacity-15 z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full filter blur-3xl animate-pulse-slow" />

      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 opacity-20 z-0">
        <svg width="300" height="300" viewBox="0 0 200 200" fill="none">
          <path
            fill="#ffffff"
            fillOpacity="0.4"
            d="M44.7,-74.5C58.8,-67.5,71.4,-56.8,78.2,-43.2C85,-29.6,86,-14.8,84.4,0.2C82.7,15.2,78.5,30.4,70.2,43.8C61.9,57.2,49.5,68.8,36.1,75.1C22.7,81.4,8.3,82.5,-6.3,81.2C-20.9,79.9,-35.7,76.2,-48.4,68.1C-61.1,60,-71.7,47.5,-76.6,33.4C-81.5,19.3,-80.7,3.5,-77.8,-12.3C-74.9,-28.1,-69.9,-43.9,-60.2,-57.5C-50.5,-71.1,-36.2,-82.5,-20.9,-84.9C-5.6,-87.3,10.8,-80.7,25.6,-75.2C40.4,-69.7,53.5,-65.4,44.7,-74.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        scale={1.01}
        perspective={800}
        glareEnable={false}
        className="w-full max-w-3xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full bg-white/5 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-2xl p-8 sm:p-14"
        >
          <motion.button
            variants={childVariants}
            onClick={() => navigate("/dashboard")}
            className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-yellow-300 transition z-20"
            aria-label="Back to Dashboard"
          >
            <FaArrowLeft className="text-xl" />{" "}
            <span className="text-base font-medium">Back</span>
          </motion.button>

          <motion.div
            variants={childVariants}
            className="flex justify-center mb-6"
            whileHover={{ rotate: 180, transition: { duration: 0.5 } }}
          >
            <FaPlusCircle className="text-5xl text-yellow-300 drop-shadow-lg" />
          </motion.div>

          <motion.h2
            variants={childVariants}
            className="text-3xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-300 to-red-300 mb-6"
          >
            Add New Warranty
          </motion.h2>

          <motion.p
            variants={childVariants}
            className="text-center text-white/70 mb-8 text-lg"
          >
            Securely register your product warranty with ease.
          </motion.p>

          <motion.div variants={childVariants}>
            <WarrantyForm
              onSubmit={handleSubmit}
              submitText="Create Warranty"
              loading={loading}
            />
          </motion.div>
        </motion.div>
      </Tilt>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white">
            <h3 className="text-xl font-semibold mb-4">Error</h3>
            <p className="mb-6 text-white/80">{error}</p>
            <button
              onClick={() => setError(null)}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold rounded-full shadow-lg hover:shadow-red-500/50 transition-all duration-300"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CreateWarranty;
