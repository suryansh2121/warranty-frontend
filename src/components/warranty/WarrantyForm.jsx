import { motion } from "framer-motion";
import React, { useState } from "react";
import Spinner from "../Spinner";
import {
  FaBox,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaFileInvoice,
  FaFileUpload,
  FaGlobe,
  FaPhone,
  FaStickyNote,
  FaTag,
} from "react-icons/fa";

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

function WarrantyForm({ initialData = {}, onSubmit, loading, submitText }) {
  const [formData, setFormData] = useState({
    productName: initialData.productName || "",
    brandAndModel: initialData.brandAndModel || "",
    serialNumber: initialData.serialNumber || "",
    purchaseDate: initialData.purchaseDate
      ? initialData.purchaseDate.split("T")[0]
      : "",
    invoiceNumber: initialData.invoiceNumber || "",
    userEmail: initialData.userEmail || "",
    warrantyDuration: initialData.warrantyDuration || "",
    supportContactInfo: initialData.supportContactInfo || {
      phone: "",
      email: "",
      website: "",
    },
    
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.supportContactInfo) {
      setFormData({
        ...formData,
        supportContactInfo: { ...formData.supportContactInfo, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "supportContactInfo") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });
    if (file) {
      data.append("warrantyDocument", file);
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {loading && <Spinner />}
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Product Name
        </label>
        <div className="relative">
          <FaBox className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., Smart TV"
            required
            aria-level="Product Name"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Brand and Model
        </label>
        <div className="relative">
          <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="text"
            name="brandAndModel"
            value={formData.brandAndModel}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., Samsung QLED Q80A"
            required
            aria-label="Brand and Model"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Serial Number
        </label>
        <div className="relative">
          <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., SN123456789"
            required
            aria-label="Serial Number"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Purchase Date
        </label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            required
            aria-label="Purchase Date"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Invoice Number
        </label>
        <div className="relative">
          <FaFileInvoice className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., INV-2023-456"
            required
            aria-label="Invoice Number"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Warranty Duration (months)
        </label>
        <div className="relative">
          <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="number"
            name="warrantyDuration"
            value={formData.warrantyDuration}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., 12"
            required
            aria-label="Warranty Duration"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          User Email
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., user@example.com"
            required
            aria-label="User Email"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Support Contact - Phone
        </label>
        <div className="relative">
          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="text"
            name="phone"
            value={formData.supportContactInfo.phone}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., +1-800-123-4567"
            aria-label="Support Contact Phone"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Support Contact - Email
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="email"
            name="email"
            value={formData.supportContactInfo.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., support@brand.com"
            aria-label="Support Contact Email"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Support Contact - Website
        </label>
        <div className="relative">
          <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="url"
            name="website"
            value={formData.supportContactInfo.website}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/50 transition-all hover:bg-white/15"
            placeholder="e.g., https://brand.com/support"
            aria-label="Support Contact Website"
          />
        </div>
      </motion.div>
      
      <motion.div variants={fieldVariants}>
        <label className="block mb-1 font-medium text-white/80">
          Warranty Document
        </label>
        <div className="relative">
          <FaFileUpload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-300" />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-full border border-white/20 file:bg-yellow-400 file:text-gray-900 file:border-none file:rounded-full file:px-4 file:py-2 file:font-semibold hover:bg-white/15 transition-all"
            accept="application/pdf,image/*"
            aria-label="Warranty Document Upload"
          />
        </div>
      </motion.div>
      <motion.div variants={fieldVariants}>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Submitting..." : submitText}
        </button>
      </motion.div>
    </form>
  );
}

export default WarrantyForm;
