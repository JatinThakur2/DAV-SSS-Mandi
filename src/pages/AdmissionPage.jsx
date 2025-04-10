import React from "react";
import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function AdmissionPage() {
  return (
    <>
      <PageHeader
        title="Admission Information"
        subtitle="Find all the necessary information about admission rules, fee structure, and application process."
        bgImage="/api/placeholder/1920/400" // Replace with actual classroom or students image
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Outlet /> {/* This will render nested routes */}
        </Paper>
      </Container>
    </>
  );
}

export default AdmissionPage;
