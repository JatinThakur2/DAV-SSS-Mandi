// src/components/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Newspaper as NewsIcon,
  School as SchoolIcon,
  MonetizationOn as ScholarshipIcon,
  Collections as GalleryIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import OmLogo from "../common/OmLogo";

// Responsive drawer width
const calculateDrawerWidth = (isDesktop) => (isDesktop ? 240 : 260);

function AdminLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(isDesktop);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = calculateDrawerWidth(isDesktop);

  // Effect to handle drawer state based on screen size
  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
  };

  const navigateTo = (path) => {
    navigate(path);
    if (!isDesktop) {
      setOpen(false); // Close drawer when navigating on mobile
    }
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      text: "News & Notices",
      icon: <NewsIcon />,
      path: "/admin/news",
    },
    {
      text: "Results",
      icon: <SchoolIcon />,
      path: "/admin/results",
    },
    {
      text: "Scholarships",
      icon: <ScholarshipIcon />,
      path: "/admin/scholarships",
    },
    {
      text: "Gallery",
      icon: <GalleryIcon />,
      path: "/admin/gallery",
    },
    {
      text: "Houses",
      icon: <HomeIcon />, // You can use a different icon if preferred
      path: "/admin/houses",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: isDesktop ? drawerWidth : 0,
            width: isDesktop ? `calc(100% - ${drawerWidth}px)` : "100%",
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: isMobile ? "1rem" : "1.25rem",
            }}
          >
            DAV School Admin
          </Typography>
          <Tooltip title="Visit Website">
            <IconButton
              color="inherit"
              onClick={() => window.open("/", "_blank")}
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{ p: 0 }}
                aria-controls={
                  Boolean(userMenuAnchorEl) ? "user-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={Boolean(userMenuAnchorEl) ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                  }}
                >
                  {user?.name?.charAt(0) || "A"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="user-menu"
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              sx={{ mt: 1 }}
            >
              <MenuItem disabled>
                <Typography variant="body2">{user?.name || "Admin"}</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            ...(open ? {} : { overflowX: "hidden" }),
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <OmLogo sx={{ fontSize: 35, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Admin Panel
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  ...(isActive(item.path) && {
                    backgroundColor: "primary.light",
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  }),
                }}
                onClick={() => navigateTo(item.path)}
                selected={isActive(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          bgcolor: "#f8f9fa",
          minHeight: "100vh",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
