// src/pages/admin/GalleryPage.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Alert, Snackbar } from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Import smaller components
import EventsList from "../../components/admin/gallery/EventsList";
import EventImages from "../../components/admin/gallery/EventImages";
import EventDialog from "../../components/admin/gallery/EventDialog";
import ImageDialog from "../../components/admin/gallery/ImageDialog";
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

  // State for data
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    thumbnail: "",
  });
  const [currentEventId, setCurrentEventId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [viewImageUrl, setViewImageUrl] = useState("");

  // State for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch data from Convex
  const events = useQuery(api.gallery.getGalleryEvents) || [];

  // Only query for images if we have a selected event
  const selectedEventImages =
    useQuery(
      api.gallery.getGalleryImagesByEvent,
      selectedEventId ? { eventId: selectedEventId } : "skip"
    ) || [];

  const selectedEvent = useQuery(
    api.gallery.getGalleryEventById,
    selectedEventId ? { id: selectedEventId } : "skip"
  );

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
        <AddEventButton onAddEvent={() => handleOpenEventDialog("add")} />
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

      <ImageDialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        selectedEventId={selectedEventId}
        imageCaption={imageCaption}
        setImageCaption={setImageCaption}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
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
