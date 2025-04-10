// src/components/admin/AdminFeeStructure.jsx
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
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

// This is a placeholder component until Convex is properly integrated
function AdminFeeStructure() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFeeId, setEditingFeeId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState("");

  // Sample data (to be replaced with Convex data)
  const [feeStructure, setFeeStructure] = useState([
    {
      id: 1,
      class: "Nursery",
      tuitionFee: 1250,
      ipFee: null,
      totalWithIP: null,
      totalWithoutIP: 3370,
      isNewStudent: true,
      academicYear: "2025-2026",
    },
    {
      id: 2,
      class: "KG",
      tuitionFee: 1250,
      ipFee: null,
      totalWithIP: null,
      totalWithoutIP: 3370,
      isNewStudent: true,
      academicYear: "2025-2026",
    },
    {
      id: 3,
      class: "Nursery",
      tuitionFee: 1250,
      ipFee: null,
      totalWithIP: null,
      totalWithoutIP: 2770,
      isNewStudent: false,
      academicYear: "2025-2026",
    },
    {
      id: 4,
      class: "KG",
      tuitionFee: 1250,
      ipFee: null,
      totalWithIP: null,
      totalWithoutIP: 2770,
      isNewStudent: false,
      academicYear: "2025-2026",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    class: "",
    tuitionFee: "",
    ipFee: "",
    totalWithIP: "",
    totalWithoutIP: "",
    isNewStudent: true,
    academicYear: "2025-2026",
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (fee = null) => {
    if (fee) {
      // Edit existing fee structure
      setEditingFeeId(fee.id);
      setFormData({
        class: fee.class,
        tuitionFee: fee.tuitionFee || "",
        ipFee: fee.ipFee || "",
        totalWithIP: fee.totalWithIP || "",
        totalWithoutIP: fee.totalWithoutIP || "",
        isNewStudent: fee.isNewStudent,
        academicYear: fee.academicYear,
      });
    } else {
      // Create new fee structure
      setEditingFeeId(null);
      setFormData({
        class: "",
        tuitionFee: "",
        ipFee: "",
        totalWithIP: "",
        totalWithoutIP: "",
        isNewStudent: tabValue === 0, // Set based on current tab
        academicYear: "2025-2026",
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFeeId(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.class.trim()) {
      setError("Class is required");
      return;
    }
    if (!formData.tuitionFee) {
      setError("Tuition fee is required");
      return;
    }
    if (!formData.totalWithIP && !formData.totalWithoutIP) {
      setError("At least one total fee amount is required");
      return;
    }

    // Convert numeric fields to numbers
    const numericFormData = {
      ...formData,
      tuitionFee: Number(formData.tuitionFee),
      ipFee: formData.ipFee ? Number(formData.ipFee) : null,
      totalWithIP: formData.totalWithIP ? Number(formData.totalWithIP) : null,
      totalWithoutIP: formData.totalWithoutIP
        ? Number(formData.totalWithoutIP)
        : null,
    };

    if (editingFeeId) {
      // Update existing fee structure (simulation)
      setFeeStructure((prev) =>
        prev.map((fee) =>
          fee.id === editingFeeId ? { ...numericFormData, id: fee.id } : fee
        )
      );
    } else {
      // Create new fee structure (simulation)
      const newId = Math.max(...feeStructure.map((f) => f.id), 0) + 1;
      setFeeStructure((prev) => [...prev, { ...numericFormData, id: newId }]);
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    // Delete fee structure (simulation)
    setFeeStructure((prev) => prev.filter((fee) => fee.id !== id));
    setConfirmDeleteId(null);
  };

  // Filter fees based on selected tab (new vs existing students)
  const filteredFees = feeStructure.filter(
    (fee) => fee.isNewStudent === (tabValue === 0)
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Fee Structure</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Fee Structure
        </Button>
      </Box>

      {/* Fee Structure Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Fee Structure Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {feeStructure.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Fee Records
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs for New vs Existing Students */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="New Students" />
        <Tab label="Existing Students" />
      </Tabs>

      {/* Fee Structure Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Class</TableCell>
              <TableCell sx={{ color: "white" }}>Tuition Fee</TableCell>
              <TableCell sx={{ color: "white" }}>IP Fee</TableCell>
              <TableCell sx={{ color: "white" }}>Total (With IP)</TableCell>
              <TableCell sx={{ color: "white" }}>Total (Without IP)</TableCell>
              <TableCell sx={{ color: "white" }}>Academic Year</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No fee structure records found. Click "Add Fee Structure" to
                    create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.class}</TableCell>
                  <TableCell>{fee.tuitionFee}</TableCell>
                  <TableCell>{fee.ipFee || "—"}</TableCell>
                  <TableCell>{fee.totalWithIP || "—"}</TableCell>
                  <TableCell>{fee.totalWithoutIP || "—"}</TableCell>
                  <TableCell>{fee.academicYear}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(fee)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setConfirmDeleteId(fee.id)}
                      size="small"
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

      {/* Add/Edit Fee Structure Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingFeeId ? "Edit Fee Structure" : "Add Fee Structure"}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            select
            margin="dense"
            name="class"
            label="Class"
            fullWidth
            variant="outlined"
            value={formData.class}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Nursery">Nursery</MenuItem>
            <MenuItem value="KG">KG</MenuItem>
            <MenuItem value="I">Class I</MenuItem>
            <MenuItem value="II">Class II</MenuItem>
            <MenuItem value="III">Class III</MenuItem>
            <MenuItem value="IV">Class IV</MenuItem>
            <MenuItem value="V">Class V</MenuItem>
            <MenuItem value="VI">Class VI</MenuItem>
            <MenuItem value="VII">Class VII</MenuItem>
            <MenuItem value="VIII">Class VIII</MenuItem>
            <MenuItem value="IX">Class IX</MenuItem>
            <MenuItem value="X">Class X</MenuItem>
            <MenuItem value="XI (Arts)">Class XI (Arts)</MenuItem>
            <MenuItem value="XI (Commerce)">Class XI (Commerce)</MenuItem>
            <MenuItem value="XI (Medical)">Class XI (Medical)</MenuItem>
            <MenuItem value="XI (Non Medical)">Class XI (Non Medical)</MenuItem>
            <MenuItem value="XII (Arts)">Class XII (Arts)</MenuItem>
            <MenuItem value="XII (Commerce)">Class XII (Commerce)</MenuItem>
            <MenuItem value="XII (Medical)">Class XII (Medical)</MenuItem>
            <MenuItem value="XII (Non Medical)">
              Class XII (Non Medical)
            </MenuItem>
          </TextField>

          <TextField
            margin="dense"
            name="tuitionFee"
            label="Tuition Fee"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.tuitionFee}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="ipFee"
            label="IP Fee (Optional)"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.ipFee}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="totalWithIP"
            label="Total With IP (Optional)"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.totalWithIP}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="totalWithoutIP"
            label="Total Without IP (Optional)"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.totalWithoutIP}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            margin="dense"
            name="academicYear"
            label="Academic Year"
            fullWidth
            variant="outlined"
            value={formData.academicYear}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="2024-2025">2024-2025</MenuItem>
            <MenuItem value="2025-2026">2025-2026</MenuItem>
            <MenuItem value="2026-2027">2026-2027</MenuItem>
          </TextField>

          <FormControlLabel
            control={
              <Switch
                checked={formData.isNewStudent}
                onChange={handleInputChange}
                name="isNewStudent"
              />
            }
            label={formData.isNewStudent ? "New Student" : "Existing Student"}
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
            Are you sure you want to delete this fee structure record? This
            action cannot be undone.
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

export default AdminFeeStructure;
