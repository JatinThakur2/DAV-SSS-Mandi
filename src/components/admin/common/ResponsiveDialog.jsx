// src/components/admin/common/ResponsiveDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

/**
 * A responsive dialog component that adjusts to different screen sizes
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when the dialog is closed
 * @param {string} props.title - The dialog title
 * @param {React.ReactNode} props.children - The dialog content
 * @param {React.ReactNode} props.actions - The dialog actions
 * @param {string} props.maxWidth - Maximum width of the dialog (xs, sm, md, lg, xl)
 * @param {boolean} props.fullScreen - Whether the dialog should be full screen on mobile
 * @param {Object} props.sx - Additional styles for the dialog
 */
function ResponsiveDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "md",
  fullScreen: forcedFullScreen = false,
  sx = {},
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = forcedFullScreen || isMobile;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
          ...sx,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: fullScreen ? 2 : 3,
        }}
      >
        <Typography variant={fullScreen ? "h6" : "h5"}>{title}</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: fullScreen ? 2 : 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ p: fullScreen ? 2 : 3 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}

export default ResponsiveDialog;
