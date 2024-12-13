import React from "react";
import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong>
              <br />
              D.A.V Senior Secondary School
              <br />
              Near Victoria Bridge, Mandi
              <br />
              District Mandi, Himachal Pradesh – 175001
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Telephone:</strong> 01905-223145
              <br />
              <strong>Email:</strong> davsss.mnd@gmail.com
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Important Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "column" },
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              {importantLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                    my: { xs: 0.5, md: 0 },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Navigation
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "column" },
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Admission", path: "/admission" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                    my: { xs: 0.5, md: 0 },
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: "white" }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} D.A.V Senior Secondary School, Mandi. All
          Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
