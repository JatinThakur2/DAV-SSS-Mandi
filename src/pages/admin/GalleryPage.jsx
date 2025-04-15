// src/pages/admin/GalleryPage.jsx
import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  CircularProgress,
  Alert,
  Snackbar,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Event as EventIcon,
  CloudUpload as UploadIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useDropzone } from "react-dropzone";
import { format } from "date-fns";

function GalleryPage() {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openImageViewDialog, setOpenImageViewDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
    thumbnail: "",
  });
  const [currentEventId, setCurrentEventId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageCaption, setImageCaption] = useState("");
  const [viewImageUrl, setViewImageUrl] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Convex API hooks
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileInfo = useMutation(api.files.saveFileInfo);

  const events = useQuery(api.gallery.getGalleryEvents) || [];
  const selectedEventImages =
    useQuery(
      api.gallery.getGalleryImagesByEvent,
      selectedEventId ? { eventId: selectedEventId } : null
    ) || [];
  const selectedEvent = useQuery(
    api.gallery.getGalleryEventById,
    selectedEventId ? { id: selectedEventId } : null
  );

  const addGalleryEvent = useMutation(api.gallery.addGalleryEvent);
  const updateGalleryEvent = useMutation(api.gallery.updateGalleryEvent);
  const deleteGalleryEvent = useMutation(api.gallery.deleteGalleryEvent);
  const addGalleryImage = useMutation(api.gallery.addGalleryImage);
  const deleteGalleryImage = useMutation(api.gallery.deleteGalleryImage);

  const onDropThumbnail = useCallback(
    async (acceptedFiles) => {
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
    },
    [currentEvent, generateUploadUrl, saveFileInfo]
  );

  const onDropEventImage = useCallback(
    async (acceptedFiles) => {
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
    },
    [generateUploadUrl, saveFileInfo]
  );

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const {
    getRootProps: getEventImageRootProps,
    getInputProps: getEventImageInputProps,
  } = useDropzone({
    onDrop: onDropEventImage,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleOpenEventDialog = (mode, event = null) => {
    setDialogMode(mode);
    if (mode === "edit" && event) {
      setCurrentEvent({
        title: event.title,
        date: event.date,
        description: event.description,
        thumbnail: event.thumbnail,
      });
      setCurrentEventId(event._id);
    } else {
      setCurrentEvent({
        title: "",
        date: format(new Date(), "yyyy-MM-dd"),
        description: "",
        thumbnail: "",
      });
      setCurrentEventId(null);
    }
    setOpenEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
  };

  const handleOpenImageDialog = () => {
    setUploadedImage(null);
    setImageCaption("");
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleOpenDeleteDialog = (id, title, isImage = false) => {
    setCurrentEventId(id);
    setCurrentEvent({ ...currentEvent, title });
    setOpenDeleteDialog({ open: true, isImage });
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenImageViewDialog = (imageUrl) => {
    setViewImageUrl(imageUrl);
    setOpenImageViewDialog(true);
  };

  const handleCloseImageViewDialog = () => {
    setOpenImageViewDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value,
    });
  };

  const handleSaveEvent = async () => {
    try {
      if (dialogMode === "add") {
        const result = await addGalleryEvent(currentEvent);
        setSnackbar({
          open: true,
          message: `Event "${currentEvent.title}" added successfully`,
          severity: "success",
        });

        // Select the newly created event
        setSelectedEventId(result);
      } else {
        await updateGalleryEvent({
          id: currentEventId,
          ...currentEvent,
        });
        setSnackbar({
          open: true,
          message: `Event "${currentEvent.title}" updated successfully`,
          severity: "success",
        });
      }
      handleCloseEventDialog();
    } catch (error) {
      console.error("Error saving event:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleSaveImage = async () => {
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

      handleCloseImageDialog();
    } catch (error) {
      console.error("Error saving image:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteGalleryEvent({ id: currentEventId });

      setSnackbar({
        open: true,
        message: "Event deleted successfully",
        severity: "success",
      });

      if (selectedEventId === currentEventId) {
        setSelectedEventId(null);
      }

      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting event:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleDeleteImage = async () => {
    try {
      await deleteGalleryImage({ id: currentEventId });

      setSnackbar({
        open: true,
        message: "Image deleted successfully",
        severity: "success",
      });

      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting image:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const selectEvent = (eventId) => {
    setSelectedEventId(eventId);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Gallery Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenEventDialog("add")}
        >
          Add New Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left side - Events list */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Events
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {events.length === 0 ? (
              <Alert severity="info">
                No gallery events found. Click the "Add New Event" button to
                create your first event.
              </Alert>
            ) : (
              <Stack spacing={2}>
                {events.map((event) => (
                  <Card
                    key={event._id}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                      border:
                        selectedEventId === event._id ? "2px solid" : "none",
                      borderColor: "primary.main",
                    }}
                    onClick={() => selectEvent(event._id)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.thumbnail || "/api/placeholder/400/300"}
                      alt={event.title}
                    />
                    <CardContent sx={{ pb: 1 }}>
                      <Typography variant="h6" noWrap>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <EventIcon
                          sx={{
                            fontSize: 14,
                            mr: 0.5,
                            verticalAlign: "middle",
                          }}
                        />
                        {event.date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEventDialog("edit", event);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeleteDialog(event._id, event.title);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* Right side - Event images */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {selectedEventId ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h5">
                      {selectedEvent?.title || ""}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <EventIcon
                        sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                      />
                      {selectedEvent?.date || ""}
                    </Typography>
                    {selectedEvent?.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {selectedEvent.description}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenImageDialog}
                  >
                    Add Images
                  </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {selectedEventImages.length === 0 ? (
                  <Alert severity="info">
                    No images found for this event. Click the "Add Images"
                    button to upload some.
                  </Alert>
                ) : (
                  <Grid container spacing={2}>
                    {selectedEventImages.map((image) => (
                      <Grid item key={image._id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: "100%" }}>
                          <CardMedia
                            component="img"
                            height="120"
                            image={image.imageUrl}
                            alt={image.caption || "Gallery image"}
                            sx={{ objectFit: "cover", cursor: "pointer" }}
                            onClick={() =>
                              handleOpenImageViewDialog(image.imageUrl)
                            }
                          />
                          <CardContent sx={{ py: 1 }}>
                            <Typography
                              variant="body2"
                              noWrap
                              color="text.secondary"
                            >
                              {image.caption || "No caption"}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                handleOpenImageViewDialog(image.imageUrl)
                              }
                            >
                              <ViewIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() =>
                                handleOpenDeleteDialog(
                                  image._id,
                                  "this image",
                                  true
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <ImageIcon
                  sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  No Event Selected
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Select an event from the left panel to view and manage its
                  images.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Event Dialog */}
      <Dialog
        open={openEventDialog}
        onClose={handleCloseEventDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add New Event" : "Edit Event"}
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
                {...getThumbnailRootProps()}
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
                <input {...getThumbnailInputProps()} />
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
          <Button onClick={handleCloseEventDialog}>Cancel</Button>
          <Button
            onClick={handleSaveEvent}
            variant="contained"
            disabled={
              !currentEvent.title ||
              !currentEvent.date ||
              !currentEvent.thumbnail
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="sm"
        fullWidth
      >
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
                {...getEventImageRootProps()}
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
                <input {...getEventImageInputProps()} />
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
          <Button onClick={handleCloseImageDialog}>Cancel</Button>
          <Button
            onClick={handleSaveImage}
            variant="contained"
            disabled={!uploadedImage}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(openDeleteDialog)}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {openDeleteDialog && openDeleteDialog.isImage
              ? `Are you sure you want to delete this image? This action cannot be undone.`
              : `Are you sure you want to delete the event "${currentEvent.title}"? All images associated with this event will also be deleted. This action cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={
              openDeleteDialog && openDeleteDialog.isImage
                ? handleDeleteImage
                : handleDeleteEvent
            }
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image View Dialog */}
      <Dialog
        open={openImageViewDialog}
        onClose={handleCloseImageViewDialog}
        maxWidth="lg"
      >
        <DialogContent sx={{ p: 1 }}>
          <img
            src={viewImageUrl}
            alt="Gallery image"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              display: "block",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default GalleryPage;
