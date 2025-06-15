import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import Spinner from '../components/Spinner';
import WarrantyCard from '../components/warranty/WarrantyCard';

function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [warrantyToDelete, setWarrantyToDelete] = useState(null);

  useEffect(() => {
    fetchWarranties();
  }, []);

  const fetchWarranties = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/warranty');
      setWarranties(response.data);
    } catch (err) {
      toast.error('Failed to fetch warranties',err);
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
      toast.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortBy(key);
    setWarranties((prev) =>
      [...prev].sort((a, b) => {
        if (key === 'expiry') {
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
      setWarranties(warranties.filter((warranty) => warranty._id !== warrantyToDelete));
      toast.success('Warranty deleted successfully');
    } catch (err) {
      toast.error('Failed to delete warranty', err);
    } finally {
      setLoading(false);
      setShowModal(false);
      setWarrantyToDelete(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Warranty Dashboard</h2>

      {/* Search and Sort */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div className="flex-grow mb-4 sm:mb-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or serial number"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort By</option>
          <option value="productName">Product Name</option>
          <option value="expiry">Expiry Date</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && <Spinner />}

      {/* Warranty List */}
      {!loading && warranties.length === 0 && (
        <p className="text-gray-600">No warranties found. Add a new warranty to get started!</p>
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

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this warranty? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
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