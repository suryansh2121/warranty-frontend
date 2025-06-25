import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { useAuth } from "../context/AuthContext";


const Welcome = () => {
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 text-white flex justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 transform -translate-x-1/3 -translate-y-1/3 z-0">
        <svg width="500" height="500" viewBox="0 0 200 200" fill="none">
          <path
            fill="#ffffff"
            fillOpacity="0.15"
            d="M44.7,-74.5C58.8,-67.5,71.4,-56.8,78.2,-43.2C85,-29.6,86,-14.8,84.4,0.2C82.7,15.2,78.5,30.4,70.2,43.8C61.9,57.2,49.5,68.8,36.1,75.1C22.7,81.4,8.3,82.5,-6.3,81.2C-20.9,79.9,-35.7,76.2,-48.4,68.1C-61.1,60,-71.7,47.5,-76.6,33.4C-81.5,19.3,-80.7,3.5,-77.8,-12.3C-74.9,-28.1,-69.9,-43.9,-60.2,-57.5C-50.5,-71.1,-36.2,-82.5,-20.9,-84.9C-5.6,-87.3,10.8,-80.7,25.6,-75.2C40.4,-69.7,53.5,-65.4,44.7,-74.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.02}
        transitionSpeed={2000}
        className="z-[10]"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 md:p-12 max-w-4xl text-center shadow-2xl border border-white/20"
        >
          <motion.div
            variants={childVariants}
            className="flex justify-center mb-6"
            whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
          >
            <FaTools className="text-7xl text-yellow-300 drop-shadow-2xl" />
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-5xl sm:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-red-400 drop-shadow-lg"
          >
            Welcome to Warranty Pro
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-lg sm:text-2xl mb-8 text-white/85 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Discover the ultimate solution to manage and track your product
            warranties with unparalleled ease and style.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-indigo-900 font-semibold rounded-full shadow-lg hover:shadow-indigo-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Sign Up
            </Link>
          </motion.div>

          <motion.p
            variants={childVariants}
            className="mt-6 text-sm text-white/70"
          >
            Trusted by over 10,000 users to simplify warranty management!
          </motion.p>
        </motion.div>
      </Tilt>
    </div>
  );
};

export default Welcome;
