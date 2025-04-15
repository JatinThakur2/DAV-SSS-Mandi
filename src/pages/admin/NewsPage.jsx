// src/pages/admin/NewsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  Stack,
  Link,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Newspaper as NewsIcon,
  Announcement as NoticeIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { format } from "date-fns";

function NewsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [currentNews, setCurrentNews] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
    isNotice: false,
    link: "", // Added link field
  });
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Convex API hooks
  const allNews = useQuery(api.news.getNews) || [];
  const news = allNews.filter((item) => !item.isNotice);
  const notices = allNews.filter((item) => item.isNotice);

  const addNews = useMutation(api.news.addNews);
  const updateNews = useMutation(api.news.updateNews);
  const deleteNews = useMutation(api.news.deleteNews);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      setCurrentNews({
        title: item.title,
        date: item.date,
        description: item.description,
        isNotice: item.isNotice,
        link: item.link || "", // Handle case where link might be undefined
      });
      setCurrentNewsId(item._id);
    } else {
      setCurrentNews({
        title: "",
        date: format(new Date(), "yyyy-MM-dd"),
        description: "",
        isNotice: tabValue === 1, // If on the Notices tab, set isNotice to true
        link: "",
      });
      setCurrentNewsId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id, title) => {
    setCurrentNewsId(id);
    setCurrentNews({ ...currentNews, title });
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNews({
      ...currentNews,
      [name]: value,
    });
  };

  const handleTypeChange = (e) => {
    setCurrentNews({
      ...currentNews,
      isNotice: e.target.value === "notice",
    });
  };

  const handleSaveNews = async () => {
    try {
      // If link is empty, set it to undefined so it's optional in the database
      const newsData = {
        ...currentNews,
        link: currentNews.link.trim() === "" ? undefined : currentNews.link,
      };

      if (dialogMode === "add") {
        await addNews(newsData);
        setSnackbar({
          open: true,
          message: `${currentNews.isNotice ? "Notice" : "News"} added successfully`,
          severity: "success",
        });
      } else {
        await updateNews({
          id: currentNewsId,
          ...newsData,
        });
        setSnackbar({
          open: true,
          message: `${currentNews.isNotice ? "Notice" : "News"} updated successfully`,
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving news:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleDeleteNews = async () => {
    try {
      await deleteNews({ id: currentNewsId });
      setSnackbar({
        open: true,
        message: "Item deleted successfully",
        severity: "success",
      });
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting news:", error);
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
        <Typography variant="h4">News & Notices</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Add {tabValue === 0 ? "News" : "Notice"}
        </Button>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="News" />
        <Tab label="Notices" />
      </Tabs>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="10%">Type</TableCell>
                <TableCell width="20%">Title</TableCell>
                <TableCell width="15%">Date</TableCell>
                <TableCell width="25%">Description</TableCell>
                <TableCell width="15%">Link</TableCell>
                <TableCell width="15%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tabValue === 0 ? news : notices).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      No {tabValue === 0 ? "news" : "notices"} found. Click the
                      button above to add some.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (tabValue === 0 ? news : notices).map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      <Chip
                        icon={item.isNotice ? <NoticeIcon /> : <NewsIcon />}
                        label={item.isNotice ? "Notice" : "News"}
                        color={item.isNotice ? "error" : "primary"}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.description.length > 100
                        ? `${item.description.substring(0, 100)}...`
                        : item.description}
                    </TableCell>
                    <TableCell>
                      {item.link ? (
                        <Tooltip title={item.link}>
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <LinkIcon sx={{ mr: 0.5, fontSize: 16 }} />
                            View Link
                          </Link>
                        </Tooltip>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No link
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                      >
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleOpenDialog("edit", item)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenDeleteDialog(item._id, item.title)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add New" : "Edit"}{" "}
          {currentNews.isNotice ? "Notice" : "News"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={currentNews.isNotice ? "notice" : "news"}
                label="Type"
                onChange={handleTypeChange}
              >
                <MenuItem value="news">News</MenuItem>
                <MenuItem value="notice">Notice</MenuItem>
              </Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={currentNews.title}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="dense"
              name="date"
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={currentNews.date}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="dense"
              name="description"
              label="Description"
              multiline
              rows={5}
              fullWidth
              value={currentNews.description}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="dense"
              name="link"
              label="Link URL (Optional)"
              placeholder="https://example.com"
              type="url"
              fullWidth
              value={currentNews.link}
              onChange={handleInputChange}
              helperText="Enter a full URL including https:// if you want to add a link"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveNews}
            variant="contained"
            disabled={
              !currentNews.title ||
              !currentNews.date ||
              !currentNews.description
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{currentNews.title}"? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteNews} color="error" variant="contained">
            Delete
          </Button>
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

export default NewsPage;
