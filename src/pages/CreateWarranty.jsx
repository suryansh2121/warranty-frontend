import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import WarrantyForm from '../components/warranty/WarrantyForm';

function CreateWarranty() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await api.post('/api/warranty/create', data);
      toast.success('Warranty created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create warranty');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Warranty</h2>
      <WarrantyForm onSubmit={handleSubmit} submitText="Create Warranty" />
    </div>
  );
}

export default CreateWarranty;