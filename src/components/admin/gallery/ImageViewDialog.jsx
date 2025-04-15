// src/components/admin/gallery/ImageViewDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

function ImageViewDialog({ open, onClose, imageUrl }) {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{ p: 1, position: "relative" }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Enlarged view"
            style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageViewDialog;
