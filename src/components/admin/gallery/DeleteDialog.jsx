// src/components/admin/gallery/DeleteDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function DeleteDialog({
  open,
  onClose,
  isImage,
  eventId,
  eventTitle,
  selectedEventId,
  setSelectedEventId,
  setSnackbar,
}) {
  // Mutations
  const deleteGalleryEvent = useMutation(api.gallery.deleteGalleryEvent);
  const deleteGalleryImage = useMutation(api.gallery.deleteGalleryImage);

  const handleDelete = async () => {
    try {
      if (isImage) {
        await deleteGalleryImage({ id: eventId });
        setSnackbar({
          open: true,
          message: "Image deleted successfully",
          severity: "success",
        });
      } else {
        await deleteGalleryEvent({ id: eventId });
        setSnackbar({
          open: true,
          message: "Event deleted successfully",
          severity: "success",
        });

        if (selectedEventId === eventId) {
          setSelectedEventId(null);
        }
      }
      onClose();
    } catch (error) {
      console.error(`Error deleting ${isImage ? "image" : "event"}:`, error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isImage
            ? `Are you sure you want to delete this image? This action cannot be undone.`
            : `Are you sure you want to delete the event "${eventTitle}"? All images associated with this event will also be deleted. This action cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
