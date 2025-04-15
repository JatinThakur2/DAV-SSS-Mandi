// src/components/admin/gallery/ImageDialog.jsx
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

function ImageDialog({
  open,
  onClose,
  selectedEventId,
  imageCaption,
  setImageCaption,
  uploadedImage,
  setUploadedImage,
  setSnackbar,
}) {
  const [uploadingImage, setUploadingImage] = useState(false);

  // Mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileInfo = useMutation(api.files.saveFileInfo);
  const addGalleryImage = useMutation(api.gallery.addGalleryImage);

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

      setUploadedImage(fileInfo.url);

      setSnackbar({
        open: true,
        message:
          "Image uploaded successfully. Click Save to add it to the event.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setSnackbar({
        open: true,
        message: `Error uploading image: ${error.message}`,
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
    if (!uploadedImage || !selectedEventId) return;

    try {
      await addGalleryImage({
        eventId: selectedEventId,
        imageUrl: uploadedImage,
        caption: imageCaption,
      });

      setSnackbar({
        open: true,
        message: "Image added to event successfully",
        severity: "success",
      });

      onClose();
    } catch (error) {
      console.error("Error saving image:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Image to Event</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Image
          </Typography>

          {uploadedImage ? (
            <Box sx={{ mb: 3 }}>
              <img
                src={uploadedImage}
                alt="Uploaded event image"
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
                onClick={() => setUploadedImage(null)}
              >
                Remove Image
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
                mb: 3,
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
                </>
              )}
            </Box>
          )}

          <TextField
            margin="dense"
            label="Image Caption (Optional)"
            fullWidth
            value={imageCaption}
            onChange={(e) => setImageCaption(e.target.value)}
            disabled={!uploadedImage}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!uploadedImage}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImageDialog;
