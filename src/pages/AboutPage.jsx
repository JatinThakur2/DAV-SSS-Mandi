import React from "react";
import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function AboutPage() {
  return (
    <>
      <PageHeader
        title="About DAV SSS Mandi"
        subtitle="Learn about our rich history, vision, mission, and the facilities we offer to our students."
        bgImage="/api/placeholder/1920/400" // Replace with actual school building image
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Outlet /> {/* This will render nested routes */}
        </Paper>
      </Container>
    </>
  );
}

export default AboutPage;
