// src/pages/admin/SignupPage.jsx
import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import OmLogo from "../../components/common/OmLogo";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { signup, error, isConvexAvailable } = useAdminAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    // Check for empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormError("All fields are required");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }

    // Check password length
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!isConvexAvailable) {
      setFormError(
        "The admin panel is currently unavailable. The backend service cannot be reached."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await signup(formData.name, formData.email, formData.password);
      setSuccessMessage(
        "Account created successfully! Redirecting to login page..."
      );

      // Store success message in sessionStorage for the login page to display
      sessionStorage.setItem(
        "signupSuccess",
        "Your account has been created successfully. You can now login."
      );

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setFormError(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            width: "100%",
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <OmLogo sx={{ fontSize: 60, mb: 1 }} />
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 700, color: "secondary.main" }}
            >
              Create Admin Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              DAV Senior Secondary School, Mandi
            </Typography>
          </Box>

          {!isConvexAvailable && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              The admin panel is currently unavailable. The backend service
              cannot be reached.
              <Box sx={{ mt: 2 }}>
                <Button
                  component={RouterLink}
                  to="/"
                  variant="outlined"
                  size="small"
                >
                  Return to Homepage
                </Button>
              </Box>
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          {formError && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {formError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              disabled={!isConvexAvailable || loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isConvexAvailable || loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                      disabled={!isConvexAvailable || loading}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={!isConvexAvailable || loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={toggleShowConfirmPassword}
                      edge="end"
                      disabled={!isConvexAvailable || loading}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
              disabled={!isConvexAvailable || loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || !isConvexAvailable}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                position: "relative",
              }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      color: "primary.light",
                    }}
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  <PersonAddIcon sx={{ mr: 1 }} />
                  Create Account
                </>
              )}
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <Link component={RouterLink} to="/admin/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default SignupPage;
