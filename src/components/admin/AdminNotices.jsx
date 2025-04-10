// src/components/admin/AdminNotices.jsx
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
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Flag as FlagIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Import from our custom hooks file instead of the generated one
import { useMutation, useQuery } from "../../convex/hooks";

function AdminNotices() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: "",
    content: "",
    isImportant: false,
    isPublished: false,
    expiryDate: null,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState("");

  // Mock data since Convex queries will return null initially
  const mockNotices = [
    {
      _id: "mock-notice-1",
      title: "Summer Vacation Notice",
      content:
        "School will be closed for summer vacation from June 1st to July 15th.",
      isImportant: true,
      isPublished: true,
      date: Date.now() - 86400000, // Yesterday
      expiryDate: Date.now() + 2592000000, // 30 days in the future
      publishedBy: "Admin",
    },
    {
      _id: "mock-notice-2",
      title: "Parent-Teacher Meeting",
      content: "Parent-Teacher Meeting scheduled for May 15th at 10 AM.",
      isImportant: false,
      isPublished: true,
      date: Date.now() - 172800000, // 2 days ago
      expiryDate: Date.now() + 1296000000, // 15 days in the future
      publishedBy: "Admin",
    },
  ];

  // Convex queries and mutations with fallbacks to mock data
  const allNotices = useQuery("notices:getAll") || mockNotices;
  const createNotice = useMutation("notices:create");
  const updateNotice = useMutation("notices:update");
  const deleteNotice = useMutation("notices:remove");

  const handleOpenDialog = (notice = null) => {
    if (notice) {
      // Edit existing notice
      setEditingNoticeId(notice._id);
      setNoticeFormData({
        title: notice.title,
        content: notice.content,
        isImportant: notice.isImportant,
        isPublished: notice.isPublished,
        expiryDate: notice.expiryDate ? new Date(notice.expiryDate) : null,
      });
    } else {
      // Create new notice
      setEditingNoticeId(null);
      setNoticeFormData({
        title: "",
        content: "",
        isImportant: false,
        isPublished: false,
        expiryDate: null,
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingNoticeId(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setNoticeFormData((prev) => ({
      ...prev,
      [name]: name.includes("is") ? checked : value,
    }));
  };

  const handleDateChange = (newDate) => {
    setNoticeFormData((prev) => ({
      ...prev,
      expiryDate: newDate,
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!noticeFormData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!noticeFormData.content.trim()) {
      setError("Content is required");
      return;
    }

    try {
      // Convert date to timestamp
      const expiryTimestamp = noticeFormData.expiryDate
        ? noticeFormData.expiryDate.getTime()
        : undefined;

      if (editingNoticeId) {
        // Update existing notice
        await updateNotice({
          id: editingNoticeId,
          title: noticeFormData.title,
          content: noticeFormData.content,
          isImportant: noticeFormData.isImportant,
          isPublished: noticeFormData.isPublished,
          expiryDate: expiryTimestamp,
        });
      } else {
        // Create new notice
        await createNotice({
          title: noticeFormData.title,
          content: noticeFormData.content,
          isImportant: noticeFormData.isImportant,
          isPublished: noticeFormData.isPublished,
          expiryDate: expiryTimestamp,
          publishedBy: "Admin", // Hardcoded for now
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving notice:", error);
      setError("Failed to save notice. Please try again.");
    }
  };

  const handleTogglePublish = async (noticeId, currentStatus) => {
    try {
      await updateNotice({
        id: noticeId,
        isPublished: !currentStatus,
      });
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const handleToggleImportant = async (noticeId, currentStatus) => {
    try {
      await updateNotice({
        id: noticeId,
        isImportant: !currentStatus,
      });
    } catch (error) {
      console.error("Error toggling important status:", error);
    }
  };

  const handleDelete = async (noticeId) => {
    try {
      await deleteNotice({ id: noticeId });
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (notice) => {
    return notice.expiryDate && notice.expiryDate < Date.now();
  };

  // Loading state
  if (allNotices === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Notices</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Notice
        </Button>
      </Box>

      {/* Notices Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notices Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {allNotices.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Notices
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {
                  allNotices.filter((n) => n.isPublished && !isExpired(n))
                    .length
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="error.main" fontWeight="bold">
                {allNotices.filter((n) => isExpired(n)).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expired
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {allNotices.filter((n) => n.isImportant).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Important
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Notices Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Expiry</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allNotices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No notices found. Click "Add Notice" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              allNotices.map((notice) => (
                <TableRow key={notice._id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {notice.isImportant && (
                        <FlagIcon color="warning" fontSize="small" />
                      )}
                      {notice.title}
                    </Stack>
                  </TableCell>
                  <TableCell>{formatDate(notice.date)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={notice.isPublished ? "Published" : "Draft"}
                        color={notice.isPublished ? "success" : "default"}
                        size="small"
                      />
                      {isExpired(notice) && (
                        <Chip label="Expired" color="error" size="small" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {notice.expiryDate ? (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TimeIcon fontSize="small" color="action" />
                        {formatDate(notice.expiryDate)}
                      </Stack>
                    ) : (
                      "No expiry"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color={notice.isPublished ? "primary" : "default"}
                      onClick={() =>
                        handleTogglePublish(notice._id, notice.isPublished)
                      }
                      title={notice.isPublished ? "Unpublish" : "Publish"}
                    >
                      {notice.isPublished ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                    <IconButton
                      color={notice.isImportant ? "warning" : "default"}
                      onClick={() =>
                        handleToggleImportant(notice._id, notice.isImportant)
                      }
                      title={
                        notice.isImportant
                          ? "Remove Important"
                          : "Mark as Important"
                      }
                    >
                      <FlagIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(notice)}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setConfirmDeleteId(notice._id)}
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

      {/* Add/Edit Notice Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingNoticeId ? "Edit Notice" : "Add Notice"}
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
            value={noticeFormData.title}
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
            value={noticeFormData.content}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Expiry Date (Optional)"
                value={noticeFormData.expiryDate}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={noticeFormData.isPublished}
                  onChange={handleInputChange}
                  name="isPublished"
                />
              }
              label={noticeFormData.isPublished ? "Published" : "Draft"}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={noticeFormData.isImportant}
                  onChange={handleInputChange}
                  name="isImportant"
                  color="warning"
                />
              }
              label="Mark as Important"
            />
          </Box>
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
            Are you sure you want to delete this notice? This action cannot be
            undone.
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

export default AdminNotices;
