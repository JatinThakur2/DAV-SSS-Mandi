import React from "react";
import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function StaffPage() {
  return (
    <>
      <PageHeader
        title="School Administration"
        subtitle="Meet our dedicated teaching and non-teaching staff who nurture the future of our students."
        bgImage="/api/placeholder/1920/400" // Replace with actual staff group photo
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Outlet /> {/* This will render nested routes */}
        </Paper>
      </Container>
    </>
  );
}

export default StaffPage;
