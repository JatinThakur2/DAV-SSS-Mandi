import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export function StaffPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        School Staff
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Meet our dedicated teaching and non-teaching staff.
        </Typography>
        <Outlet /> {/* This will render nested routes */}
      </Paper>
    </Container>
  );
}
