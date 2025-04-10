import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, LinearProgress, Box } from "@mui/material";

// Import custom theme
import theme from "./themes/theme";

// Import routes configuration
import { routes } from "./routes";

// Import common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Import AuthProvider for authentication
import { AuthProvider } from "./contexts/AuthContext";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            p: 3,
          }}
        >
          <h1>Something went wrong</h1>
          <p>We're sorry, but an unexpected error occurred.</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Loader Component
function Loader() {
  return (
    <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 9999 }}>
      <LinearProgress />
    </Box>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main App Routing Component
function AppRoutes() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>{useRoutes(routes)}</ErrorBoundary>
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
}

// Custom Font Links Component
// function FontLinks() {
//   return (
//     <React.Fragment>
//       <link rel="preconnect" href="https://fonts.googleapis.com" />
//       <link
//         rel="preconnect"
//         href="https://fonts.gstatic.com"
//         crossOrigin="anonymous"
//       />
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
//         rel="stylesheet"
//       />
//     </React.Fragment>
//   );
// }

// Main App Component
function App() {
  React.useEffect(() => {
    // Add font links to head
    const linkElement = document.createElement("link");
    linkElement.rel = "preconnect";
    linkElement.href = "https://fonts.googleapis.com";
    document.head.appendChild(linkElement);

    const linkElement2 = document.createElement("link");
    linkElement2.rel = "preconnect";
    linkElement2.href = "https://fonts.gstatic.com";
    linkElement2.crossOrigin = "anonymous";
    document.head.appendChild(linkElement2);

    const fontLinkElement = document.createElement("link");
    fontLinkElement.rel = "stylesheet";
    fontLinkElement.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(fontLinkElement);

    return () => {
      document.head.removeChild(linkElement);
      document.head.removeChild(linkElement2);
      document.head.removeChild(fontLinkElement);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
