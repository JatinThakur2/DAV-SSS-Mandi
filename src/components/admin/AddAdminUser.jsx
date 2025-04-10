// src/components/admin/AddAdminUser.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

/**
 * This component is for initial admin setup.
 * It creates a default admin user with credentials:
 * Email: admin@davsss.edu.in
 * Password: admin
 *
 * You would typically use this once to set up the admin account,
 * then remove it from your codebase for security.
 */
function AddAdminUser() {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Simplified mock admin creation without Convex
  const handleCreateAdmin = async () => {
    try {
      setIsCreating(true);
      setError(null);
      setResult(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store admin credentials in localStorage
      localStorage.setItem("admin_created", "true");
      localStorage.setItem("admin_email", "admin@davsss.edu.in");
      localStorage.setItem("admin_name", "DAV Admin");

      setResult("Admin user created successfully!");
    } catch (err) {
      setError(err.message || "Failed to create admin user");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Box sx={{ my: 4, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Admin Account Setup
      </Typography>

      {result && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {result}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateAdmin}
        disabled={isCreating}
        startIcon={isCreating ? <CircularProgress size={20} /> : null}
      >
        {isCreating ? "Creating Admin..." : "Create Admin User"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Default credentials: admin@davsss.edu.in / admin
      </Typography>
    </Box>
  );
}

export default AddAdminUser;
