import React, { useState } from "react";
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
} from "@mui/material";
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

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

  const renderDesktopMenu = () => (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Logo and School Name - Left Side */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="span">
            DAV SSS Mandi
          </Typography>
        </Link>
      </Box>

      {/* Navigation Items - Right Side */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {menuItems.map((menu) => (
          <div key={menu.label}>
            <Button
              onClick={handleMenuOpen(menu.anchorKey)}
              color="inherit"
              sx={{
                borderBottom: isActive("/" + menu.anchorKey)
                  ? "2px solid white"
                  : "none",
                borderRadius: 0,
                mx: 0.5,
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
            >
              {menu.subItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleMenuClose(menu.anchorKey)}
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  {item.label}
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
            borderBottom: isActive("/gallery") ? "2px solid white" : "none",
            borderRadius: 0,
            mx: 0.5,
          }}
        >
          Gallery
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/contact"
          sx={{
            borderBottom: isActive("/contact") ? "2px solid white" : "none",
            borderRadius: 0,
            mx: 0.5,
          }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
      <List sx={{ width: 250 }}>
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <ListItemText primary="Home" />
        </ListItem>

        {menuItems.map((menu) => (
          <React.Fragment key={menu.label}>
            <ListItem
              button
              onClick={() => handleMobileMenuToggle(menu.anchorKey)}
            >
              <ListItemText primary={menu.label} />
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
                    sx={{ pl: 4 }}
                    selected={location.pathname === item.path}
                  >
                    <ListItemText primary={item.label} />
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
        >
          <ListItemText primary="Gallery" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          onClick={toggleDrawer}
          selected={isActive("/contact")}
        >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {renderDesktopMenu()}
        </Toolbar>
      </AppBar>
      {renderMobileMenu()}
    </>
  );
}

export default Navbar;
