// src/pages/StaffPage.jsx
import React, { useEffect } from "react";
import { Container, Paper, Tabs, Tab, Box } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function StaffPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Determine which tab should be active based on the current path
  const getTabValue = () => {
    if (pathname.includes("non-teaching-staff")) {
      return 1;
    }
    return 0; // Default to teaching staff
  };

  // Handle first load to ensure content is displayed
  useEffect(() => {
    // If we're at the root administration path, redirect to teaching staff
    if (pathname === "/administration" || pathname === "/administration/") {
      navigate("/administration/teaching-staff", { replace: true });
    }
  }, [pathname, navigate]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate("/administration/teaching-staff");
    } else {
      navigate("/administration/non-teaching-staff");
    }
  };

  // Add logging to debug
  console.log("StaffPage rendering, pathname:", pathname);
  console.log("Current tab value:", getTabValue());

  return (
    <>
      <PageHeader
        title="School Administration"
        subtitle="Meet our dedicated teaching and non-teaching staff who nurture the future of our students."
        bgImage="/api/placeholder/1920/400"
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={getTabValue()}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Teaching Staff" />
              <Tab label="Non-Teaching Staff" />
            </Tabs>
          </Box>

          {/* Debug info */}
          <Box sx={{ display: "none" }}>
            <p>Current path: {pathname}</p>
            <p>Tab value: {getTabValue()}</p>
          </Box>

          {/* This is the outlet that renders the child routes */}
          <Outlet />
        </Paper>
      </Container>
    </>
  );
}

export default StaffPage;
