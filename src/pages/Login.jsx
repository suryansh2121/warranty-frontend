import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <AuthForm onSubmit={handleSubmit} submitText="Login" showGoogleLogin={true} />
    </div>
  );
}

export default Login;