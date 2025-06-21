import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Spinner from "../components/Spinner";
import WarrantyCard from "../components/warranty/WarrantyCard";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import {
  FaRegClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [warrantyToDelete, setWarrantyToDelete] = useState(null);

  const summary = [
    {
      title: "Active Warranties",
      count: 12,
      icon: <FaCheckCircle className="text-green-400 text-3xl" />,
      bg: "bg-green-100/10 border-green-300/30",
    },
    {
      title: "Expired",
      count: 5,
      icon: <FaExclamationCircle className="text-red-400 text-3xl" />,
      bg: "bg-red-100/10 border-red-300/30",
    },
    {
      title: "Upcoming Expiry",
      count: 3,
      icon: <FaRegClock className="text-yellow-400 text-3xl" />,
      bg: "bg-yellow-100/10 border-yellow-300/30",
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
      toast.error("Failed to fetch warranties", err.massage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/warranty/search?q=${search}`);
      setWarranties(response.data);
    } catch (err) {
      toast.error("Search failed",err.massage);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortBy(key);
    setWarranties((prev) =>
      [...prev].sort((a, b) => {
        if (key === "expiry") {
          return new Date(a.warrantyExpiryDate) - new Date(b.warrantyExpiryDate);
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
      toast.error("Failed to delete warranty", err.massage);
    } finally {
      setLoading(false);
      setShowModal(false);
      setWarrantyToDelete(null);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.2 },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        out_mode: "out",
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-800 text-white overflow-hidden p-4 sm:p-6">
      <Particles
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-2xl max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold">Welcome back, Suryansh 👋</h1>
          <p className="text-white/70 mt-1">Here’s what’s happening with your warranties.</p>
        </motion.div>

     
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-10">
          {summary.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-xl border shadow-lg ${item.bg}`}
            >
              <div className="flex items-center gap-4">
                <div>{item.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-3xl font-bold mt-1">{item.count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

    
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex-grow mb-4 sm:mb-0">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product or serial number"
              className="w-full p-3 bg-white/80 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-3 rounded-lg transition shadow"
          >
            Search
          </button>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="p-3 bg-white/80 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By</option>
            <option value="productName">Product Name</option>
            <option value="expiry">Expiry Date</option>
          </select>
        </div>

        
        {loading && <Spinner />}
        {!loading && warranties.length === 0 && (
          <p className="text-white/70">No warranties found. Add one to get started!</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {warranties.map((warranty) => (
            <WarrantyCard
              key={warranty._id}
              warranty={warranty}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      </div>

   
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-gray-800">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this warranty? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
