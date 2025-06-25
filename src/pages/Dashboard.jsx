import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Spinner from "../components/Spinner";
import WarrantyCard from "../components/warranty/WarrantyCard";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import {
  FaRegClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaPlus,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.8 },
  },
};

function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [warrantyToDelete, setWarrantyToDelete] = useState(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const expired = warranties.filter(
    (w) => new Date(w.warrantyExpiryDate) < new Date()
  ).length;
  const upcoming = warranties.filter((w) => {
    const expiry = new Date(w.warrantyExpiryDate);
    const now = new Date();
    const in7Days = new Date();
    in7Days.setDate(now.getDate() + 7);
    return expiry >= now && expiry <= in7Days;
  }).length;
  const active = warranties.length - expired;

  const summary = [
    {
      title: "Active Warranties",
      count: active,
      icon: (
        <FaCheckCircle className="text-green-400 text-4xl drop-shadow-lg" />
      ),
      bg: "bg-green-500/10 border-green-400/20 hover:bg-green-500/20",
    },
    {
      title: "Expired",
      count: expired,
      icon: (
        <FaExclamationCircle className="text-red-400 text-4xl drop-shadow-lg" />
      ),
      bg: "bg-red-500/10 border-red-400/20 hover:bg-red-500/20",
    },
    {
      title: "Upcoming Expiry",
      count: upcoming,
      icon: <FaRegClock className="text-yellow-400 text-4xl drop-shadow-lg" />,
      bg: "bg-yellow-500/10 border-yellow-400/20 hover:bg-yellow-500/20",
    },
  ];

  useEffect(() => {
    fetchWarranties();
  }, []);

  const fetchWarranties = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/warranty");
      setWarranties(response.data);
    } catch (err) {
      toast.error("Failed to fetch warranties");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.error("Search query cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/api/warranty/search?q=${search}`);
      setWarranties(response.data);
    } catch (err) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortBy(key);
    setWarranties((prev) =>
      [...prev].sort((a, b) => {
        if (key === "expiry") {
          return (
            new Date(a.warrantyExpiryDate) - new Date(b.warrantyExpiryDate)
          );
        }
        return a[key].localeCompare(b[key]);
      })
    );
  };

  const handleDeleteClick = (id) => {
    setWarrantyToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/warranty/${warrantyToDelete}`);
      setWarranties((prev) => prev.filter((w) => w._id !== warrantyToDelete));
      toast.success("Warranty deleted successfully");
    } catch (err) {
      toast.error("Failed to delete warranty");
    } finally {
      setLoading(false);
      setShowModal(false);
      setWarrantyToDelete(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white overflow-hidden p-4 sm:p-8">
      <div className="absolute inset-0  opacity-10 z-0" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-center mb-8 relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
          Warranty Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-center">
          {user && (
            <>
              <Link
                to="/create"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 px-5 py-2.5 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Add new warranty"
              >
                <FaPlus /> Add Warranty
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 px-5 py-2.5 rounded-full shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Log out"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl max-w-7xl mx-auto"
      >
        <motion.div variants={cardVariants} className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-300">
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p className="text-white/60 mt-2 text-lg">
            Monitor and manage your warranties with ease.
          </p>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-12">
          {summary.map((item, i) => (
            <Tilt key={i} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
              <motion.div
                custom={i}
                variants={cardVariants}
                className={`p-6 rounded-xl border backdrop-blur-md ${item.bg} transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <div>{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-4xl font-bold mt-1 text-white">
                      {item.count}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        <motion.div
          variants={cardVariants}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0"
        >
          <div className="flex-grow mb-4 sm:mb-0 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product or serial number"
              className="w-full pl-10 pr-4 py-3 bg-white/10 text-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300"
          >
            Search
          </button>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="p-3 bg-white/10 text-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" className="bg-gray-800">
              Sort By
            </option>
            <option value="productName" className="bg-gray-800">
              Product Name
            </option>
            <option value="expiry" className="bg-gray-800">
              Expiry Date
            </option>
          </select>
        </motion.div>

        {loading && <Spinner />}
        {!loading && warranties.length === 0 && (
          <motion.p
            variants={cardVariants}
            className="text-white/60 text-center text-lg"
          >
            No warranties found. Add one to get started!
          </motion.p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {warranties.map((warranty, i) => (
            <Tilt
              key={warranty._id}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.03}
            >
              <motion.div
                custom={i}
                variants={cardVariants}
                className="transform transition-all duration-300"
              >
                <WarrantyCard
                  warranty={warranty}
                  onDelete={handleDeleteClick}
                />
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-white/80">
              Are you sure you want to delete this warranty? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
