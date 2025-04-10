// src/components/admin/AdminNews.jsx
import React, { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControlLabel,
  Switch,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

// Import from our custom hooks file instead of the generated one
import { useMutation, useQuery } from "../../convex/hooks";

function AdminNews() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    content: "",
    isPublished: false,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState("");

  // Mock news data since Convex queries will return null/empty initially
  const mockNews = [
    {
      _id: "mock-news-1",
      title: "Annual Sports Day 2024",
      content:
        "Join us for the Annual Sports Day, featuring various athletic events.",
      isPublished: true,
      date: Date.now() - 86400000, // Yesterday
      publishedBy: "Admin",
    },
    {
      _id: "mock-news-2",
      title: "School Annual Day Celebrations",
      content:
        "We are excited to celebrate the Annual Day with performances by our talented students.",
      isPublished: false,
      date: Date.now() - 172800000, // 2 days ago
      publishedBy: "Admin",
    },
  ];

  // Convex queries and mutations with fallbacks to mock data
  const allNews = useQuery("news:getAll") || mockNews;
  const createNews = useMutation("news:create");
  const updateNews = useMutation("news:update");
  const deleteNews = useMutation("news:remove");

  const handleOpenDialog = (news = null) => {
    if (news) {
      // Edit existing news
      setEditingNewsId(news._id);
      setNewsFormData({
        title: news.title,
        content: news.content,
        isPublished: news.isPublished,
      });
    } else {
      // Create new news
      setEditingNewsId(null);
      setNewsFormData({
        title: "",
        content: "",
        isPublished: false,
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingNewsId(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setNewsFormData((prev) => ({
      ...prev,
      [name]: name === "isPublished" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!newsFormData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!newsFormData.content.trim()) {
      setError("Content is required");
      return;
    }

    try {
      if (editingNewsId) {
        // Update existing news
        await updateNews({
          id: editingNewsId,
          ...newsFormData,
        });
      } else {
        // Create new news
        await createNews({
          ...newsFormData,
          publishedBy: "Admin", // Hardcoded for now
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving news:", error);
      setError("Failed to save news. Please try again.");
    }
  };

  const handleTogglePublish = async (newsId, currentStatus) => {
    try {
      await updateNews({
        id: newsId,
        isPublished: !currentStatus,
      });
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const handleDelete = async (newsId) => {
    try {
      await deleteNews({ id: newsId });
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (allNews === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Latest News</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add News
        </Button>
      </Box>

      {/* News Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            News Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {allNews.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total News
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {allNews.filter((news) => news.isPublished).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Published
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="text.secondary" fontWeight="bold">
                {allNews.filter((news) => !news.isPublished).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Draft
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* News Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Created By</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No news articles found. Click "Add News" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              allNews.map((news) => (
                <TableRow key={news._id}>
                  <TableCell>{news.title}</TableCell>
                  <TableCell>{formatDate(news.date)}</TableCell>
                  <TableCell>{news.publishedBy}</TableCell>
                  <TableCell>
                    <Chip
                      label={news.isPublished ? "Published" : "Draft"}
                      color={news.isPublished ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color={news.isPublished ? "primary" : "default"}
                      onClick={() =>
                        handleTogglePublish(news._id, news.isPublished)
                      }
                      title={news.isPublished ? "Unpublish" : "Publish"}
                    >
                      {news.isPublished ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(news)}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setConfirmDeleteId(news._id)}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit News Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingNewsId ? "Edit News Article" : "Add News Article"}
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
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newsFormData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={newsFormData.content}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newsFormData.isPublished}
                onChange={handleInputChange}
                name="isPublished"
              />
            }
            label={newsFormData.isPublished ? "Published" : "Draft"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this news article? This action
            cannot be undone.
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
    </Box>
  );
}

export default AdminNews;
