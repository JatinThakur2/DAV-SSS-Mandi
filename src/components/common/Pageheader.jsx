// src/components/common/PageHeader.jsx
import React from "react";
import { Box, Typography, Container, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

function PageHeader({ title, subtitle, bgImage }) {
  // Get current location for breadcrumbs
  const location = useLocation();

  // Generate breadcrumb items based on the current path
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Function to generate human-readable breadcrumb label
  const getBreadcrumbLabel = (pathname) => {
    // Convert pathname to human-readable format (e.g., vision-mission → Vision & Mission)
    return pathname
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "secondary.main",
        color: "white",
        pt: 8,
        pb: 8,
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(30, 74, 134, 0.85)", // secondary.main with opacity
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            mb: 2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            sx={{
              maxWidth: "800px",
              opacity: 0.9,
              mb: 3,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" sx={{ color: "white" }} />
          }
          aria-label="breadcrumb"
          sx={{
            mt: 2,
            "& .MuiBreadcrumbs-ol": {
              justifyContent: "center", // Center the breadcrumbs
            },
            "& .MuiBreadcrumbs-li": {
              color: "white",
            },
            "& a": {
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              "&:hover": {
                color: "white",
                textDecoration: "underline",
              },
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: "1.1rem" }} />
            Home
          </Link>

          {pathnames.map((pathname, index) => {
            // If this is the last item, it should not be a link
            const isLast = index === pathnames.length - 1;

            // Build the link path up to this point
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

            // Get a human-readable label
            const label = getBreadcrumbLabel(pathname);

            return isLast ? (
              <Typography key={index} color="inherit" sx={{ opacity: 0.9 }}>
                {label}
              </Typography>
            ) : (
              <Link component={RouterLink} to={routeTo} key={index}>
                {label}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Container>
    </Box>
  );
}

export default PageHeader;
