import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    try {
      await signup(email, password);
      toast.success('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h2>
      <AuthForm onSubmit={handleSubmit} submitText="Signup" />
    </div>
  );
}

export default Signup;