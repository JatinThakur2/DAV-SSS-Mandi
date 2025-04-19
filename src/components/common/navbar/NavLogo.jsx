import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import OmLogo from "../OmLogo";

function NavLogo({ isMobile = false, onClick = null }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <OmLogo
          sx={{
            fontSize: isMobile ? 50 : 40,
            color: "primary.main",
            mr: isMobile ? 0 : 1,
            mb: isMobile ? 1 : 0,
          }}
        />
        <Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="span"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              color: "secondary.main",
              display: "block",
              lineHeight: 1.2,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            DAV SSS Mandi
          </Typography>
          {!isMobile && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: { xs: "none", sm: "block" },
              }}
            >
              Nurturing Excellence Since 1944
            </Typography>
          )}
        </Box>
      </Box>
    </Link>
  );
}

export default NavLogo;
