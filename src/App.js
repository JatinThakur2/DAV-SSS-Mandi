import React, { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ThemeProvider, CssBaseline, LinearProgress, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Import routes configuration
import { routes } from "./routes";

// Import common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

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

// Main App Routing Component
function AppRoutes() {
  const routing = useRoutes(routes);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>{routing}</ErrorBoundary>
      </Suspense>
      <Footer />
    </Box>
  );
}

// Theme Configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Deep blue color representing education
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#f50057", // Accent color
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

// Main App Component
function App() {
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
