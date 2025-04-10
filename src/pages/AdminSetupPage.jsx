// src/pages/AdminSetupPage.jsx
import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import AddAdminUser from "../components/admin/AddAdminUser";
import OmLogo from "../components/common/OmLogo";

function AdminSetupPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <OmLogo sx={{ fontSize: 70, color: "primary.main", mb: 2 }} />
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            DAV Admin Setup
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            This page is used to set up the initial admin account for DAV SSS
            Mandi website
          </Typography>

          <AddAdminUser />

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="error">
              Important: This page should be removed or secured after initial
              setup!
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminSetupPage;
