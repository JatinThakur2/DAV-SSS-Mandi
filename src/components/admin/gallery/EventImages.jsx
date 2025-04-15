// src/components/admin/gallery/EventImages.jsx
import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  CircularProgress,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Event as EventIcon,
  Image as ImageIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";

function EventImages({
  selectedEventId,
  selectedEvent,
  eventImages,
  onAddImage,
  onViewImage,
  onDeleteImage,
}) {
  // Check the type and state of the eventImages prop to properly handle different states
  const isLoading = selectedEventId && eventImages === undefined;
  const isSkipped = eventImages === "skip";
  const hasNoImages = Array.isArray(eventImages) && eventImages.length === 0;

  if (!selectedEventId) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <ImageIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          No Event Selected
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select an event from the left panel to view and manage its images.
        </Typography>
      </Box>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <Box>
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
              {selectedEvent?.title || "Loading..."}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <EventIcon
                sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
              />
              {selectedEvent?.date || "Loading..."}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddImage}
          >
            Add Images
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // Handle case where the query was skipped (no event selected)
  if (isSkipped) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <ErrorIcon sx={{ fontSize: 60, color: "warning.main", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Query Skipped
        </Typography>
        <Typography variant="body1" color="text.secondary">
          There was an issue querying images for this event. Please try
          selecting the event again.
        </Typography>
      </Box>
    );
  }

  return (
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
          <Typography variant="h5">{selectedEvent?.title || ""}</Typography>
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
          onClick={onAddImage}
        >
          Add Images
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {hasNoImages ? (
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: 3,
            textAlign: "center",
            borderStyle: "dashed",
            bgcolor: "background.paper",
          }}
        >
          <ImageIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Images Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            No images found for this event. Click the "Add Images" button to
            upload some.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddImage}
            sx={{ mt: 2 }}
          >
            Add Images Now
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {eventImages.map((image) => (
            <Grid item key={image._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={image.imageUrl}
                  alt={image.caption || "Gallery image"}
                  sx={{
                    objectFit: "cover",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                  }}
                  onClick={() => onViewImage(image.imageUrl)}
                  onError={(e) => {
                    // Handle image loading errors
                    e.target.src = "/api/placeholder/400/300";
                    e.target.alt = "Failed to load image";
                  }}
                />
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="body2" noWrap color="text.secondary">
                    {image.caption || "No caption"}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ display: "block", mt: 0.5 }}
                  >
                    ID: {image._id.slice(-6)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onViewImage(image.imageUrl)}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDeleteImage(image._id)}
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
  );
}

export default EventImages;
