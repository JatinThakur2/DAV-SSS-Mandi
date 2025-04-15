// src/pages/admin/GalleryPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
  Snackbar,
  Button,
} from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Refresh as RefreshIcon } from "@mui/icons-material";

// Import components
import EventsList from "../../components/admin/gallery/EventsList";
import EventImages from "../../components/admin/gallery/EventImages";
import EventDialog from "../../components/admin/gallery/EventDialog";
import EnhancedImageDialog from "../../components/admin/gallery/EnhancedImageDialog"; // Import the new component
import DeleteDialog from "../../components/admin/gallery/DeleteDialog";
import ImageViewDialog from "../../components/admin/gallery/ImageViewDialog";
import AddEventButton from "../../components/admin/gallery/AddEventButton";

function GalleryPage() {
  // State for various dialogs
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openImageViewDialog, setOpenImageViewDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [forceRefresh, setForceRefresh] = useState(0);

  // State for data
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    thumbnail: "",
  });
  const [currentEventId, setCurrentEventId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [viewImageUrl, setViewImageUrl] = useState("");

  // State for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch data from Convex with the forceRefresh dependency to allow manual refresh
  const events = useQuery(api.gallery.getGalleryEvents) || [];

  // Only query for images if we have a selected event
  // Adding forceRefresh to dependencies to manually trigger a refresh when needed
  const selectedEventImages = useQuery(
    api.gallery.getGalleryImagesByEvent,
    selectedEventId ? { eventId: selectedEventId } : "skip"
  );

  const selectedEvent = useQuery(
    api.gallery.getGalleryEventById,
    selectedEventId ? { id: selectedEventId } : "skip"
  );
  useEffect(() => {
    if (selectedEventId && selectedEventImages) {
      console.log("Selected Event ID:", selectedEventId);
      console.log("Images for this event:", selectedEventImages);
    }
  }, [selectedEventId, selectedEventImages]);
  // Force a refresh whenever images are added
  useEffect(() => {
    // This effect will run when the component mounts and whenever forceRefresh changes
    if (forceRefresh > 0) {
      // After 2 seconds, refresh the page to ensure the latest data is loaded
      const timer = setTimeout(() => {
        // No need to do anything, the refreshInterval will handle it
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [forceRefresh]);

  // Handler functions
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
        date: new Date().toISOString().split("T")[0],
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
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    // Force a refresh when the dialog is closed to update the images
    setForceRefresh((prev) => prev + 1);
  };

  const handleOpenDeleteDialog = (id, title, isImage = false) => {
    setCurrentEventId(id);
    setCurrentEvent({ ...currentEvent, title });
    setOpenDeleteDialog({ open: true, isImage });
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    // Force a refresh when the dialog is closed to update the list
    setForceRefresh((prev) => prev + 1);
  };

  const handleOpenImageViewDialog = (imageUrl) => {
    setViewImageUrl(imageUrl);
    setOpenImageViewDialog(true);
  };

  const handleCloseImageViewDialog = () => {
    setOpenImageViewDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const selectEvent = (eventId) => {
    setSelectedEventId(eventId);
  };

  const handleRefresh = () => {
    // Increment forceRefresh to trigger a refresh
    setForceRefresh((prev) => prev + 1);
  };

  // If there's an error with the images query, show a message

  const isImagesLoading = selectedEventId && selectedEventImages === undefined;
  const hasNoImages =
    selectedEventId &&
    Array.isArray(selectedEventImages) &&
    selectedEventImages.length === 0;

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Gallery Management</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ ml: 2 }}
          >
            Refresh
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <AddEventButton onAddEvent={() => handleOpenEventDialog("add")} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left side - Events list */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <EventsList
              events={events}
              selectedEventId={selectedEventId}
              onSelectEvent={selectEvent}
              onEditEvent={(event) => handleOpenEventDialog("edit", event)}
              onDeleteEvent={(id, title) => handleOpenDeleteDialog(id, title)}
            />
          </Paper>
        </Grid>

        {/* Right side - Event images */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            {selectedEventId && (
              <Alert
                severity="info"
                sx={{ mb: 3 }}
                action={
                  <Button color="inherit" size="small" onClick={handleRefresh}>
                    Refresh
                  </Button>
                }
              >
                {isImagesLoading
                  ? "Loading images for this event..."
                  : hasNoImages
                    ? "No images found for this event. Click 'Add Images' to upload some."
                    : `Viewing ${selectedEventImages.length} images for this event.`}
              </Alert>
            )}

            <EventImages
              selectedEventId={selectedEventId}
              selectedEvent={selectedEvent}
              eventImages={selectedEventImages}
              onAddImage={handleOpenImageDialog}
              onViewImage={handleOpenImageViewDialog}
              onDeleteImage={(id) =>
                handleOpenDeleteDialog(id, "this image", true)
              }
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <EventDialog
        open={openEventDialog}
        onClose={handleCloseEventDialog}
        mode={dialogMode}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        setSnackbar={setSnackbar}
      />

      {/* Use EnhancedImageDialog instead of ImageDialog */}
      <EnhancedImageDialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        selectedEventId={selectedEventId}
        setSnackbar={setSnackbar}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        isImage={openDeleteDialog && openDeleteDialog.isImage}
        eventId={currentEventId}
        eventTitle={currentEvent.title}
        selectedEventId={selectedEventId}
        setSelectedEventId={setSelectedEventId}
        setSnackbar={setSnackbar}
      />

      <ImageViewDialog
        open={openImageViewDialog}
        onClose={handleCloseImageViewDialog}
        imageUrl={viewImageUrl}
      />

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
