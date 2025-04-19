import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  Divider,
  Typography,
  Collapse,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo";
import { MobileNavItem } from "./NavItem";
import ApplyNowButton from "./ApplyNowButton";
import { menuItems } from "./menuItems";

function MobileNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState({
    about: false,
    administration: false,
    admission: false,
    studentZone: false,
  });

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuToggle = (menu) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Check if a path is active (for highlighting active links)
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
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

      {/* Mobile Drawer */}
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
          <NavLogo isMobile={true} onClick={toggleDrawer} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <List>
          <MobileNavItem
            label="Home"
            path="/"
            isActive={isActive("/")}
            onClick={toggleDrawer}
          />

          {menuItems.map((menu) => (
            <React.Fragment key={menu.label}>
              <MobileNavItem
                label={menu.label}
                isDropdown={true}
                isActive={isActive(`/${menu.anchorKey}`)}
                isOpen={mobileMenuOpen[menu.anchorKey]}
                onToggle={() => handleMobileMenuToggle(menu.anchorKey)}
              >
                <Collapse
                  in={mobileMenuOpen[menu.anchorKey]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {menu.subItems.map((item) => (
                      <MobileNavItem
                        key={item.label}
                        label={item.label}
                        path={item.path}
                        isActive={location.pathname === item.path}
                        onClick={toggleDrawer}
                        sx={{ pl: 4 }}
                      />
                    ))}
                  </List>
                </Collapse>
              </MobileNavItem>
            </React.Fragment>
          ))}

          <MobileNavItem
            label="Gallery"
            path="/gallery"
            isActive={isActive("/gallery")}
            onClick={toggleDrawer}
          />

          <MobileNavItem
            label="Contact"
            path="/contact"
            isActive={isActive("/contact")}
            onClick={toggleDrawer}
          />
        </List>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <ApplyNowButton isMobile={true} />
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
    </>
  );
}

export default MobileNav;
