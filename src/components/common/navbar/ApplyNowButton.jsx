import React from "react";
import { Button } from "@mui/material";

function ApplyNowButton({ isMobile = false }) {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth={isMobile}
      sx={{
        ml: isMobile ? 0 : 2,
        px: 3,
        py: isMobile ? 1.5 : undefined,
        boxShadow: "0 4px 14px rgba(255, 107, 0, 0.4)",
      }}
    >
      Apply Now
    </Button>
  );
}

export default ApplyNowButton;
