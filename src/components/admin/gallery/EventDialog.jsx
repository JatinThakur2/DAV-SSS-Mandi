// src/components/admin/gallery/EventDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CloudUpload as UploadIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function EventDialog({
  open,
  onClose,
  mode,
  currentEvent,
  setCurrentEvent,
  setSnackbar,
}) {
  const [uploadingImage, setUploadingImage] = useState(false);

  // Mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileInfo = useMutation(api.files.saveFileInfo);
  const addGalleryEvent = useMutation(api.gallery.addGalleryEvent);
  const updateGalleryEvent = useMutation(api.gallery.updateGalleryEvent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    try {
      setUploadingImage(true);

      // Get a URL from Convex to upload the file to
      const uploadUrl = await generateUploadUrl();

      // Upload the file to the URL
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Error uploading file: ${result.statusText}`);
      }

      // Get the storageId from the response
      const { storageId } = await result.json();

      // Save the file info to get the public URL
      const fileInfo = await saveFileInfo({
        storageId,
        fileName: file.name,
        fileType: file.type,
      });

      setCurrentEvent({
        ...currentEvent,
        thumbnail: fileInfo.url,
      });

      setSnackbar({
        open: true,
        message: "Thumbnail uploaded successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      setSnackbar({
        open: true,
        message: `Error uploading thumbnail: ${error.message}`,
        severity: "error",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSave = async () => {
    try {
      if (mode === "add") {
        await addGalleryEvent(currentEvent);
        setSnackbar({
          open: true,
          message: `Event "${currentEvent.title}" added successfully`,
          severity: "success",
        });
      } else {
        await updateGalleryEvent({
          id: currentEvent._id,
          ...currentEvent,
        });
        setSnackbar({
          open: true,
          message: `Event "${currentEvent.title}" updated successfully`,
          severity: "success",
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {mode === "add" ? "Add New Event" : "Edit Event"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            fullWidth
            value={currentEvent.title}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
          />

          <TextField
            margin="dense"
            name="date"
            label="Event Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={currentEvent.date}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
          />

          <TextField
            margin="dense"
            name="description"
            label="Event Description"
            multiline
            rows={3}
            fullWidth
            value={currentEvent.description}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" gutterBottom>
            Event Thumbnail
          </Typography>

          {currentEvent.thumbnail ? (
            <Box sx={{ mb: 2 }}>
              <img
                src={currentEvent.thumbnail}
                alt="Event thumbnail"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() =>
                  setCurrentEvent({ ...currentEvent, thumbnail: "" })
                }
              >
                Remove Thumbnail
              </Button>
            </Box>
          ) : (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                },
              }}
            >
              <input {...getInputProps()} />
              {uploadingImage ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  <UploadIcon
                    sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
                  />
                  <Typography variant="body1">
                    Drag and drop an image here, or click to select a file
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recommended size: 800x600 pixels
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={
            !currentEvent.title || !currentEvent.date || !currentEvent.thumbnail
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDialog;
