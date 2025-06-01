import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-xl font-bold">
          Warranty Reminder
        </Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link
                to="/create"
                className="text-white hover:text-blue-200 transition font-medium"
              >
                Add Warranty
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-200 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-blue-200 transition font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
