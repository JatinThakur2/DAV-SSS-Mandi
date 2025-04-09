import React, { useState } from "react";
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
} from "@mui/material";
import {
  Event as EventIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

function SchoolGallery() {
  const [currentTab, setCurrentTab] = useState(0);
  const [openImage, setOpenImage] = useState(null);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenImage = (image) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  // Gallery events data from gallery.txt
  const galleryEvents = [
    {
      id: 1,
      title: "Annual Prize Distribution Function",
      date: "16 March 2025",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Glimpses of Annual Prize Distribution Function",
    },
    {
      id: 2,
      title: "New School Year 2024-25",
      date: "April 2024",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description:
        "A new school year means new beginnings, new adventures, new friendships, and new challenges",
    },
    {
      id: 3,
      title: "Elections And Investiture Ceremony",
      date: "2023-2024",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Elections and Investiture Ceremony for session 2023-2024",
    },
    {
      id: 4,
      title: "Fresher's Day",
      date: "2023",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Fresher's day celebrations 2023",
    },
    {
      id: 5,
      title: "HAVAN SAMAROH",
      date: "2023-24",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "HAVAN SAMAROH For Session 2023-24",
    },
    {
      id: 6,
      title: "Elections And Investiture Ceremony",
      date: "2022-2023",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Elections And Investiture Ceremony for session 2022-2023",
    },
    {
      id: 7,
      title: "GOOD LUCK Havan",
      date: "January 2020",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "GOOD LUCK Havan ceremony in January 2020",
    },
    {
      id: 8,
      title: "ELECTIONS and INVESTITURE CEREMONY",
      date: "2019",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Elections and Investiture Ceremony for session 2019",
    },
    {
      id: 9,
      title: "Chanting of prayers",
      date: "2019",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Chanting of prayers ceremony in 2019",
    },
    {
      id: 10,
      title: "Farewell",
      date: "2019",
      image: "/api/placeholder/800/500", // Replace with actual image path when available
      description: "Farewell function for outgoing students in 2019",
    },
  ];

  // Group events by year for tabs
  const years = [
    ...new Set(
      galleryEvents.map((event) => {
        const yearMatch = event.date.match(/\d{4}/);
        return yearMatch ? yearMatch[0] : null;
      })
    ),
  ]
    .filter(Boolean)
    .sort()
    .reverse();

  // Filter events by selected year
  const getEventsByYear = (year) => {
    return galleryEvents.filter((event) => event.date.includes(year));
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

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={currentTab}
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
            {getEventsByYear(year).map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
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
                    image={event.image}
                    alt={event.title}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOpenImage(event.image)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <EventIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {event.date}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">{event.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

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
