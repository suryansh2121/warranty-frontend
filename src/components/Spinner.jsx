import { motion } from "framer-motion";

const Spinner = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const ringSpin = (direction = 1, duration = 1.5) => ({
    rotate: direction * 360,
    transition: {
      repeat: Infinity,
      duration,
      ease: "linear",
    },
  });

  const textVariants = {
    pulse: {
      opacity: [0.7, 1, 0.7],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      <div className="absolute inset-0  opacity-[0.07]" />

      <div className="absolute w-[250px] h-[250px] bg-yellow-300/20 rounded-full blur-3xl animate-ping -top-20 -left-20" />
      <div className="absolute w-[200px] h-[200px] bg-pink-400/20 rounded-full blur-3xl animate-ping-slow bottom-10 right-10" />

      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-[2px] h-[2px] bg-white/20 rounded-full animate-[floatUp_6s_linear_infinite]`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white/5 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl flex flex-col items-center border border-white/10"
      >
        <div className="relative w-24 h-24">
          <motion.div
            animate={ringSpin(1, 1.5)}
            className="absolute inset-0 border-4 border-yellow-300/30 border-t-yellow-300 rounded-full"
          />

          <motion.div
            animate={ringSpin(-1, 2)}
            className="absolute inset-2 border-2 border-pink-500/30 border-t-pink-400 rounded-full"
          />
        </div>

        <motion.p
          variants={textVariants}
          animate="pulse"
          className="mt-6 text-white text-lg font-medium tracking-widest bg-gradient-to-r from-yellow-100 via-pink-200 to-purple-200 bg-clip-text text-transparent"
        >
          Loading stay calm...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Spinner;
