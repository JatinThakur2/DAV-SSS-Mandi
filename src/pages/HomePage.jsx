// src/pages/HomePage.jsx - Updated with responsive fixes
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  ArrowForward as ArrowIcon,
  School as SchoolIcon,
  MenuBook as BookIcon,
  EmojiEvents as AwardIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

// Import components
import HomeCarousel from "../components/home/HomeCarousel";
import LatestNewsSection from "../components/home/LatestNewsSection";
import PrincipalMessage from "../components/home/PrincipalMessage";
import StatsCounter from "../components/home/StatsCounter";
import ScrollEffect from "../components/common/ScrollEffect";
import OmLogo from "../components/common/OmLogo";

function HomePage() {
  // Key features section
  const features = [
    {
      icon: <SchoolIcon fontSize="large" />,
      title: "Quality Education",
      description:
        "Our curriculum is designed to foster intellectual growth and critical thinking skills.",
    },
    {
      icon: <BookIcon fontSize="large" />,
      title: "Value-Based Learning",
      description:
        "We instill traditional values with modern educational approaches for holistic development.",
    },
    {
      icon: <GroupIcon fontSize="large" />,
      title: "Experienced Faculty",
      description:
        "Our dedicated teachers bring extensive experience and passion for student success.",
    },
    {
      icon: <AwardIcon fontSize="large" />,
      title: "Excellence in Results",
      description:
        "Our students consistently achieve outstanding academic and extracurricular results.",
    },
  ];

  return (
    <Box>
      {/* Hero Section with Carousel and overlaid News */}
      <Box sx={{ position: "relative" }}>
        {/* Full-width carousel in the background */}
        <HomeCarousel />

        {/* News section overlaid on top with higher z-index - DESKTOP ONLY */}
        <Box
          sx={{
            position: "absolute",
            top: "200px",
            right: "50px",
            width: "40%",
            maxHeight: "800px",
            zIndex: 5,
            display: { xs: "none", sm: "none", md: "block" }, // Only show on desktop (md and up)
          }}
        >
          <LatestNewsSection overlayMode={true} />
        </Box>
      </Box>

      {/* Mobile and Tablet News Section */}
      <Box sx={{ display: { xs: "block", sm: "block", md: "none" }, my: 3 }}>
        <Container>
          <LatestNewsSection />
        </Container>
      </Box>

      {/* Rest of the component remains the same */}
      {/* Key Features Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <ScrollEffect>
            <Box sx={{ mb: 5, textAlign: "center" }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, color: "secondary.main" }}
              >
                Why Choose DAV Mandi
              </Typography>
              <Typography
                variant="h6"
                sx={{ maxWidth: 700, mx: "auto", color: "text.secondary" }}
              >
                We provide a supportive environment where students can excel
                academically and develop into well-rounded individuals.
              </Typography>
            </Box>
          </ScrollEffect>

          <Box sx={{ position: "relative" }}>
            <Grid container spacing={4} alignItems="stretch">
              {features.map((feature, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{ display: "flex" }}
                >
                  <ScrollEffect delay={index * 0.2} sx={{ width: "100%" }}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        borderRadius: 3,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 4,
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 70,
                            height: 70,
                            mx: "auto",
                            mb: 3,
                            boxShadow: "0 5px 15px rgba(255, 107, 0, 0.3)",
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {feature.title}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </ScrollEffect>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Stats Counter Section */}
      <StatsCounter />

      {/* About School Section with Om Symbol */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <ScrollEffect direction="right">
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      backgroundColor: "primary.main",
                      borderRadius: 4,
                      p: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 400,
                    }}
                  >
                    {/* Using the white version of the logo */}
                    <OmLogo sx={{ fontSize: 250 }} white={true} />
                  </Box>
                  <Paper
                    elevation={4}
                    sx={{
                      position: "absolute",
                      bottom: -30,
                      right: -30,
                      width: 180,
                      height: 180,
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      backgroundColor: "secondary.main",
                      color: "white",
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        fontWeight: 900,
                        alignSelf: "flex-start",
                      }}
                    >
                      80
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        alignSelf: "center",
                      }}
                    >
                      Years of Excellence
                    </Typography>
                  </Paper>
                </Box>
              </ScrollEffect>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScrollEffect direction="left">
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 2,
                      backgroundColor: "primary.main",
                      mr: 1,
                      display: "inline-block",
                    }}
                  />
                  ABOUT OUR SCHOOL
                </Typography>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "secondary.main" }}
                >
                  Empowering Students Through Knowledge & Values
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  The D.A.V senior secondary school Mandi was established in
                  1944, initially as a Primary school in the premises of Arya
                  Samaj Mandir. The school was patronized and run under the
                  guidance of Late Swami Krishanand ji (Freedom fighter and
                  social reformer), late captain Inder Singh and Late Sh. Dina
                  Nath Vaidya (Advocate).
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Since its inception, the school has made remarkable progress
                  in every area. Our alumni have achieved prominent positions in
                  Medicine, Engineering, Academics, Defence, Administration, and
                  the Corporate World.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/about/about-dav"
                    endIcon={<ArrowIcon />}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      boxShadow: "0 5px 15px rgba(255, 107, 0, 0.3)",
                    }}
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    component={Link}
                    to="/contact"
                    sx={{
                      ml: 2,
                      borderRadius: 2,
                      px: 3,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </ScrollEffect>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Principal Message Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <ScrollEffect>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, color: "secondary.main" }}
              >
                From Principal's Desk
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 700,
                  mx: "auto",
                  color: "text.secondary",
                  mb: 4,
                }}
              >
                Words of wisdom and inspiration from our Principal, Mrs.
                Sangeeta Kapoor.
              </Typography>
            </Box>
          </ScrollEffect>
          <ScrollEffect delay={0.2}>
            <PrincipalMessage />
          </ScrollEffect>
        </Container>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: "primary.main",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Om Symbol */}
        <Box
          sx={{
            position: "absolute",
            right: -100,
            top: -100,
            opacity: 0.1,
          }}
        >
          <OmLogo sx={{ fontSize: 400 }} white={true} />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <ScrollEffect>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  Join DAV Senior Secondary School, Mandi
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, maxWidth: 700 }}>
                  Provide your child with an education that balances academic
                  excellence with character development in a nurturing
                  environment.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ textAlign: { xs: "left", md: "right" } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/admission/rules"
                  sx={{
                    borderRadius: 2,
                    px: 5,
                    py: 1.5,
                    backgroundColor: "white",
                    color: "primary.main",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.9)",
                    },
                  }}
                >
                  Apply for Admission
                </Button>
              </Grid>
            </Grid>
          </ScrollEffect>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
