// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        // Check if user data exists in localStorage
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (userId && token) {
          // For now, we'll just use localStorage data as our user
          // In a real app, you'd verify this with your backend
          setCurrentUser({
            userId,
            token,
            name: "DAV Admin",
            email: "admin@davsss.edu.in",
            role: "admin",
          });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  // Login function - simplified for now
  const login = async (email, password) => {
    try {
      setLoading(true);

      // Simple credential check (obviously not secure, just for demo)
      if (email === "admin@davsss.edu.in" && password === "admin") {
        const mockUserId = "admin-user-id";
        const mockToken = "mock-token-" + Date.now();

        localStorage.setItem("userId", mockUserId);
        localStorage.setItem("token", mockToken);

        setCurrentUser({
          userId: mockUserId,
          token: mockToken,
          name: "DAV Admin",
          email: email,
          role: "admin",
        });

        return { success: true };
      } else {
        throw new Error("Invalid email or password");
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
