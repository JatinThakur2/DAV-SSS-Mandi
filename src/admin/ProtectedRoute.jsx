// src/admin/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  CircularProgress,
  Box,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import { useAdminAuth } from "../contexts/AdminAuthContext";

function ProtectedRoute() {
  const { isAuthenticated, loading, isConvexAvailable } = useAdminAuth();

  // First check if Convex is available
  if (!isConvexAvailable) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          p: 3,
        }}
      >
        <Alert
          severity="error"
          sx={{ mb: 3, width: "100%", maxWidth: "600px" }}
        >
          The admin area is currently unavailable. The backend service cannot be
          reached.
        </Alert>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please check your connection or try again later.
        </Typography>
        <Button variant="contained" href="/" color="primary">
          Return to Homepage
        </Button>
      </Box>
    );
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If authenticated, render the child routes, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
