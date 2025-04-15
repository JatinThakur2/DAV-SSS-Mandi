// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const login = useMutation(api.auth.login);
  const logout = useMutation(api.auth.logout);
  const signup = useMutation(api.auth.signup);

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  // Get user data if token exists
  const userData = useQuery(api.auth.getMe, token ? { token } : null);

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
    } else if (userData === null && token) {
      // Token is invalid or expired
      localStorage.removeItem("authToken");
      setUser(null);
      setLoading(false);
    } else if (!token) {
      setUser(null);
      setLoading(false);
    }
  }, [userData, token]);

  // Login function
  const handleLogin = async (email, password) => {
    try {
      setError(null);
      const result = await login({ email, password });
      localStorage.setItem("authToken", result.token);
      setUser({
        userId: result.userId,
        name: result.name,
        role: result.role,
      });
      navigate("/admin/dashboard");
      return result;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    }
  };

  // Signup function
  const handleSignup = async (name, email, password) => {
    try {
      setError(null);
      const result = await signup({ name, email, password });
      localStorage.setItem("authToken", result.token);
      setUser({
        userId: result.userId,
      });
      navigate("/admin/dashboard");
      return result;
    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await logout({ token });
      }
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const value = {
    user,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
    error,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
