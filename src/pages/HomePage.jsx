import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Import components

import HomeCarousel from "../components/home/HomeCarousel";
import LatestNewsSection from "../components/home/LatestNewsSection";
import PrincipalMessage from "../components/home/PrincipalMessage";

function HomePage() {
  return (
    <Box>
      {/* Hero Section with Carousel */}
      <HomeCarousel />

      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Latest News Section */}
          <Grid xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Latest News & Notices
            </Typography>
            <LatestNewsSection />
          </Grid>

          {/* Quick Links or About Us Card */}
          <Grid xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  About DAV SSS Mandi
                </Typography>
                <Typography variant="body2" paragraph>
                  D.A.V. Senior Secondary School, Mandi is committed to
                  providing quality education and holistic development to
                  students.
                </Typography>
                <Typography variant="body2">
                  Established with a vision to nurture young minds and prepare
                  them for future challenges.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Principal's Message */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Principal's Message
          </Typography>
          <PrincipalMessage />
        </Box>

        {/* Welcome Section */}
        <Card sx={{ my: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome to D.A.V. Senior Secondary School, Mandi
            </Typography>
            <Typography variant="body1" paragraph>
              We are dedicated to providing a comprehensive educational
              experience that focuses on academic excellence, character
              development, and overall personal growth of our students.
            </Typography>
            <Typography variant="body1">
              Our institution strives to create an inclusive, supportive, and
              innovative learning environment that empowers students to achieve
              their full potential.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default HomePage;
