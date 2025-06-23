import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import WarrantyForm from "../components/warranty/WarrantyForm";
import { motion } from "framer-motion";

function EditWarranty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const response = await api.get(`/api/warranty/${id}`);
        setInitialData(response.data);
        console.log(response.data)
      } catch (err) {
        toast.error("Failed to fetch warranty");
      } finally {
        setLoading(false);
      }
    };
    fetchWarranty();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await api.put(`/api/warranty/${id}`, data);
      toast.success("Warranty updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update warranty");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white">
        <div className="text-xl animate-pulse">Loading warranty details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-white flex items-center justify-center p-6 sm:p-12">
     
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 z-0" />

      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 mb-6"
        >
          Edit Warranty
        </motion.h2>

        <WarrantyForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitText="Update Warranty"
        />
      </motion.div>
    </div>
  );
}

export default EditWarranty;
