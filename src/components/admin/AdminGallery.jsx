// src/components/admin/AdminGallery.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  FormControlLabel,
  Switch,
  Chip,
  CircularProgress,
  Stack,
  Alert,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Event as EventIcon,
  Upload as UploadIcon,
  PhotoLibrary as GalleryIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Import from custom hooks instead of the generated one
import { useMutation, useQuery, useAction } from "../../convex/hooks";
import { useAuth } from "../../contexts/AuthContext";

function AdminGallery() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openImagePreview, setOpenImagePreview] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteImageId, setConfirmDeleteImageId] = useState(null);
  const [error, setError] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // Form states
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    academicYear:
      new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    eventDate: new Date(),
    isPublished: false,
  });
  const [imageCaption, setImageCaption] = useState("");

  const fileInputRef = useRef(null);
  const { currentUser } = useAuth();

  // Mock data for gallery events
  const mockEvents = [
    {
      _id: "mock-event-1",
      title: "Annual Sports Day 2024",
      description: "Photos from our Annual Sports Day event",
      date: Date.now() - 1000000,
      academicYear: "2024-2025",
      isPublished: true,
      coverImageUrl: "/api/placeholder/800/500",
    },
    {
      _id: "mock-event-2",
      title: "School Annual Day Celebrations",
      description: "Highlights from our Annual Day celebrations",
      date: Date.now() - 2000000,
      academicYear: "2024-2025",
      isPublished: false,
      coverImageUrl: "/api/placeholder/800/500",
    },
  ];

  // Mock data for event images
  const mockImages = [
    {
      _id: "mock-image-1",
      eventId: "mock-event-1",
      imageUrl: "/api/placeholder/800/500",
      caption: "Students performing in the sports event",
      order: 1,
      uploadedBy: "Admin",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: "mock-image-2",
      eventId: "mock-event-1",
      imageUrl: "/api/placeholder/800/500",
      caption: "Award ceremony",
      order: 2,
      uploadedBy: "Admin",
      createdAt: Date.now() - 900000,
    },
  ];

  // Convex queries and mutations with fallbacks to mock data
  const allEvents = useQuery("gallery:getAllEvents") || mockEvents;
  const eventImages =
    useQuery(
      "gallery:getEventImages",
      selectedEvent ? { eventId: selectedEvent } : "skip"
    ) || (selectedEvent === "mock-event-1" ? mockImages : []);

  const createEvent = useMutation("gallery:createEvent");
  const updateEvent = useMutation("gallery:updateEvent");
  const deleteEvent = useMutation("gallery:deleteEvent");
  const saveImage = useMutation("gallery:saveImage");
  const deleteImage = useMutation("gallery:deleteImage");
  const setAsCover = useMutation("gallery:setAsCover");
  const generateUploadUrl = useAction("gallery:generateUploadUrl");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = (event = null) => {
    if (event) {
      // Edit existing event
      setEditingEventId(event._id);
      setEventFormData({
        title: event.title,
        description: event.description,
        academicYear: event.academicYear,
        eventDate: new Date(event.date),
        isPublished: event.isPublished,
      });
    } else {
      // Create new event
      setEditingEventId(null);
      setEventFormData({
        title: "",
        description: "",
        academicYear:
          new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
        eventDate: new Date(),
        isPublished: false,
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEventId(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setEventFormData((prev) => ({
      ...prev,
      [name]: name === "isPublished" ? checked : value,
    }));
  };

  const handleDateChange = (newDate) => {
    setEventFormData((prev) => ({
      ...prev,
      eventDate: newDate,
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!eventFormData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!eventFormData.description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      if (editingEventId) {
        // Update existing event
        await updateEvent({
          id: editingEventId,
          title: eventFormData.title,
          description: eventFormData.description,
          academicYear: eventFormData.academicYear,
          isPublished: eventFormData.isPublished,
          eventDate: eventFormData.eventDate.getTime(),
        });
      } else {
        // Create new event
        const result = await createEvent({
          title: eventFormData.title,
          description: eventFormData.description,
          academicYear: eventFormData.academicYear,
          publishedBy: currentUser?.name || "Admin",
          isPublished: eventFormData.isPublished,
          eventDate: eventFormData.eventDate.getTime(),
        });

        // Simulate backend response for mock data
        const newEventId = `mock-event-${allEvents.length + 1}`;

        // Set the newly created event as selected
        setSelectedEvent(result?.eventId || newEventId);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving event:", error);
      setError("Failed to save event. Please try again.");
    }
  };

  const handleTogglePublish = async (eventId, currentStatus) => {
    try {
      await updateEvent({
        id: eventId,
        isPublished: !currentStatus,
      });
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent({ id: eventId });
      setConfirmDeleteId(null);
      // If the deleted event was selected, clear selection
      if (selectedEvent === eventId) {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImage({ id: imageId });
      setConfirmDeleteImageId(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEvent(eventId);
    setSelectedTab(1); // Switch to Images tab
  };

  const handleOpenImageDialog = () => {
    if (!selectedEvent) {
      setError("Please select an event first");
      return;
    }
    setOpenImageDialog(true);
    setImageCaption("");
    setError("");
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setImageCaption("");
    setError("");
  };

  const handleFileSelect = async () => {
    if (
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      setError("Please select a file to upload");
      return;
    }

    const file = fileInputRef.current.files[0];

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should not exceed 5MB");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // For the mock version, we'll simulate upload
      setTimeout(() => {
        // Save image to database
        const newImageId = `mock-image-${mockImages.length + 1}`;

        // Add to mock images if this is the mock event
        if (selectedEvent === "mock-event-1") {
          mockImages.push({
            _id: newImageId,
            eventId: selectedEvent,
            imageUrl: "/api/placeholder/800/500",
            caption: imageCaption || "",
            order: mockImages.length + 1,
            uploadedBy: currentUser?.name || "Admin",
            createdAt: Date.now(),
          });
        }

        setUploading(false);
        handleCloseImageDialog();
      }, 1500);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  const handleImageMenuOpen = (event, imageId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedImageId(imageId);
  };

  const handleImageMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedImageId(null);
  };

  const handleSetAsCover = async () => {
    if (!selectedImageId || !selectedEvent) return;

    try {
      await setAsCover({
        imageId: selectedImageId,
        eventId: selectedEvent,
      });
      handleImageMenuClose();
    } catch (error) {
      console.error("Error setting cover image:", error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get all academic years from events
  const academicYears = [
    ...new Set(allEvents.map((event) => event.academicYear)),
  ];

  // Get selected event details
  const selectedEventDetails = selectedEvent
    ? allEvents.find((event) => event._id === selectedEvent)
    : null;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Gallery Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Event
        </Button>
      </Box>

      {/* Gallery Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Gallery Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {allEvents.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Events
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {allEvents.filter((event) => event.isPublished).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Published
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {eventImages.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Images in Selected Event
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Events" icon={<EventIcon />} iconPosition="start" />
          <Tab
            label="Images"
            icon={<GalleryIcon />}
            iconPosition="start"
            disabled={!selectedEvent}
          />
        </Tabs>
      </Paper>

      {/* Events Tab */}
      {selectedTab === 0 && (
        <Box>
          {/* Filter by Academic Year */}
          <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="academic-year-label">Academic Year</InputLabel>
              <Select
                labelId="academic-year-label"
                label="Academic Year"
                value="all"
                size="small"
              >
                <MenuItem value="all">All Years</MenuItem>
                {academicYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Events Grid */}
          <Grid container spacing={3}>
            {allEvents.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body1">
                    No gallery events found. Click "Add Event" to create one.
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              allEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      border:
                        selectedEvent === event._id ? "2px solid" : "none",
                      borderColor: "primary.main",
                    }}
                    onClick={() => handleSelectEvent(event._id)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.coverImageUrl || "/api/placeholder/800/500"}
                      alt={event.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {event.description.length > 100
                          ? `${event.description.substring(0, 100)}...`
                          : event.description}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <EventIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(event.date)}
                        </Typography>
                      </Stack>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label={event.academicYear}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={event.isPublished ? "Published" : "Draft"}
                          size="small"
                          color={event.isPublished ? "success" : "default"}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <IconButton
                        color={event.isPublished ? "primary" : "default"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePublish(event._id, event.isPublished);
                        }}
                        size="small"
                      >
                        {event.isPublished ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(event);
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(event._id);
                        }}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}

      {/* Images Tab */}
      {selectedTab === 1 && selectedEvent && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h5">
                  {selectedEventDetails?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(selectedEventDetails?.date)} •{" "}
                  {selectedEventDetails?.academicYear}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<UploadIcon />}
                onClick={handleOpenImageDialog}
              >
                Upload Images
              </Button>
            </Box>
            <Typography variant="body1">
              {selectedEventDetails?.description}
            </Typography>
          </Paper>

          {/* Images Grid */}
          <Grid container spacing={2}>
            {eventImages.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body1">
                    No images found for this event. Click "Upload Images" to add
                    some.
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              eventImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={image._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.imageUrl}
                      alt={image.caption || "Gallery image"}
                      onClick={() => setOpenImagePreview(image.imageUrl)}
                      sx={{ cursor: "pointer" }}
                    />
                    <CardContent sx={{ pt: 1, pb: 1 }}>
                      <Typography variant="body2" noWrap>
                        {image.caption || "No caption"}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
                      {selectedEventDetails?.coverImageUrl ===
                        image.imageUrl && (
                        <Chip
                          icon={<StarIcon fontSize="small" />}
                          label="Cover"
                          size="small"
                          color="warning"
                          sx={{ mr: "auto" }}
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => handleImageMenuOpen(e, image._id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => setConfirmDeleteImageId(image._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}

      {/* Add/Edit Event Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingEventId ? "Edit Gallery Event" : "Add Gallery Event"}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="outlined"
            value={eventFormData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={eventFormData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Event Date"
                  value={eventFormData.eventDate}
                  onChange={handleDateChange}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Academic Year"
                name="academicYear"
                value={eventFormData.academicYear}
                onChange={handleInputChange}
                fullWidth
              >
                <MenuItem value="2023-2024">2023-2024</MenuItem>
                <MenuItem value="2024-2025">2024-2025</MenuItem>
                <MenuItem value="2025-2026">2025-2026</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Switch
                checked={eventFormData.isPublished}
                onChange={handleInputChange}
                name="isPublished"
              />
            }
            label={eventFormData.isPublished ? "Published" : "Draft"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Image Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Upload Images</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="body2" paragraph>
            Upload images for: <strong>{selectedEventDetails?.title}</strong>
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              fullWidth
              sx={{ py: 5, border: "1px dashed" }}
            >
              Select Image
              <input ref={fileInputRef} type="file" accept="image/*" hidden />
            </Button>
          </Box>
          <TextField
            margin="dense"
            label="Image Caption (Optional)"
            fullWidth
            variant="outlined"
            value={imageCaption}
            onChange={(e) => setImageCaption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileSelect}
            disabled={uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : null}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!openImagePreview}
        onClose={() => setOpenImagePreview(null)}
        maxWidth="lg"
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
            }}
            onClick={() => setOpenImagePreview(null)}
          >
            <CloseIcon />
          </IconButton>
          {openImagePreview && (
            <img
              src={openImagePreview}
              alt="Preview"
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Event Dialog */}
      <Dialog
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this event? All associated images
            will also be deleted. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(confirmDeleteId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Image Dialog */}
      <Dialog
        open={confirmDeleteImageId !== null}
        onClose={() => setConfirmDeleteImageId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this image? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteImageId(null)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteImage(confirmDeleteImageId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleImageMenuClose}
      >
        <MenuItem onClick={handleSetAsCover}>
          <ListItemIcon>
            <StarIcon fontSize="small" color="warning" />
          </ListItemIcon>
          <ListItemText>Set as Cover Image</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default AdminGallery;
