// Update imports in routes/index.jsx
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Lazy load pages to improve initial load performance
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AdmissionPage = lazy(() => import("../pages/AdmissionPage"));
const StaffPage = lazy(() => import("../pages/StaffPage"));
const StudentZonePage = lazy(() => import("../pages/StudentZonePage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const AdminLoginPage = lazy(() => import("../pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("../components/admin/AdminDashboard"));

// Nested route components
const AboutDAV = lazy(() => import("../components/about/AboutDAV"));
const VisionMission = lazy(() => import("../components/about/VisionMission"));
const Facilities = lazy(() => import("../components/about/Facilities"));
const TeachingStaff = lazy(() => import("../components/staff/TeachingStaff"));
const NonTeachingStaff = lazy(
  () => import("../components/staff/NonTeachingStaff")
);
const AdmissionRules = lazy(
  () => import("../components/admission/AdmissionRules")
);
const FeeStructure = lazy(() => import("../components/admission/FeeStructure"));
const Scholarship = lazy(() => import("../components/student/Scholarship"));
const Results = lazy(() => import("../components/student/Results"));

// Admin Components
const AdminNews = lazy(() => import("../components/admin/AdminNews"));
const AdminNotices = lazy(() => import("../components/admin/AdminNotices"));
const AdminStaff = lazy(() => import("../components/admin/AdminStaff")); // Update this line
const AdminFeeStructure = lazy(
  () => import("../components/admin/AdminFeeStructure")
);
const AdminScholarship = lazy(
  () => import("../components/admin/AdminScholarship")
);
const AdminResults = lazy(() => import("../components/admin/AdminResults"));
const AdminGallery = lazy(() => import("../components/admin/AdminGallery"));

// 404 Not Found Page Component
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    children: [
      {
        path: "",
        element: <AboutDAV />, // Default child route
      },
      {
        path: "about-dav", // This matches the Navbar item "About DAV Mandi"
        element: <AboutDAV />,
      },
      {
        path: "vision-mission",
        element: <VisionMission />,
      },
      {
        path: "facilities",
        element: <Facilities />,
      },
    ],
  },
  {
    path: "/administration",
    element: <StaffPage />,
    children: [
      {
        path: "", // Default child route
        element: <TeachingStaff />,
      },
      {
        path: "teaching-staff",
        element: <TeachingStaff />,
      },
      {
        path: "non-teaching-staff",
        element: <NonTeachingStaff />,
      },
    ],
  },
  {
    path: "/admission",
    element: <AdmissionPage />,
    children: [
      {
        path: "", // Default child route
        element: <AdmissionRules />,
      },
      {
        path: "rules",
        element: <AdmissionRules />,
      },
      {
        path: "fee-structure",
        element: <FeeStructure />,
      },
    ],
  },
  {
    path: "/student-zone",
    element: <StudentZonePage />,
    children: [
      {
        path: "", // Default child route
        element: <Scholarship />,
      },
      {
        path: "scholarship",
        element: <Scholarship />,
      },
      {
        path: "results",
        element: <Results />,
      },
    ],
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },

  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    // The actual content is rendered inside the dashboard based on selected section
  },

  // 404 Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
