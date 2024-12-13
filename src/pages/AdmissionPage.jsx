import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AdmissionPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        Admission Information
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Find all the necessary information about admissions at DAV SSS Mandi.
        </Typography>
        <Outlet /> {/* This will render nested routes */}
      </Paper>
    </Container>
  );
}
