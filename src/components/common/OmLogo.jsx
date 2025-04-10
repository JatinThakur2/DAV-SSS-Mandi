// src/components/common/OmLogo.jsx
import React from "react";
import { Box } from "@mui/material";

function OmLogo(props) {
  const { sx = {}, white = false, ...otherProps } = props;

  // Get the fontSize from sx props or default to 40
  const size = sx.fontSize || 40;

  // Choose which logo to use based on the 'white' prop
  const logoSrc = white
    ? "/images/dav-logo-white.svg"
    : "/images/dav-logo-black.svg";

  return (
    <Box
      component="img"
      src={logoSrc}
      alt="DAV School Logo"
      sx={{
        height: size,
        width: "auto",
        ...sx,
      }}
      {...otherProps}
    />
  );
}

export default OmLogo;
