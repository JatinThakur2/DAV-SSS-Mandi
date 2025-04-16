// src/components/admin/common/ResponsiveFormGrid.jsx
import React from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";

/**
 * A responsive form grid component that adjusts the layout based on screen size
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The form fields
 * @param {number} props.spacing - Grid spacing
 * @param {Object} props.sx - Additional styles
 * @param {number} props.xs - Grid item width on extra small screens
 * @param {number} props.sm - Grid item width on small screens
 * @param {number} props.md - Grid item width on medium screens
 * @param {number} props.lg - Grid item width on large screens
 */
function ResponsiveFormGrid({
  children,
  spacing = 2,
  sx = {},
  xs = 12,
  sm = 6,
  md = 4,
  lg = 3,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // For mobile, we use a simpler vertical layout with full-width inputs
  if (isMobile) {
    return (
      <Box sx={{ mt: 2, ...sx }}>
        {React.Children.map(children, (child, index) => (
          <Box key={index} sx={{ mb: spacing }}>
            {child}
          </Box>
        ))}
      </Box>
    );
  }

  // For larger screens, use the Grid layout
  return (
    <Grid container spacing={spacing} sx={sx}>
      {React.Children.map(children, (child, index) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} key={index}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
}

// A component specifically for form fields that should be full width
export function FullWidthFormField({ children, sx = {} }) {
  return (
    <Grid item xs={12} sx={sx}>
      {children}
    </Grid>
  );
}

export default ResponsiveFormGrid;
