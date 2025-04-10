// src/contexts/DashboardContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

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

  // Mock data for Convex
  const convexData = {
    teachingStaff: [
      {
        id: 1,
        name: "SANGEETA KAPOOR",
        designation: "Principal",
        qualification: "MA Eng B.Ed",
        experience: "28 years",
        subject: "English",
      },
      {
        id: 2,
        name: "JAGDISH KUMAR",
        designation: "Vice Principal",
        qualification: "M.Sc Physics M.Ed",
        experience: "23 years",
        subject: "Physics",
      },
    ],
    nonTeachingStaff: [
      {
        id: 1,
        name: "DEVRAJ",
        designation: "Office Incharge",
        qualification: "Higher Secondary",
        experience: "30 years",
      },
      {
        id: 2,
        name: "MAHENDER RANA",
        designation: "Office Assistant",
        qualification: "Higher Secondary",
        experience: "13 years",
      },
    ],
    news: [
      {
        id: 1,
        title: "Annual Sports Day 2024",
        date: Date.now(),
        content: "Join us for the Annual Sports Day events!",
      },
      {
        id: 2,
        title: "School Annual Day Celebrations",
        date: Date.now() - 86400000,
        content: "School Annual Day will be celebrated with great enthusiasm.",
      },
    ],
    notices: [
      {
        id: 1,
        title: "Parent-Teacher Meeting",
        date: Date.now(),
        content: "PTM scheduled for next week.",
      },
      {
        id: 2,
        title: "Scholarship Announcement",
        date: Date.now() - 172800000,
        content: "New scholarships available for students.",
      },
    ],
    galleryEvents: [
      {
        id: 1,
        title: "Independence Day Celebration",
        date: Date.now() - 86400000 * 15,
      },
      { id: 2, title: "Science Exhibition", date: Date.now() - 86400000 * 30 },
    ],
    scholarships: [
      { id: 1, name: "Merit Scholarship", type: "private" },
      { id: 2, name: "Government Scholarship", type: "government" },
    ],
    feeStructure: [],
  };

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
