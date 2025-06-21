import {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
        .get("api/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
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
      navigate("/dashboard");
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await signupAPI(email, password);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      console.log("signup failed", err);
    }
  };
  const loginGoogle = async (googleToken) => {
    try {
      const res = await loginWithGoogleAPI(googleToken);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      console.log(" There is some issue occurs", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTimeout(() =>navigate("/login"), 0);
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
