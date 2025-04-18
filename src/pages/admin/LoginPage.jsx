// src/pages/admin/LoginPage.jsx
import React, { useState, useEffect } from "react";
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
  Login as LoginIcon,
} from "@mui/icons-material";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import OmLogo from "../../components/common/OmLogo";
import { Link as RouterLink } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { login, error, isConvexAvailable } = useAdminAuth();

  // Check for signup success message in sessionStorage
  useEffect(() => {
    const signupSuccess = sessionStorage.getItem("signupSuccess");
    if (signupSuccess) {
      setSuccessMessage(signupSuccess);
      // Remove the message after displaying it
      sessionStorage.removeItem("signupSuccess");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage(""); // Clear any existing success message when submitting

    if (!isConvexAvailable) {
      setFormError(
        "The admin panel is currently unavailable. The backend service cannot be reached."
      );
      return;
    }

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
      setFormError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
              Admin Login
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

          {successMessage && (
            <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {(error || formError) && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {formError || error}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  Signing in...
                </>
              ) : (
                <>
                  <LoginIcon sx={{ mr: 1 }} />
                  Sign In
                </>
              )}
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <Link component={RouterLink} to="/admin/signup" variant="body2">
                  Need an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
