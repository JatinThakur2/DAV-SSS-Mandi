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
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Event as EventIcon,
  Image as ImageIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function EventImages({
  selectedEventId,
  selectedEvent,
  eventImages,
  onAddImage,
  onViewImage,
  onDeleteImage,
}) {
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

      {eventImages.length === 0 ? (
        <Alert severity="info">
          No images found for this event. Click the "Add Images" button to
          upload some.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {eventImages.map((image) => (
            <Grid item key={image._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={image.imageUrl}
                  alt={image.caption || "Gallery image"}
                  sx={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={() => onViewImage(image.imageUrl)}
                />
                <CardContent sx={{ py: 1 }}>
                  <Typography variant="body2" noWrap color="text.secondary">
                    {image.caption || "No caption"}
                  </Typography>
                </CardContent>
                <CardActions>
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
