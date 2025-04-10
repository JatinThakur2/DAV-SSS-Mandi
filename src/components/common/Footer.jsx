// src/components/common/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as ClockIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  ArrowForward as ArrowIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import OmLogo from "./OmLogo";

function Footer() {
  const importantLinks = [
    { name: "H.P. Board of School Education", url: "https://hpbose.org" },
    {
      name: "Dept. of Elementary Education",
      url: "https://hp.gov.in/education",
    },
    {
      name: "Dept. of Higher Education",
      url: "https://hp.gov.in/higher-education",
    },
    { name: "NEET", url: "https://neet.nta.nic.in" },
    { name: "JEE", url: "https://jee.nta.nic.in" },
    { name: "Mandi District", url: "https://mandi.nic.in" },
    { name: "Himachal Pradesh Govt.", url: "https://hp.gov.in" },
    { name: "ePASS", url: "https://hp.gov.in/epass" },
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About DAV", url: "/about/about-dav" },
    { name: "Vision & Mission", url: "/about/vision-mission" },
    { name: "Facilities", url: "/about/facilities" },
    { name: "Admission Rules", url: "/admission/rules" },
    { name: "Fee Structure", url: "/admission/fee-structure" },
    { name: "Results", url: "/student-zone/results" },
    { name: "Gallery", url: "/gallery" },
    { name: "Contact", url: "/contact" },
  ];

  // Pre-footer section with newsletter
  const renderPreFooter = () => (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h4"
              sx={{ mb: 2, fontWeight: 700, color: "secondary.main" }}
            >
              Stay Updated with DAV Senior Secondary School
            </Typography>
            <Typography variant="body1">
              Subscribe to our newsletter to receive the latest news, events,
              and announcements.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 3, backgroundColor: "white" }}
            >
              <Box component="form" sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  placeholder="Enter your email address"
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px 0 0 8px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{
                    borderRadius: "0 8px 8px 0",
                    boxShadow: "none",
                    px: 2,
                  }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Main footer section
  const renderMainFooter = () => (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* School Info and Logo */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <OmLogo sx={{ fontSize: 40, mr: 1, color: "primary.main" }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                DAV SSS Mandi
              </Typography>
            </Box>
            <Typography variant="body2" paragraph sx={{ mb: 3 }}>
              D.A.V. Senior Secondary School Mandi follows the philosophy of
              Arya Samaj, providing quality education with a blend of
              traditional values and modern teaching methods since 1944.
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Follow Us:
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.main" },
                }}
                component="a"
                href="https://www.facebook.com/profile.php?id=100063795864906"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { backgroundColor: "primary.main" },
                }}
                component="a"
                href="https://www.instagram.com/d.a.v.sr.sec.school"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <List dense disablePadding>
              {quickLinks.map((link, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <ArrowIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link
                        component={RouterLink}
                        to={link.url}
                        color="inherit"
                        sx={{
                          textDecoration: "none",
                          "&:hover": { color: "primary.light" },
                          transition: "color 0.2s ease",
                          fontWeight: 400,
                          fontSize: "0.875rem",
                        }}
                      >
                        {link.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Important Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Important Links
            </Typography>
            <List dense disablePadding>
              {importantLinks.slice(0, 6).map((link, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <ArrowIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        sx={{
                          textDecoration: "none",
                          "&:hover": { color: "primary.light" },
                          transition: "color 0.2s ease",
                          fontWeight: 400,
                          fontSize: "0.875rem",
                        }}
                      >
                        {link.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <List dense disablePadding>
              <ListItem disablePadding sx={{ mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <LocationIcon
                    fontSize="small"
                    sx={{ color: "primary.main" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                      D.A.V Senior Secondary School
                      <br />
                      Near Victoria Bridge, Mandi
                      <br />
                      District Mandi, H.P. – 175001
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <PhoneIcon fontSize="small" sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href="tel:01905-223145"
                      color="inherit"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { color: "primary.light" },
                        transition: "color 0.2s ease",
                        fontWeight: 400,
                        fontSize: "0.875rem",
                      }}
                    >
                      01905-223145
                    </Link>
                  }
                />
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <EmailIcon fontSize="small" sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link
                      href="mailto:davsss.mnd@gmail.com"
                      color="inherit"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { color: "primary.light" },
                        transition: "color 0.2s ease",
                        fontWeight: 400,
                        fontSize: "0.875rem",
                      }}
                    >
                      davsss.mnd@gmail.com
                    </Link>
                  }
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <ClockIcon fontSize="small" sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                      Mon - Sat: 8:30 AM - 3:30 PM
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Bottom Copyright Bar
  const renderCopyrightBar = () => (
    <Box sx={{ backgroundColor: "#0d2f62", py: 2 }}>
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="body2"
              color="rgba(255,255,255,0.7)"
              fontSize="0.75rem"
            >
              © {new Date().getFullYear()} D.A.V Senior Secondary School,
              Mandi. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.7)"
                fontSize="0.75rem"
              >
                Designed with{" "}
                <Box component="span" sx={{ color: "#ff6b00" }}>
                  ♥
                </Box>{" "}
                for DAV community (Jatin Thakur)
              </Typography>
              <Link
                component={RouterLink}
                to="/admin/login"
                color="rgba(255,255,255,0.7)"
                sx={{
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  "&:hover": {
                    color: "white",
                    textDecoration: "underline",
                  },
                }}
              >
                Admin Login
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  return (
    <>
      {renderPreFooter()}
      {renderMainFooter()}
      {renderCopyrightBar()}
    </>
  );
}

export default Footer;
