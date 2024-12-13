import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export function StudentZonePage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        Student Zone
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Resources and information for our students.
        </Typography>
        <Outlet /> {/* This will render nested routes */}
      </Paper>
    </Container>
  );
}
