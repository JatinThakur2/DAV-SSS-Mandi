// src/components/admin/AdminLayout.jsx
import React, { useState, useEffect, useCallback } from "react";
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
  Fade,
  Collapse,
  Badge,
  SwipeableDrawer,
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
  Notifications as NotificationsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import OmLogo from "../common/OmLogo";

// Responsive drawer width based on screen size
const getDrawerWidth = (isDesktop, isTablet) => {
  if (isDesktop) return 260;
  if (isTablet) return 240;
  return 280; // Mobile drawer is full width or nearly full width
};

function AdminLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(isDesktop);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = getDrawerWidth(isDesktop, isTablet);

  // Handle window resize and adjust drawer accordingly
  useEffect(() => {
    const handleResize = () => {
      if (isDesktop) {
        setOpen(true);
      } else if (!isDesktop && open) {
        setOpen(false);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop, open]);

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

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
  };

  const navigateTo = useCallback(
    (path) => {
      navigate(path);
      if (!isDesktop) {
        setOpen(false); // Close drawer on mobile when navigating
      }
    },
    [navigate, isDesktop]
  );

  const handleExpandSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // Main menu structure with optional nested items
  const menuSections = [
    {
      id: "main",
      items: [
        {
          text: "Dashboard",
          icon: <DashboardIcon />,
          path: "/admin/dashboard",
        },
      ],
    },
    {
      id: "content",
      title: "Content Management",
      items: [
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
      ],
    },
    {
      id: "settings",
      title: "System",
      items: [
        {
          text: "Settings",
          icon: <SettingsIcon />,
          path: "/admin/settings",
        },
      ],
    },
  ];

  // Sample notifications for demo purposes
  const notifications = [
    { id: 1, text: "New user registration", read: false, time: "Just now" },
    { id: 2, text: "New comment on gallery", read: false, time: "2 hours ago" },
    { id: 3, text: "System update completed", read: true, time: "Yesterday" },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderDrawerContent = () => (
    <>
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
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: isMobile ? "1rem" : "1.25rem" }}
          >
            Admin Panel
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <Box sx={{ overflow: "auto", height: "calc(100% - 64px)" }}>
        {menuSections.map((section) => (
          <React.Fragment key={section.id}>
            {section.title && (
              <Box sx={{ px: 3, pt: 2, pb: 1 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    opacity: open ? 1 : 0,
                    transition: theme.transitions.create("opacity", {
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                >
                  {section.title}
                </Typography>
              </Box>
            )}
            <List sx={{ px: 2 }}>
              {section.items.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ display: "block", mb: 0.5 }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      borderRadius: 2,
                      ...(isActive(item.path) && {
                        backgroundColor: "primary.light",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      }),
                    }}
                    onClick={() => navigateTo(item.path)}
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
                      sx={{
                        opacity: open ? 1 : 0,
                        transition: theme.transitions.create("opacity", {
                          duration: theme.transitions.duration.shorter,
                        }),
                      }}
                    />
                    {item.children && open && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpandSection(item.text);
                        }}
                      >
                        {expandedSection === item.text ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    )}
                  </ListItemButton>

                  {item.children && (
                    <Collapse
                      in={expandedSection === item.text}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.children.map((child) => (
                          <ListItemButton
                            key={child.text}
                            sx={{
                              py: 1,
                              minHeight: 40,
                              pl: open ? 6 : 2.5,
                              borderRadius: 2,
                              ml: 2,
                              mr: 1,
                              mt: 0.5,
                              ...(isActive(child.path) && {
                                backgroundColor: "primary.main",
                                color: "white",
                                "& .MuiListItemIcon-root": {
                                  color: "white",
                                },
                              }),
                            }}
                            onClick={() => navigateTo(child.path)}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 2 : 0,
                                justifyContent: "center",
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.text}
                              primaryTypographyProps={{ fontSize: "0.875rem" }}
                              sx={{
                                opacity: open ? 1 : 0,
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
        ))}

        <List sx={{ px: 2, mt: "auto" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: 2,
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
              <ListItemText
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,
                  transition: theme.transitions.create("opacity"),
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "0 1px 10px rgba(0,0,0,0.12)",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open &&
            isDesktop && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
        }}
      >
        <Toolbar sx={{ pr: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && isDesktop && { display: "none" }),
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
              fontWeight: 500,
            }}
          >
            {isMobile ? "DAV Admin" : "DAV School Admin Panel"}
          </Typography>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              sx={{ mx: { xs: 0.5, sm: 1 } }}
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            TransitionComponent={Fade}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 3,
              sx: {
                width: 320,
                maxHeight: 400,
                mt: 1.5,
                overflow: "auto",
                borderRadius: 2,
              },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Notifications
              </Typography>
            </Box>

            {notifications.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No notifications
                </Typography>
              </Box>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={handleNotificationsClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    backgroundColor: notification.read
                      ? "transparent"
                      : "rgba(0, 0, 0, 0.02)",
                    borderLeft: notification.read ? "none" : "3px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                      fontWeight={notification.read ? 400 : 600}
                    >
                      {notification.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}

            {notifications.length > 0 && (
              <Box
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", fontWeight: 500 }}
                  onClick={handleNotificationsClose}
                >
                  View all notifications
                </Typography>
              </Box>
            )}
          </Menu>

          <Tooltip title="Visit Website">
            <IconButton
              color="inherit"
              onClick={() => window.open("/", "_blank")}
              sx={{ mx: { xs: 0.5, sm: 1 } }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{ p: 0, ml: { xs: 0.5, sm: 1 } }}
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
                    width: 32,
                    height: 32,
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
              TransitionComponent={Fade}
              sx={{ mt: 1 }}
              PaperProps={{
                elevation: 3,
                sx: { minWidth: 200, borderRadius: 2 },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1, textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: 40,
                    height: 40,
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  {user?.name?.charAt(0) || "A"}
                </Avatar>
                <Typography variant="subtitle2" fontWeight={600}>
                  {user?.name || "Admin User"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Administrator
                </Typography>
              </Box>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleUserMenuClose();
                  navigateTo("/admin/settings");
                }}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2">Settings</Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Responsive drawer implementation */}
      {isDesktop ? (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : 72,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? drawerWidth : 72,
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: "hidden",
              borderRight: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: open ? "4px 0 10px rgba(0,0,0,0.05)" : "none",
            },
          }}
        >
          {renderDrawerContent()}
        </Drawer>
      ) : (
        <SwipeableDrawer
          variant="temporary"
          open={open}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          {renderDrawerContent()}
        </SwipeableDrawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          bgcolor: "#f8f9fa",
          height: "100vh",
          overflow: "auto",
          pt: { xs: 8, sm: 8 }, // Adjust top padding to account for AppBar height
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open &&
            isDesktop && {
              transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
