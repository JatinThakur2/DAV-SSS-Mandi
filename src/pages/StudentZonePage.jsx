import React from "react";
import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function StudentZonePage() {
  return (
    <>
      <PageHeader
        title="Student Zone"
        subtitle="Resources, scholarships, exam results, and important information for our students."
        bgImage="/api/placeholder/1920/400" // Replace with actual students studying image
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Outlet /> {/* This will render nested routes */}
        </Paper>
      </Container>
    </>
  );
}

export default StudentZonePage;
