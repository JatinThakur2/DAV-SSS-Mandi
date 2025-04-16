// src/pages/admin/TeachingStaffPage.jsx
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
  Avatar,
  Snackbar,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import ImageUploader from "../../components/admin/common/ImageUploader";

function TeachingStaffPage() {
  // State for dialogs
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"

  // State for snackbar notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // State for current staff member being edited
  const [currentStaff, setCurrentStaff] = useState({
    name: "",
    designation: "PGT",
    qualification: "",
    experience: "",
    imageUrl: "",
    order: 0,
  });

  const [currentStaffId, setCurrentStaffId] = useState(null);

  // Convex API hooks
  const teachingStaff = useQuery(api.staff.getTeachingStaff) || [];
  const addTeachingStaff = useMutation(api.staff.addTeachingStaff);
  const updateTeachingStaff = useMutation(api.staff.updateTeachingStaff);
  const deleteTeachingStaff = useMutation(api.staff.deleteTeachingStaff);

  // Designation options
  const designationOptions = [
    { value: "Principal", label: "Principal" },
    { value: "Vice Principal", label: "Vice Principal" },
    { value: "PGT Commerce", label: "PGT Commerce" },
    { value: "PGT Chemistry", label: "PGT Chemistry" },
    { value: "PGT Maths", label: "PGT Maths" },
    { value: "PGT Hindi", label: "PGT Hindi" },
    { value: "PGT English", label: "PGT English" },
    { value: "PGT Bio", label: "PGT Bio" },
    { value: "PGT Physics", label: "PGT Physics" },
    { value: "PGT Computers", label: "PGT Computers" },
    { value: "PGT P.Ed", label: "PGT P.Ed (Physical Education)" },
    { value: "PGT Pol Sci", label: "PGT Political Science" },
    { value: "PGT Economics", label: "PGT Economics" },
    { value: "TGT Arts", label: "TGT Arts" },
    { value: "TGT Medical", label: "TGT Medical" },
    { value: "TGT Non Medical", label: "TGT Non Medical" },
    { value: "TGT Sanskrit", label: "TGT Sanskrit" },
    { value: "JBT", label: "JBT" },
    { value: "Asstt Librarian", label: "Assistant Librarian" },
    { value: "Arts & Craft", label: "Arts & Craft" },
    { value: "LT", label: "LT" },
    { value: "Other", label: "Other" },
  ];

  // Handle dialog open/close
  const handleOpenDialog = (mode, staff = null) => {
    setDialogMode(mode);
    if (mode === "edit" && staff) {
      setCurrentStaff({
        name: staff.name,
        designation: staff.designation,
        qualification: staff.qualification,
        experience: staff.experience,
        imageUrl: staff.imageUrl || "",
        order: staff.order || 0,
      });
      setCurrentStaffId(staff._id);
    } else {
      setCurrentStaff({
        name: "",
        designation: "PGT",
        qualification: "",
        experience: "",
        imageUrl: "",
        order: 0,
      });
      setCurrentStaffId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id, name) => {
    setCurrentStaffId(id);
    setCurrentStaff({ ...currentStaff, name });
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff({
      ...currentStaff,
      [name]: value,
    });
  };

  const handleImageUpload = (url) => {
    setCurrentStaff({
      ...currentStaff,
      imageUrl: url,
    });
  };

  // Handle save staff
  const handleSaveStaff = async () => {
    try {
      if (dialogMode === "add") {
        await addTeachingStaff(currentStaff);
        setSnackbar({
          open: true,
          message: `Staff member "${currentStaff.name}" added successfully`,
          severity: "success",
        });
      } else {
        await updateTeachingStaff({
          id: currentStaffId,
          ...currentStaff,
        });
        setSnackbar({
          open: true,
          message: `Staff member "${currentStaff.name}" updated successfully`,
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving staff:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  // Handle delete staff
  const handleDeleteStaff = async () => {
    try {
      await deleteTeachingStaff({ id: currentStaffId });
      setSnackbar({
        open: true,
        message: "Staff member deleted successfully",
        severity: "success",
      });
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting staff:", error);
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

  // Helper function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Helper function to get color based on designation
  const getDesignationColor = (designation) => {
    const colors = {
      Principal: "#8e24aa",
      "Vice Principal": "#5e35b1",
      PGT: "#1976d2",
      TGT: "#00897b",
      JBT: "#43a047",
      "Asstt Librarian": "#fb8c00",
      "Arts & Craft": "#d81b60",
    };

    for (const key in colors) {
      if (designation.includes(key)) {
        return colors[key];
      }
    }
    return "#757575"; // Default color
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
        <Typography variant="h4">Teaching Staff Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Add Staff Member
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="25%">Name</TableCell>
                <TableCell width="20%">Designation</TableCell>
                <TableCell width="20%">Qualification</TableCell>
                <TableCell width="15%">Experience</TableCell>
                <TableCell width="20%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachingStaff.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      No teaching staff found. Click the button above to add
                      some.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                teachingStaff.map((staff) => (
                  <TableRow key={staff._id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {staff.imageUrl ? (
                          <Avatar
                            src={staff.imageUrl}
                            alt={staff.name}
                            sx={{
                              mr: 2,
                              width: 36,
                              height: 36,
                            }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              mr: 2,
                              bgcolor: getDesignationColor(staff.designation),
                              width: 36,
                              height: 36,
                              fontSize: "0.875rem",
                            }}
                          >
                            {getInitials(staff.name)}
                          </Avatar>
                        )}
                        {staff.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={staff.designation}
                        size="small"
                        sx={{
                          backgroundColor: getDesignationColor(
                            staff.designation
                          ),
                          color: "white",
                        }}
                      />
                    </TableCell>
                    <TableCell>{staff.qualification}</TableCell>
                    <TableCell>{staff.experience}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                      >
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleOpenDialog("edit", staff)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenDeleteDialog(staff._id, staff.name)
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
          {dialogMode === "add" ? "Add New" : "Edit"} Staff Member
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              value={currentStaff.name}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Designation</InputLabel>
              <Select
                name="designation"
                value={currentStaff.designation}
                label="Designation"
                onChange={handleInputChange}
              >
                {designationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              name="qualification"
              label="Qualification"
              type="text"
              fullWidth
              value={currentStaff.qualification}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="dense"
              name="experience"
              label="Experience"
              type="text"
              fullWidth
              value={currentStaff.experience}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
              placeholder="e.g. 5 years"
            />

            <TextField
              margin="dense"
              name="order"
              label="Display Order (Optional)"
              type="number"
              fullWidth
              value={currentStaff.order}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
              helperText="Lower numbers will be displayed first. Leave as 0 for default ordering."
            />

            <Typography variant="subtitle1" gutterBottom>
              Profile Image (Optional)
            </Typography>
            <ImageUploader
              onImageUpload={handleImageUpload}
              currentImage={currentStaff.imageUrl}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveStaff}
            variant="contained"
            disabled={
              !currentStaff.name ||
              !currentStaff.designation ||
              !currentStaff.qualification ||
              !currentStaff.experience
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
            Are you sure you want to delete the staff member "
            {currentStaff.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteStaff} color="error" variant="contained">
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

export default TeachingStaffPage;
