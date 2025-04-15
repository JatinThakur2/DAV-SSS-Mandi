// src/contexts/AdminAuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { useConvexAvailable } from "../utils/ConvexClientProvider";

const AdminAuthContext = createContext();

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const isConvexAvailable = useConvexAvailable();

  // Always define hooks at the top level, with no conditions
  const loginMutation = useMutation(api.auth.login);
  const logoutMutation = useMutation(api.auth.logout);
  const signupMutation = useMutation(api.auth.signup);

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  // Use the token for the query only if we have a token
  const userData = useQuery(api.auth.getMe, token ? { token } : "skip");

  useEffect(() => {
    if (!isConvexAvailable) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (userData && userData !== "skip") {
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
  }, [userData, token, isConvexAvailable]);

  // Login function
  const handleLogin = async (email, password) => {
    if (!isConvexAvailable) {
      setError(
        "Backend service is currently unavailable. Please try again later."
      );
      throw new Error("Backend service is currently unavailable");
    }

    try {
      setError(null);
      const result = await loginMutation({ email, password });
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
    if (!isConvexAvailable) {
      setError(
        "Backend service is currently unavailable. Please try again later."
      );
      throw new Error("Backend service is currently unavailable");
    }

    try {
      setError(null);
      const result = await signupMutation({ name, email, password });
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
      if (token && isConvexAvailable) {
        await logoutMutation({ token });
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
    isConvexAvailable,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
