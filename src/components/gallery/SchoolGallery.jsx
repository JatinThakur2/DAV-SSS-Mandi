import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Grid,
  Skeleton,
  Alert,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
import {
  Event as EventIcon,
  CalendarMonth as CalendarIcon,
  PhotoLibrary as GalleryIcon,
} from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Import our enhanced image dialog component
import EnhancedImageViewDialog from "./EnhancedImageViewDialog";

function SchoolGallery() {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch gallery events from Convex
  const galleryEventsResult = useQuery(api.gallery.getGalleryEvents);

  // Use useMemo to memoize the galleryEvents array
  const galleryEvents = useMemo(() => {
    return galleryEventsResult || [];
  }, [galleryEventsResult]);

  // Fetch the currently viewed event's images
  const selectedEventImages =
    useQuery(
      api.gallery.getGalleryImagesByEvent,
      selectedEventId ? { eventId: selectedEventId } : "skip"
    ) || [];

  // Get the selected event details
  const selectedEvent = useMemo(() => {
    if (!selectedEventId || !galleryEvents) return null;
    return galleryEvents.find((event) => event._id === selectedEventId);
  }, [selectedEventId, galleryEvents]);

  // Loading state
  const isLoading = galleryEventsResult === undefined;
  const isLoadingImages = selectedEventId && selectedEventImages === undefined;

  // Get years for tabs - safely handle undefined or empty array
  const years = useMemo(() => {
    if (!Array.isArray(galleryEvents)) return [];
    return [
      ...new Set(
        galleryEvents
          .map((event) => {
            if (!event || !event.date) return null;
            const dateMatch = event.date.match(/\d{4}/);
            return dateMatch ? dateMatch[0] : null;
          })
          .filter(Boolean)
      ),
    ]
      .sort()
      .reverse();
  }, [galleryEvents]);

  // Set the default tab value based on available years
  React.useEffect(() => {
    if (years.length > 0 && currentTab >= years.length) {
      setCurrentTab(0);
    }
  }, [years, currentTab]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSelectedEventId(null); // Reset selected event when changing tabs
  };

  // Create an array of image URLs for the dialog
  const imageUrls = useMemo(() => {
    return selectedEventImages?.map((image) => image.imageUrl) || [];
  }, [selectedEventImages]);

  const handleOpenImage = (index) => {
    setCurrentImageIndex(index);
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleNavigate = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId);
  };

  // Helper to get events by year - safely handles null or undefined
  const getEventsByYear = (year) => {
    if (!Array.isArray(galleryEvents)) return [];
    return galleryEvents.filter(
      (event) => event && event.date && event.date.includes(year)
    );
  };

  // Function to render the gallery grid
  const renderGalleryGrid = (images) => {
    if (!images || images.length === 0) {
      return <Alert severity="info">No images available for this event.</Alert>;
    }

    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={image.imageUrl}
                alt={image.caption || "Gallery image"}
                sx={{
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => handleOpenImage(index)}
              />
              {image.caption && (
                <CardContent sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {image.caption}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        School Gallery
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          Explore photos and memories from our school events and activities.
          Browse through our collection of images that capture special moments
          and achievements at DAV Senior Secondary School, Mandi.
        </Typography>
      </Box>

      {isLoading ? (
        // Loading skeleton
        <>
          <Skeleton variant="rectangular" height={48} sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" height={40} sx={{ mt: 1 }} />
                <Skeleton variant="text" height={20} width="40%" />
                <Skeleton variant="text" height={60} sx={{ mt: 1 }} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : !Array.isArray(galleryEvents) || galleryEvents.length === 0 ? (
        // No events case
        <Alert severity="info">
          No gallery events available at the moment.
        </Alert>
      ) : (
        <>
          {years.length > 0 && (
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
              <Tabs
                value={currentTab < years.length ? currentTab : 0}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                aria-label="gallery year tabs"
              >
                {years.map((year, index) => (
                  <Tab key={index} label={year} />
                ))}
              </Tabs>
            </Box>
          )}

          {years.map((year, yearIndex) => {
            // Get events for this year
            const yearEvents = getEventsByYear(year);

            return (
              <Box
                key={yearIndex}
                sx={{ display: currentTab === yearIndex ? "block" : "none" }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CalendarIcon sx={{ mr: 1 }} />
                  Events of {year}
                </Typography>

                <Grid container spacing={4}>
                  {yearEvents.length === 0 ? (
                    <Grid item xs={12}>
                      <Alert severity="info">
                        No events found for the year {year}.
                      </Alert>
                    </Grid>
                  ) : (
                    yearEvents.map((event) => {
                      if (!event || !event._id) return null;

                      // Check if this is the selected event
                      const isSelected = selectedEventId === event._id;

                      return (
                        <Grid item xs={12} sm={6} md={4} key={event._id}>
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                              },
                              border: isSelected ? "2px solid" : "none",
                              borderColor: isSelected
                                ? "primary.main"
                                : "transparent",
                            }}
                            onClick={() => handleSelectEvent(event._id)}
                          >
                            <CardMedia
                              component="img"
                              height="200"
                              image={
                                event.thumbnail || "/api/placeholder/800/500"
                              }
                              alt={event.title || "Event"}
                              sx={{ cursor: "pointer" }}
                            />
                            <CardContent
                              sx={{ flexGrow: 1, position: "relative" }}
                            >
                              <Typography variant="h6" gutterBottom>
                                {event.title || "Untitled Event"}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                                {event.date || "No date available"}
                              </Typography>

                              {/* Add an image count chip */}
                              {isSelected && selectedEventImages && (
                                <Chip
                                  icon={<GalleryIcon />}
                                  label={`${selectedEventImages.length} Images`}
                                  size="small"
                                  color="primary"
                                  sx={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                  }}
                                />
                              )}

                              <Divider sx={{ my: 1 }} />
                              <Typography variant="body2">
                                {event.description ||
                                  "No description available"}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                  )}
                </Grid>

                {/* Display images for selected event */}
                {selectedEventId && (
                  <Box sx={{ mt: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                      <Typography variant="h5" gutterBottom>
                        {yearEvents.find((e) => e._id === selectedEventId)
                          ?.title || "Event"}{" "}
                        - Images
                      </Typography>

                      {isLoadingImages ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 4,
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      ) : selectedEventImages.length === 0 ? (
                        <Alert severity="info" sx={{ mt: 2 }}>
                          No images available for this event.
                        </Alert>
                      ) : (
                        renderGalleryGrid(selectedEventImages)
                      )}
                    </Paper>
                  </Box>
                )}
              </Box>
            );
          })}
        </>
      )}

      {/* Enhanced Image Viewer Dialog */}
      <EnhancedImageViewDialog
        open={openImage}
        onClose={handleCloseImage}
        currentImageUrl={imageUrls[currentImageIndex]}
        allImages={imageUrls}
        currentIndex={currentImageIndex}
        onNavigate={handleNavigate}
        eventTitle={selectedEvent?.title || "Gallery"}
      />
    </Container>
  );
}

export default SchoolGallery;
