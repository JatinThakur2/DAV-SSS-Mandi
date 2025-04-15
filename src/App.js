import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

// Import custom theme
import theme from "./themes/theme";

// Import routes configuration
import { routes } from "./routes";

// Import common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop"; // Update path as needed
import Loader from "./components/common/Loader"; // Update path as needed
import ErrorBoundary from "./components/common/ErrorBoundary"; // Update path as needed

// Import Auth Providers
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ConvexClientProvider } from "./utils/ConvexClientProvider";

// Create separate components for admin and public routes
function AdminRoutes() {
  return (
    <ConvexClientProvider>
      <AdminAuthProvider>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            {/* Filter admin routes only */}
            {useRoutes(
              routes.filter(
                (route) =>
                  route.path === "/admin" ||
                  route.path === "/admin/login" ||
                  route.path.startsWith("/admin/")
              )
            )}
          </ErrorBoundary>
        </Suspense>
      </AdminAuthProvider>
    </ConvexClientProvider>
  );
}

function PublicRoutes() {
  return (
    <ConvexClientProvider>
      <AuthProvider>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              {/* Filter public routes only */}
              {useRoutes(
                routes.filter((route) => !route.path.startsWith("/admin"))
              )}
            </ErrorBoundary>
          </Suspense>
        </Box>
        <Footer />
      </AuthProvider>
    </ConvexClientProvider>
  );
}

// Main App Routing Component
function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      {isAdminRoute ? <AdminRoutes /> : <PublicRoutes />}
    </Box>
  );
}

// Main App Component
function App() {
  // useEffect for fonts remains the same...

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
