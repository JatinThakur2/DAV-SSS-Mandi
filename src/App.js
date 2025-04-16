import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Alert } from "@mui/material";

// Import custom theme
import theme from "./themes/theme";

// Import common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import Loader from "./components/common/Loader";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Houses from "./components/student/Houses";

// Import Auth Providers
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import {
  ConvexClientProvider,
  useConvexAvailable,
} from "./utils/ConvexClientProvider";

// Import admin components
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";

// Import pages with lazy loading
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const AdmissionPage = React.lazy(() => import("./pages/AdmissionPage"));
const StaffPage = React.lazy(() => import("./pages/StaffPage"));
const StudentZonePage = React.lazy(() => import("./pages/StudentZonePage"));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

// Admin Pages
const LoginPage = React.lazy(() => import("./pages/admin/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/admin/SignupPage"));
const DashboardPage = React.lazy(() => import("./pages/admin/DashboardPage"));
const AdminNewsPage = React.lazy(() => import("./pages/admin/NewsPage"));
const AdminResultsPage = React.lazy(() => import("./pages/admin/ResultsPage"));
const AdminScholarshipsPage = React.lazy(
  () => import("./pages/admin/ScholarshipsPage")
);
const AdminGalleryPage = React.lazy(() => import("./pages/admin/GalleryPage"));

// Nested components
const AboutDAV = React.lazy(() => import("./components/about/AboutDAV"));
const VisionMission = React.lazy(
  () => import("./components/about/VisionMission")
);
const Facilities = React.lazy(() => import("./components/about/Facilities"));

const TeachingStaff = React.lazy(
  () => import("./components/administration/TeachingStaff")
);
const NonTeachingStaff = React.lazy(
  () => import("./components/administration/NonTeachingStaff")
);
const AdmissionRules = React.lazy(
  () => import("./components/admission/AdmissionRules")
);
const FeeStructure = React.lazy(
  () => import("./components/admission/FeeStructure")
);
const Scholarship = React.lazy(
  () => import("./components/student/Scholarship")
);
const Results = React.lazy(() => import("./components/student/Results"));
const HousesPage = React.lazy(() => import("./pages/admin/HousesPage"));

// Admin routes component
function AdminRoutesWrapper() {
  const isConvexAvailable = useConvexAvailable();

  // If Convex is not available, show a message and don't allow access to admin routes
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

  // Return the AdminRoutes component if Convex is available
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
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

function PublicRoutes() {
  return (
    <AuthProvider>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/about" element={<AboutPage />}>
                <Route index element={<AboutDAV />} />
                <Route path="about-dav" element={<AboutDAV />} />
                <Route path="vision-mission" element={<VisionMission />} />
                <Route path="facilities" element={<Facilities />} />
              </Route>

              <Route path="/administration" element={<StaffPage />}>
                <Route index element={<TeachingStaff />} />
                <Route path="Teaching-Staff" element={<TeachingStaff />} />
                <Route
                  path="Non-teaching-staff"
                  element={<NonTeachingStaff />}
                />
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
          </ErrorBoundary>
        </Suspense>
      </Box>
      <Footer />
    </AuthProvider>
  );
}

// Main App Routing Component
function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      {isAdminRoute ? (
        <Box sx={{ flex: 1 }}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <AdminRoutesWrapper />
            </ErrorBoundary>
          </Suspense>
        </Box>
      ) : (
        <PublicRoutes />
      )}
    </Box>
  );
}

// Main App Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConvexClientProvider>
        <Router>
          <Routes>
            <Route path="/admin/*" element={<AppRoutes />} />
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </Router>
      </ConvexClientProvider>
    </ThemeProvider>
  );
}

export default App;
