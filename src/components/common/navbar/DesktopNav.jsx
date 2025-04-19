import React, { useState } from "react";
import { AppBar, Toolbar, Box, Container, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HideOnScroll from "./HideOnScroll";
import NavLogo from "./NavLogo";
import ApplyNowButton from "./ApplyNowButton";
import { DesktopNavItem } from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import { menuItems } from "./menuItems";

function DesktopNav({ scrolled }) {
  const location = useLocation();
  const [anchorEls, setAnchorEls] = useState({
    about: null,
    administration: null,
    admission: null,
    studentZone: null,
  });

  // Check if a path is active (for highlighting active links)
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleMenuOpen = (menu) => (event) => {
    setAnchorEls({ ...anchorEls, [menu]: event.currentTarget });
  };

  const handleMenuClose = (menu) => () => {
    setAnchorEls({ ...anchorEls, [menu]: null });
  };

  const hasActiveChildren = (menu) => {
    return menu.subItems.some((item) => location.pathname === item.path);
  };

  return (
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
              <NavLogo />
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
                <DesktopNavItem
                  key={menu.label}
                  label={menu.label}
                  path={`/${menu.anchorKey}`}
                  isDropdown={true}
                  isActive={isActive(`/${menu.anchorKey}`)}
                  hasActiveChildren={hasActiveChildren(menu)}
                  anchorEl={anchorEls[menu.anchorKey]}
                  onOpen={handleMenuOpen(menu.anchorKey)}
                  onClose={handleMenuClose(menu.anchorKey)}
                >
                  <DropdownMenu
                    anchorKey={menu.anchorKey}
                    anchorEl={anchorEls[menu.anchorKey]}
                    open={Boolean(anchorEls[menu.anchorKey])}
                    onClose={handleMenuClose(menu.anchorKey)}
                    items={menu.subItems}
                  />
                </DesktopNavItem>
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

              <ApplyNowButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default DesktopNav;
