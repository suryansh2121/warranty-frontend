import { useState } from 'react';
import Spinner from '../Spinner';

function WarrantyForm({ initialData = {}, onSubmit, loading, submitText }) {
  const [formData, setFormData] = useState({
    productName: initialData.productName || '',
    brandAndModel: initialData.brandAndModel || '',
    serialNumber: initialData.serialNumber || '',
    purchaseDate: initialData.purchaseDate ? initialData.purchaseDate.split('T')[0] : '',
    invoiceNumber: initialData.invoiceNumber || '',
    warrantyDuration: initialData.warrantyDuration || '',
    userEmail: initialData.userEmail || '',
    supportContactInfo: initialData.supportContactInfo || { phone: '', email: '', website: '' },
    notes: initialData.notes || '',
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
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'supportContactInfo') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });
    if (file) {
      data.append('warrantyDocument', file);
    }
    onSubmit(data);
  };

  return (
    <div className="container mx-auto p-6">
      {loading && <Spinner />}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Brand and Model</label>
          <input
            type="text"
            name="brandAndModel"
            value={formData.brandAndModel}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Warranty Duration (months)</label>
          <input
            type="number"
            name="warrantyDuration"
            value={formData.warrantyDuration}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Support Contact - Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.supportContactInfo.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Support Contact - Email</label>
          <input
            type="email"
            name="email"
            value={formData.supportContactInfo.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Support Contact - Website</label>
          <input
            type="url"
            name="website"
            value={formData.supportContactInfo.website}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Warranty Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg shadow-sm"
            accept="application/pdf,image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : submitText}
        </button>
      </form>
    </div>
  );
}

export default WarrantyForm;