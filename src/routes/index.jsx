// src/routes/index.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box, Alert } from "@mui/material";
import Loader from "../components/common/Loader";
import ErrorBoundary from "../components/common/ErrorBoundary";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import Houses from "../components/student/Houses";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../admin/ProtectedRoute";
import { useConvexAvailable } from "../utils/ConvexClientProvider";
import { AdminAuthProvider } from "../contexts/AdminAuthContext";
import { AuthProvider } from "../contexts/AuthContext";

// Lazy load pages to improve initial load performance
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const AdmissionPage = lazy(() => import("../pages/AdmissionPage"));
const StaffPage = lazy(() => import("../pages/StaffPage"));
const StudentZonePage = lazy(() => import("../pages/StudentZonePage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Admin Pages
const LoginPage = lazy(() => import("../pages/admin/LoginPage"));
const SignupPage = lazy(() => import("../pages/admin/SignupPage"));
const DashboardPage = lazy(() => import("../pages/admin/DashboardPage"));
const AdminNewsPage = lazy(() => import("../pages/admin/NewsPage"));
const AdminResultsPage = lazy(() => import("../pages/admin/ResultsPage"));
const AdminScholarshipsPage = lazy(
  () => import("../pages/admin/ScholarshipsPage")
);
const AdminGalleryPage = lazy(() => import("../pages/admin/GalleryPage"));
const TeachingStaffPage = lazy(
  () => import("../pages/admin/TeachingStaffPage")
);
const NonTeachingStaffPage = lazy(
  () => import("../pages/admin/NonTeachingStaffPage")
);
const HousesPage = lazy(() => import("../pages/admin/HousesPage"));

// Nested route components
const AboutDAV = lazy(() => import("../components/about/AboutDAV"));
const VisionMission = lazy(() => import("../components/about/VisionMission"));
const Facilities = lazy(() => import("../components/about/Facilities"));

const AdmissionRules = lazy(
  () => import("../components/admission/AdmissionRules")
);
const FeeStructure = lazy(() => import("../components/admission/FeeStructure"));
const Scholarship = lazy(() => import("../components/student/Scholarship"));
const Results = lazy(() => import("../components/student/Results"));

// Admin Routes Component
function AdminRoutes() {
  const isConvexAvailable = useConvexAvailable();

  if (!isConvexAvailable) {
    return (
      <Box sx={{ p: 4, maxWidth: "800px", mx: "auto", mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Admin panel is currently unavailable. Please check your connection to
          the backend service.
        </Alert>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Navigate to="/" replace />
        </Box>
      </Box>
    );
  }

  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="news" element={<AdminNewsPage />} />
            <Route path="results" element={<AdminResultsPage />} />
            <Route path="scholarships" element={<AdminScholarshipsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="houses" element={<HousesPage />} />
            <Route path="teaching-staff" element={<TeachingStaffPage />} />
            <Route
              path="non-teaching-staff"
              element={<NonTeachingStaffPage />}
            />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

// Public Routes Component
function PublicRoutes() {
  return (
    <AuthProvider>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />}>
            <Route index element={<AboutDAV />} />
            <Route path="about-dav" element={<AboutDAV />} />
            <Route path="vision-mission" element={<VisionMission />} />
            <Route path="facilities" element={<Facilities />} />
          </Route>
          <Route path="/admission" element={<AdmissionPage />}>
            <Route index element={<AdmissionRules />} />
            <Route path="rules" element={<AdmissionRules />} />
            <Route path="fee-structure" element={<FeeStructure />} />
          </Route>

          <Route path="/student-zone" element={<StudentZonePage />}>
            <Route index element={<Scholarship />} />
            <Route path="scholarship" element={<Scholarship />} />
            <Route path="results" element={<Results />} />
            <Route path="houses" element={<Houses />} />
          </Route>

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </AuthProvider>
  );
}

// Main Routes Component
export function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          {isAdminRoute ? (
            <Box sx={{ flex: 1 }}>
              <AdminRoutes />
            </Box>
          ) : (
            <PublicRoutes />
          )}
        </ErrorBoundary>
      </Suspense>
    </Box>
  );
}
