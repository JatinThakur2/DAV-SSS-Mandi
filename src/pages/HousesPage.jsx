import React from "react";
import { Container, Paper } from "@mui/material";
import PageHeader from "../components/common/PageHeader";
import Houses from "../components/student/Houses";

function HousesPage() {
  return (
    <>
      <PageHeader
        title="School Houses"
        subtitle="Learn about our house system, student leadership, and house activities."
        bgImage="/api/placeholder/1920/400" // Replace with actual school houses image
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Houses />
        </Paper>
      </Container>
    </>
  );
}

export default HousesPage;
