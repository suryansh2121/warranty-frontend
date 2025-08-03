import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  login as loginAPI,
  signup as signupAPI,
  loginWithGoogle as loginWithGoogleAPI,
} from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error("Auth check failed:", err);
          localStorage.removeItem("token");
          toast.error("Session expired, please log in again", {
            position: "top-right",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginAPI(email, password);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      return user; // Return user for Login component
    } catch (err) {
      throw err; // Let caller handle error
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await signupAPI(email, password);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Signup successful!", { position: "top-right" });
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error(err.response?.data?.message || "Signup failed", {
        position: "top-right",
      });
      throw err;
    }
  };

  const loginGoogle = async (googleToken) => {
    try {
      const res = await loginWithGoogleAPI(googleToken);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      // Navigation handled by caller (AuthForm)
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error(err.response?.data?.message || "Google login failed", {
        position: "top-right",
      });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        loginGoogle,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);