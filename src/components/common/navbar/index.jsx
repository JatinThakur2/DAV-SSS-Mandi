import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavLogo from "./NavLogo";

function Navbar() {
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

  return (
    <>
      <TopBar />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Mobile logo - only visible on mobile */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            flexGrow: 1,
            p: 2,
          }}
        >
          <NavLogo />
        </Box>

        {/* The mobile navigation button (visible on mobile only) */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <MobileNav />
        </Box>
      </Box>

      {/* Desktop navigation (visible on desktop only) */}
      <DesktopNav scrolled={scrolled} />
    </>
  );
}

export default Navbar;
