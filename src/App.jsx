import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateWarranty from "./pages/CreateWarranty";
import EditWarranty from "./pages/EditWarranty";
import Welcome from "./pages/Welcome";
import Spinner from "./components/Spinner";
import WarrantyDetails from "./pages/WarrantyDetails";


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateWarranty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditWarranty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/warranty/:id"
              element={
                <ProtectedRoute>
                  <WarrantyDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Welcome />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
