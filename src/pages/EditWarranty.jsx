import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import WarrantyForm from '../components/warranty/WarrantyForm';

function EditWarranty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const response = await api.get(`/api/warranty/${id}`);
        setInitialData(response.data);
      } catch (err) {
        toast.error('Failed to fetch warranty',err);
      }
    };
    fetchWarranty();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await api.put(`/api/warranty/${id}`, data);
      toast.success('Warranty updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update warranty');
    }
  };

  if (!initialData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Warranty</h2>
      <WarrantyForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitText="Update Warranty"
      />
    </div>
  );
}

export default EditWarranty;