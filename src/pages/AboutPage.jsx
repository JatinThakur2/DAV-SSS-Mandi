import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

// About Page
function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        About DAV SSS Mandi
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Welcome to the About section of DAV Senior Secondary School, Mandi.
        </Typography>
        <Outlet /> {/* This will render nested routes */}
      </Paper>
    </Container>
  );
}

export default AboutPage;
