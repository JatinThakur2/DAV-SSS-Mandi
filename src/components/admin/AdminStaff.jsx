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
  Chip,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function AdminStaff() {
  const [staffType, setStaffType] = useState("teaching");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState("");

  // Sample data for teaching staff
  const [teachingStaff, setTeachingStaff] = useState([
    {
      id: 1,
      name: "SANGEETA KAPOOR",
      designation: "Principal",
      qualification: "MA Eng B.Ed",
      experience: "28 years",
      subject: "English",
    },
    {
      id: 2,
      name: "JAGDISH KUMAR",
      designation: "Vice Principal",
      qualification: "M.Sc Physics M.Ed",
      experience: "23 years",
      subject: "Physics",
    },
  ]);

  // Sample data for non-teaching staff
  const [nonTeachingStaff, setNonTeachingStaff] = useState([
    {
      id: 1,
      name: "DEVRAJ",
      designation: "Office Incharge",
      qualification: "Higher Secondary",
      experience: "30 years",
      department: "Administration",
    },
    {
      id: 2,
      name: "MAHENDER RANA",
      designation: "Office Assistant",
      qualification: "Higher Secondary",
      experience: "13 years",
      department: "Administration",
    },
  ]);

  // Form state for teaching staff
  const [teachingFormData, setTeachingFormData] = useState({
    name: "",
    designation: "",
    qualification: "",
    experience: "",
    subject: "",
  });

  // Form state for non-teaching staff
  const [nonTeachingFormData, setNonTeachingFormData] = useState({
    name: "",
    designation: "",
    qualification: "",
    experience: "",
    department: "",
  });

  const handleStaffTypeChange = (event) => {
    setStaffType(event.target.value);
  };

  const handleOpenDialog = (staff = null) => {
    if (staffType === "teaching") {
      if (staff) {
        // Edit existing teaching staff
        setEditingStaffId(staff.id);
        setTeachingFormData({
          name: staff.name,
          designation: staff.designation,
          qualification: staff.qualification,
          experience: staff.experience,
          subject: staff.subject || "",
        });
      } else {
        // Create new teaching staff
        setEditingStaffId(null);
        setTeachingFormData({
          name: "",
          designation: "",
          qualification: "",
          experience: "",
          subject: "",
        });
      }
    } else {
      if (staff) {
        // Edit existing non-teaching staff
        setEditingStaffId(staff.id);
        setNonTeachingFormData({
          name: staff.name,
          designation: staff.designation,
          qualification: staff.qualification,
          experience: staff.experience,
          department: staff.department || "",
        });
      } else {
        // Create new non-teaching staff
        setEditingStaffId(null);
        setNonTeachingFormData({
          name: "",
          designation: "",
          qualification: "",
          experience: "",
          department: "",
        });
      }
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStaffId(null);
    setError("");
  };

  const handleTeachingInputChange = (e) => {
    const { name, value } = e.target;
    setTeachingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNonTeachingInputChange = (e) => {
    const { name, value } = e.target;
    setNonTeachingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (staffType === "teaching") {
      // Validate teaching staff form
      if (!teachingFormData.name.trim()) {
        setError("Name is required");
        return;
      }
      if (!teachingFormData.designation.trim()) {
        setError("Designation is required");
        return;
      }
      if (!teachingFormData.qualification.trim()) {
        setError("Qualification is required");
        return;
      }
      if (!teachingFormData.experience.trim()) {
        setError("Experience is required");
        return;
      }

      if (editingStaffId) {
        // Update existing teaching staff (simulation)
        setTeachingStaff((prev) =>
          prev.map((staff) =>
            staff.id === editingStaffId
              ? { ...teachingFormData, id: staff.id }
              : staff
          )
        );
      } else {
        // Create new teaching staff (simulation)
        const newId = Math.max(...teachingStaff.map((s) => s.id), 0) + 1;
        setTeachingStaff((prev) => [
          ...prev,
          { ...teachingFormData, id: newId },
        ]);
      }
    } else {
      // Validate non-teaching staff form
      if (!nonTeachingFormData.name.trim()) {
        setError("Name is required");
        return;
      }
      if (!nonTeachingFormData.designation.trim()) {
        setError("Designation is required");
        return;
      }
      if (!nonTeachingFormData.qualification.trim()) {
        setError("Qualification is required");
        return;
      }
      if (!nonTeachingFormData.experience.trim()) {
        setError("Experience is required");
        return;
      }

      if (editingStaffId) {
        // Update existing non-teaching staff (simulation)
        setNonTeachingStaff((prev) =>
          prev.map((staff) =>
            staff.id === editingStaffId
              ? { ...nonTeachingFormData, id: staff.id }
              : staff
          )
        );
      } else {
        // Create new non-teaching staff (simulation)
        const newId = Math.max(...nonTeachingStaff.map((s) => s.id), 0) + 1;
        setNonTeachingStaff((prev) => [
          ...prev,
          { ...nonTeachingFormData, id: newId },
        ]);
      }
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    // Delete staff (simulation)
    if (staffType === "teaching") {
      setTeachingStaff((prev) => prev.filter((staff) => staff.id !== id));
    } else {
      setNonTeachingStaff((prev) => prev.filter((staff) => staff.id !== id));
    }
    setConfirmDeleteId(null);
  };

  // Get designation color
  const getDesignationColor = (designation) => {
    if (staffType === "teaching") {
      // Colors for teaching staff designations
      if (designation === "Principal") return "error";
      if (designation === "Vice Principal") return "warning";
      if (designation.includes("PGT")) return "primary";
      if (designation.includes("TGT")) return "success";
      return "info";
    } else {
      // Colors for non-teaching staff designations
      if (designation === "Office Incharge") return "success";
      if (designation.includes("Office")) return "info";
      if (designation === "Peon") return "warning";
      if (designation === "Chowkidar") return "error";
      return "primary";
    }
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
        <Typography variant="h4">Staff Management</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Staff Type Selector */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="staff-type-label">Staff Type</InputLabel>
            <Select
              labelId="staff-type-label"
              value={staffType}
              label="Staff Type"
              onChange={handleStaffTypeChange}
              size="small"
            >
              <MenuItem value="teaching">Teaching Staff</MenuItem>
              <MenuItem value="nonteaching">Non-Teaching Staff</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Staff
          </Button>
        </Box>
      </Box>

      {/* Staff Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {staffType === "teaching"
              ? "Teaching Staff Summary"
              : "Non-Teaching Staff Summary"}
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {staffType === "teaching"
                  ? teachingStaff.length
                  : nonTeachingStaff.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total {staffType === "teaching" ? "Teaching" : "Non-Teaching"}{" "}
                Staff
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Designation</TableCell>
              <TableCell sx={{ color: "white" }}>Qualification</TableCell>
              <TableCell sx={{ color: "white" }}>Experience</TableCell>
              <TableCell sx={{ color: "white" }}>
                {staffType === "teaching" ? "Subject" : "Department"}
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(staffType === "teaching" ? teachingStaff : nonTeachingStaff)
              .length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No staff members found. Click "Add Staff" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              (staffType === "teaching" ? teachingStaff : nonTeachingStaff).map(
                (staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={staff.designation}
                        color={getDesignationColor(staff.designation)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{staff.qualification}</TableCell>
                    <TableCell>{staff.experience}</TableCell>
                    <TableCell>
                      {staffType === "teaching"
                        ? staff.subject || "—"
                        : staff.department || "—"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(staff)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setConfirmDeleteId(staff.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Staff Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingStaffId ? "Edit Staff Member" : "Add Staff Member"}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {staffType === "teaching" ? (
            // Teaching Staff Form
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={teachingFormData.name}
                onChange={handleTeachingInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                select
                margin="dense"
                name="designation"
                label="Designation"
                fullWidth
                variant="outlined"
                value={teachingFormData.designation}
                onChange={handleTeachingInputChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Principal">Principal</MenuItem>
                <MenuItem value="Vice Principal">Vice Principal</MenuItem>
                <MenuItem value="PGT">PGT</MenuItem>
                <MenuItem value="TGT">TGT</MenuItem>
                <MenuItem value="PRT">PRT</MenuItem>
                <MenuItem value="JBT">JBT</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                name="qualification"
                label="Qualification"
                type="text"
                fullWidth
                variant="outlined"
                value={teachingFormData.qualification}
                onChange={handleTeachingInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="experience"
                label="Experience"
                type="text"
                fullWidth
                variant="outlined"
                value={teachingFormData.experience}
                onChange={handleTeachingInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="subject"
                label="Subject (Optional)"
                type="text"
                fullWidth
                variant="outlined"
                value={teachingFormData.subject}
                onChange={handleTeachingInputChange}
              />
            </>
          ) : (
            // Non-Teaching Staff Form
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={nonTeachingFormData.name}
                onChange={handleNonTeachingInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                select
                margin="dense"
                name="designation"
                label="Designation"
                fullWidth
                variant="outlined"
                value={nonTeachingFormData.designation}
                onChange={handleNonTeachingInputChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Office Incharge">Office Incharge</MenuItem>
                <MenuItem value="Office Assistant">Office Assistant</MenuItem>
                <MenuItem value="Clerk">Clerk</MenuItem>
                <MenuItem value="Peon">Peon</MenuItem>
                <MenuItem value="Chowkidar">Chowkidar</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                name="qualification"
                label="Qualification"
                type="text"
                fullWidth
                variant="outlined"
                value={nonTeachingFormData.qualification}
                onChange={handleNonTeachingInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="experience"
                label="Experience"
                type="text"
                fullWidth
                variant="outlined"
                value={nonTeachingFormData.experience}
                onChange={handleNonTeachingInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="department"
                label="Department (Optional)"
                type="text"
                fullWidth
                variant="outlined"
                value={nonTeachingFormData.department}
                onChange={handleNonTeachingInputChange}
              />
            </>
          )}
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
            Are you sure you want to delete this staff member? This action
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

export default AdminStaff;
