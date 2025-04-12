import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import {
  School as SchoolIcon,
  People as PeopleIcon,
  EmojiEvents as AwardIcon,
  History as HistoryIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import PageHeader from "../components/common/PageHeader";
import GoogleMapLocation from "../components/common/GoogleMapsLocation";
function ContactPage() {
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({
    established: 0,
    students: 0,
    faculty: 0,
    pass: 0,
  });
  const sectionRef = useRef(null);

  // Wrap targetCounts in useMemo to prevent recreation on every render
  const targetCounts = useMemo(
    () => ({
      established: 1944,
      students: 1000,
      faculty: 25,
      pass: 100,
    }),
    []
  ); // Empty dependency array means it's created only once

  // Check if element is in viewport
  useEffect(() => {
    const currentRef = sectionRef.current; // Store the ref value in a variable
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Once triggered, disconnect observer
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        // Use the stored variable in cleanup
        observer.disconnect();
      }
    };
  }, []);

  // Counting animation effect
  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // Duration of count animation in ms
    const frameDuration = 1000 / 60; // Duration of one frame at 60fps
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;

      const progress = frame / totalFrames;

      setCounts({
        established: Math.floor(progress * targetCounts.established),
        students: Math.floor(progress * targetCounts.students),
        faculty: Math.floor(progress * targetCounts.faculty),
        pass: Math.floor(progress * targetCounts.pass),
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setCounts(targetCounts); // Ensure we hit exact target numbers
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [inView, targetCounts]); // targetCounts is now memoized, so it won't change

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch with our team" />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <LocationIcon
                      sx={{ color: "primary.main", mr: 2, fontSize: 28 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Address
                      </Typography>
                      <Typography variant="body1">
                        123 Education Avenue, Knowledge City, 12345
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <PhoneIcon
                      sx={{ color: "primary.main", mr: 2, fontSize: 28 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Phone
                      </Typography>
                      <Typography variant="body1">(123) 456-7890</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <EmailIcon
                      sx={{ color: "primary.main", mr: 2, fontSize: 28 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        info@educationinstitute.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Send us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        required
                        type="email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box
        ref={sectionRef}
        sx={{
          py: 6,
          backgroundColor: "primary.main",
          color: "white",
          transform: inView ? "translateY(0)" : "translateY(50px)",
          opacity: inView ? 1 : 0,
          transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          maxWidth="lg"
          sx={{ mx: "auto", px: 2 }}
        >
          {/* Established Year */}
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "primary.dark",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <HistoryIcon
                sx={{ fontSize: 40, mb: 1, color: "primary.main" }}
              />
              <Typography variant="h3" fontWeight="bold">
                {counts.established}
              </Typography>
              <Typography variant="h6" textAlign="center">
                Established
              </Typography>
            </Paper>
          </Grid>

          {/* Number of Students */}
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "primary.dark",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <PeopleIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
              <Typography variant="h3" fontWeight="bold">
                {counts.students}+
              </Typography>
              <Typography variant="h6" textAlign="center">
                Students
              </Typography>
            </Paper>
          </Grid>

          {/* Faculty Members */}
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "primary.dark",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <SchoolIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
              <Typography variant="h3" fontWeight="bold">
                {counts.faculty}+
              </Typography>
              <Typography variant="h6" textAlign="center">
                Faculty Members
              </Typography>
            </Paper>
          </Grid>

          {/* Pass Percentage */}
          <Grid item xs={6} sm={3}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "primary.dark",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <AwardIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
              <Typography variant="h3" fontWeight="bold">
                {counts.pass}%
              </Typography>
              <Typography variant="h6" textAlign="center">
                Pass Percentage
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Map Section */}
      <Box sx={{ height: "400px", width: "100%", bgcolor: "gray.200" }}>
        {/* Map would be inserted here with a mapping library like Google Maps or Leaflet */}

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f5f5f5",
          }}
        >
          <GoogleMapLocation></GoogleMapLocation>
        </Box>
      </Box>
    </>
  );
}

export default ContactPage;
