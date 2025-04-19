// src/pages/StaffPage.jsx
import React from "react";
import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom"; // Make sure this import is present
import PageHeader from "../components/common/PageHeader";

function StaffPage() {
  console.log("StaffPage rendering"); // Add this logging
  return (
    <>
      <PageHeader
        title="School Administration"
        subtitle="Meet our dedicated teaching and non-teaching staff who nurture the future of our students."
        bgImage="/api/placeholder/1920/400"
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Add this to debug */}
          <div>
            <p>Before Outlet</p>
            <Outlet />
            <p>After Outlet</p>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default StaffPage;
