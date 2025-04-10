// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "../convex/_generated/react";

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Convex mutations and queries
  const loginMutation = useMutation("auth:login");
  const getCurrentUser = useQuery("auth:getCurrentUser", {
    userId: localStorage.getItem("userId") || undefined,
  });

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        // If we have user data from Convex
        if (getCurrentUser) {
          setCurrentUser(getCurrentUser);
        } else {
          setCurrentUser(null);
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInStatus();
  }, [getCurrentUser]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      // Call Convex login mutation
      const response = await loginMutation({ email, password });

      // If login successful, store user info
      if (response) {
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("token", response.token);
        setCurrentUser(response);
        return response;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/admin/login");
  };

  // Context value
  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
