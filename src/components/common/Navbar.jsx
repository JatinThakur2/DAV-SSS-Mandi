// src/components/common/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Container,
  useScrollTrigger,
  Slide,
  Divider,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Notifications as NotificationsIcon,
  PhoneInTalk as PhoneIcon,
  MailOutline as MailIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import OmLogo from "./OmLogo";

// Hide on scroll functionality
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const location = useLocation();
  const [anchorEls, setAnchorEls] = useState({
    about: null,
    administration: null,
    admission: null,
    studentZone: null,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState({
    about: false,
    administration: false,
    admission: false,
    studentZone: false,
  });
  const [scrolled, setScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuOpen = (menu) => (event) => {
    setAnchorEls({ ...anchorEls, [menu]: event.currentTarget });
  };

  const handleMenuClose = (menu) => () => {
    setAnchorEls({ ...anchorEls, [menu]: null });
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuToggle = (menu) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      label: "About",
      anchorKey: "about",
      subItems: [
        { label: "About DAV Mandi", path: "/about/about-dav" },
        { label: "Vision & Mission", path: "/about/vision-mission" },
        { label: "Facilities", path: "/about/facilities" },
      ],
    },
    {
      label: "Administration",
      anchorKey: "administration",
      subItems: [
        { label: "Teaching Staff", path: "/administration/teaching-staff" },
        {
          label: "Non-Teaching Staff",
          path: "/administration/non-teaching-staff",
        },
      ],
    },
    {
      label: "Admission",
      anchorKey: "admission",
      subItems: [
        { label: "Rules & Regulations", path: "/admission/rules" },
        { label: "Fee Structure", path: "/admission/fee-structure" },
      ],
    },
    {
      label: "Student Zone",
      anchorKey: "studentZone",
      subItems: [
        { label: "Scholarship", path: "/student-zone/scholarship" },
        { label: "Results", path: "/student-zone/results" },
        { label: "Houses", path: "/student-zone/houses" },
      ],
    },
  ];

  // Check if a path is active (for highlighting active links)
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Top contact bar
  const renderTopBar = () => (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        py: 1,
        display: { xs: "none", md: "block" },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon fontSize="small" sx={{ color: "white", mr: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ color: "white", fontWeight: 500 }}
              >
                01905-223145
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MailIcon fontSize="small" sx={{ color: "white", mr: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ color: "white", fontWeight: 500 }}
              >
                davsss.mnd@gmail.com
              </Typography>
            </Box>
          </Box>
          <Badge
            badgeContent={2}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                height: "16px",
                minWidth: "16px",
              },
            }}
          >
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </Box>
      </Container>
    </Box>
  );

  // Main Navbar
  const renderDesktopMenu = () => (
    <HideOnScroll>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          backgroundColor: "white",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
          transition: "background-color 0.3s, box-shadow 0.3s",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo and School Name - Left Side */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <OmLogo
                  sx={{
                    fontSize: 40,
                    color: "primary.main",
                    mr: 1,
                  }}
                />
                <Box>
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      color: "secondary.main",
                      display: "block",
                      lineHeight: 1.2,
                    }}
                  >
                    DAV SSS Mandi
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Nurturing Excellence Since 1944
                  </Typography>
                </Box>
              </Link>
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Navigation Items - Right Side */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  borderRadius: 2,
                  color: isActive("/") ? "primary.main" : "text.primary",
                  fontWeight: isActive("/") ? 600 : 500,
                  position: "relative",
                  "&::after": isActive("/")
                    ? {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "20%",
                        width: "60%",
                        height: "3px",
                        backgroundColor: "primary.main",
                        borderRadius: "3px",
                      }
                    : {},
                }}
              >
                Home
              </Button>

              {menuItems.map((menu) => (
                <div key={menu.label}>
                  <Button
                    onClick={handleMenuOpen(menu.anchorKey)}
                    color="inherit"
                    endIcon={
                      Boolean(anchorEls[menu.anchorKey]) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    }
                    sx={{
                      borderRadius: 2,
                      color: isActive(`/${menu.anchorKey}`)
                        ? "primary.main"
                        : "text.primary",
                      fontWeight: isActive(`/${menu.anchorKey}`) ? 600 : 500,
                      position: "relative",
                      "&::after": isActive(`/${menu.anchorKey}`)
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: "20%",
                            width: "60%",
                            height: "3px",
                            backgroundColor: "primary.main",
                            borderRadius: "3px",
                          }
                        : {},
                    }}
                  >
                    {menu.label}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[menu.anchorKey]}
                    open={Boolean(anchorEls[menu.anchorKey])}
                    onClose={handleMenuClose(menu.anchorKey)}
                    MenuListProps={{
                      "aria-labelledby": `${menu.anchorKey}-button`,
                    }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 180,
                      },
                    }}
                  >
                    {menu.subItems.map((item) => (
                      <MenuItem
                        key={item.label}
                        onClick={handleMenuClose(menu.anchorKey)}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        sx={{
                          borderRadius: 1,
                          my: 0.5,
                          mx: 1,
                          px: 2,
                        }}
                      >
                        <Typography variant="body2">{item.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ))}
              <Button
                color="inherit"
                component={Link}
                to="/gallery"
                sx={{
                  borderRadius: 2,
                  color: isActive("/gallery") ? "primary.main" : "text.primary",
                  fontWeight: isActive("/gallery") ? 600 : 500,
                  position: "relative",
                  "&::after": isActive("/gallery")
                    ? {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "20%",
                        width: "60%",
                        height: "3px",
                        backgroundColor: "primary.main",
                        borderRadius: "3px",
                      }
                    : {},
                }}
              >
                Gallery
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{
                  borderRadius: 2,
                  color: isActive("/contact") ? "primary.main" : "text.primary",
                  fontWeight: isActive("/contact") ? 600 : 500,
                  position: "relative",
                  "&::after": isActive("/contact")
                    ? {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "20%",
                        width: "60%",
                        height: "3px",
                        backgroundColor: "primary.main",
                        borderRadius: "3px",
                      }
                    : {},
                }}
              >
                Contact
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  px: 3,
                  boxShadow: "0 4px 14px rgba(255, 107, 0, 0.4)",
                }}
              >
                Apply Now
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: 280,
          borderRadius: "16px 0 0 16px",
          p: 2,
        },
      }}
    >
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <Link
          to="/"
          onClick={toggleDrawer}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <OmLogo
              sx={{
                fontSize: 50,
                color: "primary.main",
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "secondary.main" }}
            >
              DAV SSS Mandi
            </Typography>
          </Box>
        </Link>
      </Box>

      <Divider sx={{ my: 2 }} />

      <List>
        <ListItem
          button
          component={Link}
          to="/"
          onClick={toggleDrawer}
          selected={isActive("/")}
          sx={{
            borderRadius: 2,
            mb: 1,
            backgroundColor: isActive("/")
              ? "rgba(255, 107, 0, 0.1)"
              : "transparent",
          }}
        >
          <ListItemText
            primary="Home"
            primaryTypographyProps={{
              fontWeight: isActive("/") ? 600 : 500,
              color: isActive("/") ? "primary.main" : "inherit",
            }}
          />
        </ListItem>

        {menuItems.map((menu) => (
          <React.Fragment key={menu.label}>
            <ListItem
              button
              onClick={() => handleMobileMenuToggle(menu.anchorKey)}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: isActive(`/${menu.anchorKey}`)
                  ? "rgba(255, 107, 0, 0.1)"
                  : "transparent",
              }}
            >
              <ListItemText
                primary={menu.label}
                primaryTypographyProps={{
                  fontWeight: isActive(`/${menu.anchorKey}`) ? 600 : 500,
                  color: isActive(`/${menu.anchorKey}`)
                    ? "primary.main"
                    : "inherit",
                }}
              />
              {mobileMenuOpen[menu.anchorKey] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={mobileMenuOpen[menu.anchorKey]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {menu.subItems.map((item) => (
                  <ListItem
                    key={item.label}
                    button
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer}
                    selected={location.pathname === item.path}
                    sx={{
                      pl: 4,
                      borderRadius: 2,
                      mb: 0.5,
                      backgroundColor:
                        location.pathname === item.path
                          ? "rgba(255, 107, 0, 0.05)"
                          : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        variant: "body2",
                        color:
                          location.pathname === item.path
                            ? "primary.main"
                            : "inherit",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}

        <ListItem
          button
          component={Link}
          to="/gallery"
          onClick={toggleDrawer}
          selected={isActive("/gallery")}
          sx={{
            borderRadius: 2,
            mb: 1,
            backgroundColor: isActive("/gallery")
              ? "rgba(255, 107, 0, 0.1)"
              : "transparent",
          }}
        >
          <ListItemText
            primary="Gallery"
            primaryTypographyProps={{
              fontWeight: isActive("/gallery") ? 600 : 500,
              color: isActive("/gallery") ? "primary.main" : "inherit",
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          onClick={toggleDrawer}
          selected={isActive("/contact")}
          sx={{
            borderRadius: 2,
            mb: 1,
            backgroundColor: isActive("/contact")
              ? "rgba(255, 107, 0, 0.1)"
              : "transparent",
          }}
        >
          <ListItemText
            primary="Contact"
            primaryTypographyProps={{
              fontWeight: isActive("/contact") ? 600 : 500,
              color: isActive("/contact") ? "primary.main" : "inherit",
            }}
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            py: 1.5,
            boxShadow: "0 4px 14px rgba(255, 107, 0, 0.4)",
          }}
        >
          Apply Now
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Contact Information
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 0.5 }}>
          Phone: 01905-223145
        </Typography>
        <Typography variant="body2" align="center">
          Email: davsss.mnd@gmail.com
        </Typography>
      </Box>
    </Drawer>
  );

  return (
    <>
      {renderTopBar()}
      {renderDesktopMenu()}
      {renderMobileMenu()}
    </>
  );
}

export default Navbar;
