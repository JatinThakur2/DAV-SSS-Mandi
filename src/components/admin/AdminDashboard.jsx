import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Newspaper as NewsIcon,
  Announcement as NoticeIcon,
  People as StaffIcon,
  School as SchoolIcon,
  AttachMoney as FeeIcon,
  EmojiEvents as ScholarshipIcon,
  Score as ResultsIcon,
  PhotoLibrary as GalleryIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

// Import admin sub-components
import AdminNews from "./AdminNews";
import AdminNotices from "./AdminNotices";
import AdminStaff from "./AdminStaff"; // Updated import
import AdminFeeStructure from "./AdminFeeStructure";
import AdminScholarship from "./AdminScholarship";
import AdminResults from "./AdminResults";
import AdminGallery from "./AdminGallery";
import OmLogo from "../common/OmLogo";

// Import auth context (will be implemented later)
// import { useAuth } from "../../contexts/AuthContext";

function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Auth context (to be implemented)
  // const { currentUser, logout } = useAuth();

  // Mock user data for now
  const currentUser = {
    name: "Admin User",
    email: "admin@davsss.edu.in",
    role: "Administrator",
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Will be implemented with auth context
    // logout();
    console.log("Logging out...");
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  // Menu items for the sidebar

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "news", label: "Latest News", icon: <NewsIcon /> },
    { id: "notices", label: "Notices", icon: <NoticeIcon /> },
    { id: "staff", label: "Staff Management", icon: <StaffIcon /> }, // Replace two staff items with one
    { id: "fee-structure", label: "Fee Structure", icon: <FeeIcon /> },
    { id: "scholarships", label: "Scholarships", icon: <ScholarshipIcon /> },
    { id: "results", label: "Results", icon: <ResultsIcon /> },
    { id: "gallery", label: "Gallery", icon: <GalleryIcon /> },
  ];

  // Render the selected section content

  const renderContent = () => {
    switch (selectedSection) {
      case "dashboard":
        return <AdminDashboardContent />;
      case "news":
        return <AdminNews />;
      case "notices":
        return <AdminNotices />;
      case "staff":
        return <AdminStaff />; // Replace separate staff components with the combined one
      case "fee-structure":
        return <AdminFeeStructure />;
      case "scholarships":
        return <AdminScholarship />;
      case "results":
        return <AdminResults />;
      case "gallery":
        return <AdminGallery />;
      default:
        return <AdminDashboardContent />;
    }
  };

  // Sidebar component
  const sidebarContent = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
        }}
      >
        <OmLogo sx={{ fontSize: 50, color: "primary.main", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          DAV SSS Mandi
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
          Admin Dashboard
        </Typography>
      </Box>
      <Divider />
      <List sx={{ width: 280 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            selected={selectedSection === item.id}
            sx={{
              borderRadius: 2,
              m: 1,
              backgroundColor:
                selectedSection === item.id
                  ? "rgba(255, 107, 0, 0.1)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  selectedSection === item.id
                    ? "rgba(255, 107, 0, 0.15)"
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedSection === item.id ? "primary.main" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: selectedSection === item.id ? 600 : 400,
                color: selectedSection === item.id ? "primary.main" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            m: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              color: "error.main",
            }}
          />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            borderRight: "none",
          },
        }}
        open
      >
        {sidebarContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* Top App Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "#fff",
            color: "text.primary",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileDrawer}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {menuItems.find((item) => item.id === selectedSection)?.label ||
                "Dashboard"}
            </Typography>

            <IconButton
              edge="end"
              aria-label="account"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 40,
                  height: 40,
                }}
              >
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {currentUser.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser.email}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    display: "inline-block",
                    mt: 1,
                  }}
                >
                  {currentUser.role}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Content Container */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
}

// Dashboard Home Content Component
function AdminDashboardContent() {
  // Quick stats for dashboard
  const quickStats = [
    {
      title: "Total Students",
      value: "1,042",
      icon: <SchoolIcon fontSize="large" />,
      color: "#1E4A86", // secondary.main
    },
    {
      title: "Teaching Staff",
      value: "25",
      icon: <StaffIcon fontSize="large" />,
      color: "#FF6B00", // primary.main
    },
    {
      title: "News & Notices",
      value: "12",
      icon: <NewsIcon fontSize="large" />,
      color: "#2A7E43", // green
    },
    {
      title: "Gallery Items",
      value: "84",
      icon: <GalleryIcon fontSize="large" />,
      color: "#9C27B0", // purple
    },
  ];

  // Recent activities data (mock)
  const recentActivities = [
    {
      id: 1,
      action: "Updated Results section",
      user: "Admin",
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      action: "Added 3 new scholarship recipients",
      user: "Admin",
      date: "Yesterday, 2:15 PM",
    },
    {
      id: 3,
      action: "Updated fee structure for 2025-26",
      user: "Admin",
      date: "20 Apr 2025, 11:45 AM",
    },
    {
      id: 4,
      action: "Added new notice about summer holidays",
      user: "Admin",
      date: "18 Apr 2025, 9:20 AM",
    },
    {
      id: 5,
      action: "Uploaded new images to Gallery",
      user: "Admin",
      date: "15 Apr 2025, 4:10 PM",
    },
  ];

  return (
    <Grid container spacing={3}>
      {/* Welcome Section */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage website content, update information, and keep the school
            community informed with the latest news and events.
          </Typography>
        </Paper>
      </Grid>

      {/* Quick Stats */}
      {quickStats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -15,
                right: -15,
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: `${stat.color}15`,
                zIndex: 0,
              }}
            />
            <Avatar
              sx={{
                bgcolor: stat.color,
                width: 56,
                height: 56,
                mb: 2,
                zIndex: 1,
              }}
            >
              {stat.icon}
            </Avatar>
            <Typography
              variant="h3"
              component="div"
              fontWeight="bold"
              sx={{ zIndex: 1 }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ zIndex: 1 }}
            >
              {stat.title}
            </Typography>
          </Paper>
        </Grid>
      ))}

      {/* Recent Activities */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Recent Activities
          </Typography>
          <List>
            {recentActivities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 36,
                        height: 36,
                      }}
                    >
                      {activity.user.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.date}
                  />
                </ListItem>
                {index < recentActivities.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
