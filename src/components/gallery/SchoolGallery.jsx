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
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  Event as EventIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function SchoolGallery() {
  const [currentTab, setCurrentTab] = useState(0);
  const [openImage, setOpenImage] = useState(null);

  // Fetch gallery events from Convex
  const galleryEvents = useQuery(api.gallery.getGalleryEvents) || [];

  // Loading state
  const isLoading = galleryEvents === undefined;

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
  };

  const handleOpenImage = (image) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  // Helper to get events by year - safely handles null or undefined
  const getEventsByYear = (year) => {
    if (!Array.isArray(galleryEvents)) return [];
    return galleryEvents.filter(
      (event) => event && event.date && event.date.includes(year)
    );
  };

  // Pre-fetch all event images outside of the render loop
  const eventImagesMap = useMemo(() => {
    const imagesMap = new Map();

    if (Array.isArray(galleryEvents)) {
      galleryEvents.forEach((event) => {
        if (event && event._id) {
          const eventImages =
            useQuery(api.gallery.getGalleryImagesByEvent, {
              eventId: event._id,
            }) || [];
          imagesMap.set(event._id, eventImages);
        }
      });
    }

    return imagesMap;
  }, [galleryEvents]);

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

          {years.map((year, yearIndex) => (
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
                {getEventsByYear(year).length === 0 ? (
                  <Grid item xs={12}>
                    <Alert severity="info">
                      No events found for the year {year}.
                    </Alert>
                  </Grid>
                ) : (
                  getEventsByYear(year).map((event) => {
                    if (!event || !event._id) return null;

                    // Get pre-fetched images for this event
                    const eventImages = eventImagesMap.get(event._id) || [];

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
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={
                              event.thumbnail || "/api/placeholder/800/500"
                            }
                            alt={event.title || "Event"}
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              if (
                                Array.isArray(eventImages) &&
                                eventImages.length > 0 &&
                                eventImages[0]?.imageUrl
                              ) {
                                handleOpenImage(eventImages[0].imageUrl);
                              } else if (event.thumbnail) {
                                handleOpenImage(event.thumbnail);
                              }
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
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
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">
                              {event.description || "No description available"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Box>
          ))}
        </>
      )}

      {/* Image Popup Dialog */}
      <Dialog open={!!openImage} onClose={handleCloseImage} maxWidth="lg">
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseImage}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {openImage && (
            <img
              src={openImage}
              alt="Enlarged view"
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default SchoolGallery;
