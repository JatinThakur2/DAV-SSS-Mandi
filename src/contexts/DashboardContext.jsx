// src/contexts/DashboardContext.jsx
import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export function DashboardProvider({ children }) {
  // Dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 1042,
    teachingStaff: 25,
    newsNotices: 12,
    galleryItems: 84,
  });

  // Activities data
  const [recentActivities, setRecentActivities] = useState([]);

  // Use this to track the recent activities
  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      user: "Admin",
      date: formatCurrentTime(),
      ...activity,
    };

    setRecentActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
  };

  const formatCurrentTime = () => {
    const now = new Date();
    return `Today, ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
  };

  // Update dashboard stats
  const updateStats = (newStats) => {
    setDashboardStats((prev) => ({ ...prev, ...newStats }));
  };

  const value = {
    dashboardStats,
    recentActivities,
    addActivity,
    updateStats,
    convexData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
