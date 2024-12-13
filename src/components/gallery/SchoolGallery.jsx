import React from "react";
import { Container, Typography, Paper } from "@mui/material";

function SchoolGallery() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        School Gallery
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Explore photos and memories from our school events and activities.
        </Typography>
      </Paper>
    </Container>
  );
}
export default SchoolGallery;
