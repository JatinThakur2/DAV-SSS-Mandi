// src/components/admin/gallery/EnhancedImageDialog.jsx
import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function EnhancedImageDialog({ open, onClose, selectedEventId, setSnackbar }) {
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [processingImage, setProcessingImage] = useState("");

  // Mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileInfo = useMutation(api.files.saveFileInfo);
  const addGalleryImage = useMutation(api.gallery.addGalleryImage);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      try {
        setUploadingImages(true);
        setOverallProgress(0);

        const totalFiles = acceptedFiles.length;
        const uploadedImagesArray = [];

        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i];
          setProcessingImage(file.name);
          setCurrentProgress(0);

          // Update overall progress
          setOverallProgress(Math.round((i / totalFiles) * 100));

          // Get a URL from Convex to upload the file to
          const uploadUrl = await generateUploadUrl();

          // Create a promise to track upload progress
          const uploadPromise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", uploadUrl, true);
            xhr.setRequestHeader("Content-Type", file.type);

            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                setCurrentProgress(progress);
              }
            };

            xhr.onload = () => {
              if (xhr.status === 200) {
                try {
                  const response = JSON.parse(xhr.responseText);
                  resolve(response);
                } catch (err) {
                  reject(new Error("Invalid response from server"));
                }
              } else {
                reject(new Error(`Error uploading file: ${xhr.statusText}`));
              }
            };

            xhr.onerror = () =>
              reject(new Error("Network error during upload"));
            xhr.send(file);
          });

          // Wait for the upload to complete
          const { storageId } = await uploadPromise;

          // Save the file info to get the public URL
          const fileInfo = await saveFileInfo({
            storageId,
            fileName: file.name,
            fileType: file.type,
          });

          // Add to uploaded images array
          uploadedImagesArray.push({
            url: fileInfo.url,
            caption: file.name.split(".")[0], // Default caption from filename
            file,
          });
        }

        setUploadedImages(uploadedImagesArray);
        setOverallProgress(100);

        setSnackbar({
          open: true,
          message: `${uploadedImagesArray.length} images uploaded successfully. Click Save to add them to the event.`,
          severity: "success",
        });
      } catch (error) {
        console.error("Error uploading images:", error);
        setSnackbar({
          open: true,
          message: `Error uploading images: ${error.message}`,
          severity: "error",
        });
      } finally {
        setUploadingImages(false);
        setProcessingImage("");
      }
    },
    [generateUploadUrl, saveFileInfo, setSnackbar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleCaptionChange = (index, caption) => {
    const newImages = [...uploadedImages];
    newImages[index].caption = caption;
    setUploadedImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  // In EnhancedImageDialog.jsx, modify the handleSaveImages function:

  const handleSaveImages = async () => {
    if (!uploadedImages.length || !selectedEventId) return;

    try {
      setUploadingImages(true);
      console.log("Saving images with eventId:", selectedEventId);

      // Save each image to the database
      for (const image of uploadedImages) {
        const result = await addGalleryImage({
          eventId: selectedEventId,
          imageUrl: image.url,
          caption: image.caption,
        });
        console.log("Image saved with result:", result);
      }

      setSnackbar({
        open: true,
        message: `${uploadedImages.length} images added to event successfully`,
        severity: "success",
      });

      // Reset state and close dialog
      setUploadedImages([]);
      onClose();
    } catch (error) {
      console.error("Error saving images:", error);
      // Rest of your code
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Images to Event</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Images
          </Typography>

          {uploadedImages.length === 0 ? (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragActive
                  ? "rgba(0, 0, 0, 0.05)"
                  : "transparent",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                },
                mb: 3,
              }}
            >
              <input {...getInputProps()} />
              {uploadingImages ? (
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body1" gutterBottom>
                    Uploading: {processingImage}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Current file: {currentProgress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={currentProgress}
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Overall progress: {overallProgress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={overallProgress}
                  />
                </Box>
              ) : (
                <>
                  <UploadIcon
                    sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
                  />
                  <Typography variant="body1">
                    Drag and drop images here, or click to select files
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You can select multiple images
                  </Typography>
                </>
              )}
            </Box>
          ) : (
            <>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">
                  {uploadedImages.length} Images Ready to Save
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  onClick={() => setUploadedImages([])}
                  size="small"
                >
                  Upload More
                </Button>
              </Box>

              <Grid container spacing={2}>
                {uploadedImages.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ mb: 2, position: "relative", height: 150 }}>
                        <Box
                          component="img"
                          src={image.url}
                          alt={`Preview ${index}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <Chip
                          label={`Image ${index + 1}`}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "white",
                          }}
                        />
                      </Box>
                      <TextField
                        fullWidth
                        label="Caption"
                        size="small"
                        value={image.caption || ""}
                        onChange={(e) =>
                          handleCaptionChange(index, e.target.value)
                        }
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ mt: "auto" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveImage(index)}
                          fullWidth
                        >
                          Remove
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSaveImages}
          variant="contained"
          disabled={uploadingImages || uploadedImages.length === 0}
          startIcon={uploadedImages.length > 0 ? <CheckIcon /> : null}
        >
          {uploadingImages
            ? "Saving..."
            : `Save ${uploadedImages.length} Images`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnhancedImageDialog;
