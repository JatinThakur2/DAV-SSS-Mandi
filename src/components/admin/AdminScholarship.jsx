// src/components/admin/AdminScholarship.jsx
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
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  PersonAdd as PersonAddIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useMutation, useQuery } from "../../convex/_generated/react";
import { useAuth } from "../../contexts/AuthContext";

function AdminScholarship() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openScholarshipDialog, setOpenScholarshipDialog] = useState(false);
  const [openRecipientDialog, setOpenRecipientDialog] = useState(false);
  const [editingScholarshipId, setEditingScholarshipId] = useState(null);
  const [editingRecipientId, setEditingRecipientId] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [confirmDeleteScholarshipId, setConfirmDeleteScholarshipId] =
    useState(null);
  const [confirmDeleteRecipientId, setConfirmDeleteRecipientId] =
    useState(null);
  const [error, setError] = useState("");
  const [filterAcademicYear, setFilterAcademicYear] = useState(
    new Date().getFullYear() + "-" + (new Date().getFullYear() + 1)
  );
  const [filterType, setFilterType] = useState("all");

  // Form states
  const [scholarshipFormData, setScholarshipFormData] = useState({
    name: "",
    description: "",
    type: "government", // default to government
    academicYear:
      new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
  });

  const [recipientFormData, setRecipientFormData] = useState({
    studentName: "",
    class: "",
    amount: "",
    details: "",
  });

  const { currentUser } = useAuth();

  // Convex queries and mutations
  const allScholarships = useQuery("scholarship:getAllScholarships") || [];
  const recipients =
    useQuery(
      "scholarship:getRecipientsByScholarship",
      selectedScholarship ? { scholarshipId: selectedScholarship } : "skip"
    ) || [];

  const createScholarship = useMutation("scholarship:createScholarship");
  const updateScholarship = useMutation("scholarship:updateScholarship");
  const deleteScholarship = useMutation("scholarship:deleteScholarship");
  const addRecipient = useMutation("scholarship:addRecipient");
  const updateRecipient = useMutation("scholarship:updateRecipient");
  const deleteRecipient = useMutation("scholarship:deleteRecipient");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenScholarshipDialog = (scholarship = null) => {
    if (scholarship) {
      // Edit existing scholarship
      setEditingScholarshipId(scholarship._id);
      setScholarshipFormData({
        name: scholarship.name,
        description: scholarship.description || "",
        type: scholarship.type,
        academicYear: scholarship.academicYear,
      });
    } else {
      // Create new scholarship
      setEditingScholarshipId(null);
      setScholarshipFormData({
        name: "",
        description: "",
        type: "government",
        academicYear: filterAcademicYear,
      });
    }
    setOpenScholarshipDialog(true);
    setError("");
  };

  const handleCloseScholarshipDialog = () => {
    setOpenScholarshipDialog(false);
    setEditingScholarshipId(null);
    setError("");
  };

  const handleOpenRecipientDialog = (recipient = null) => {
    if (!selectedScholarship) {
      setError("Please select a scholarship first");
      return;
    }

    if (recipient) {
      // Edit existing recipient
      setEditingRecipientId(recipient._id);
      setRecipientFormData({
        studentName: recipient.studentName,
        class: recipient.class || "",
        amount: recipient.amount || "",
        details: recipient.details || "",
      });
    } else {
      // Create new recipient
      setEditingRecipientId(null);
      setRecipientFormData({
        studentName: "",
        class: "",
        amount: "",
        details: "",
      });
    }
    setOpenRecipientDialog(true);
    setError("");
  };

  const handleCloseRecipientDialog = () => {
    setOpenRecipientDialog(false);
    setEditingRecipientId(null);
    setError("");
  };

  const handleScholarshipInputChange = (e) => {
    const { name, value } = e.target;
    setScholarshipFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecipientInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScholarshipSubmit = async () => {
    // Validate form
    if (!scholarshipFormData.name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      if (editingScholarshipId) {
        // Update existing scholarship
        await updateScholarship({
          id: editingScholarshipId,
          name: scholarshipFormData.name,
          description: scholarshipFormData.description,
          type: scholarshipFormData.type,
          academicYear: scholarshipFormData.academicYear,
        });
      } else {
        // Create new scholarship
        const result = await createScholarship({
          name: scholarshipFormData.name,
          description: scholarshipFormData.description,
          type: scholarshipFormData.type,
          academicYear: scholarshipFormData.academicYear,
        });
        // Set the newly created scholarship as selected
        setSelectedScholarship(result.scholarshipId);
      }
      handleCloseScholarshipDialog();
    } catch (error) {
      console.error("Error saving scholarship:", error);
      setError("Failed to save scholarship. Please try again.");
    }
  };

  const handleRecipientSubmit = async () => {
    // Validate form
    if (!recipientFormData.studentName.trim()) {
      setError("Student name is required");
      return;
    }

    try {
      if (editingRecipientId) {
        // Update existing recipient
        await updateRecipient({
          id: editingRecipientId,
          studentName: recipientFormData.studentName,
          class: recipientFormData.class,
          amount: recipientFormData.amount,
          details: recipientFormData.details,
        });
      } else {
        // Create new recipient
        const selectedScholarshipData = allScholarships.find(
          (s) => s._id === selectedScholarship
        );

        await addRecipient({
          scholarshipId: selectedScholarship,
          studentName: recipientFormData.studentName,
          class: recipientFormData.class,
          amount: recipientFormData.amount,
          details: recipientFormData.details,
          academicYear: selectedScholarshipData.academicYear,
        });
      }
      handleCloseRecipientDialog();
    } catch (error) {
      console.error("Error saving recipient:", error);
      setError("Failed to save recipient. Please try again.");
    }
  };

  const handleDeleteScholarship = async (scholarshipId) => {
    try {
      await deleteScholarship({ id: scholarshipId });
      setConfirmDeleteScholarshipId(null);
      // If the deleted scholarship was selected, clear selection
      if (selectedScholarship === scholarshipId) {
        setSelectedScholarship(null);
      }
    } catch (error) {
      console.error("Error deleting scholarship:", error);
    }
  };

  const handleDeleteRecipient = async (recipientId) => {
    try {
      await deleteRecipient({ id: recipientId });
      setConfirmDeleteRecipientId(null);
    } catch (error) {
      console.error("Error deleting recipient:", error);
    }
  };

  const handleSelectScholarship = (scholarshipId) => {
    setSelectedScholarship(scholarshipId);
    setSelectedTab(1); // Switch to Recipients tab
  };

  // Filter scholarships based on selected filters
  const filteredScholarships = allScholarships.filter((scholarship) => {
    if (filterType !== "all" && scholarship.type !== filterType) {
      return false;
    }
    if (
      filterAcademicYear !== "all" &&
      scholarship.academicYear !== filterAcademicYear
    ) {
      return false;
    }
    return true;
  });

  // Get selected scholarship details
  const selectedScholarshipDetails = selectedScholarship
    ? allScholarships.find((s) => s._id === selectedScholarship)
    : null;

  // Get all unique academic years from scholarships
  const academicYears = [
    "all",
    ...new Set(allScholarships.map((s) => s.academicYear)),
  ];

  // Loading state
  if (allScholarships === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Scholarship Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenScholarshipDialog()}
        >
          Add Scholarship
        </Button>
      </Box>

      {/* Scholarship Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Scholarships Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {allScholarships.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Scholarships
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {allScholarships.filter((s) => s.type === "government").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Government
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {allScholarships.filter((s) => s.type === "private").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Private
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {recipients.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Selected Recipients
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
          <Tab
            label="Scholarships"
            icon={<SchoolIcon />}
            iconPosition="start"
          />
          <Tab
            label="Recipients"
            icon={<PersonAddIcon />}
            iconPosition="start"
            disabled={!selectedScholarship}
          />
        </Tabs>
      </Paper>

      {/* Scholarships Tab */}
      {selectedTab === 0 && (
        <Box>
          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <FilterIcon color="action" />
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="subtitle1">Filters</Typography>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="filter-type-label">Type</InputLabel>
                  <Select
                    labelId="filter-type-label"
                    value={filterType}
                    label="Type"
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="government">Government</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="filter-year-label">Academic Year</InputLabel>
                  <Select
                    labelId="filter-year-label"
                    value={filterAcademicYear}
                    label="Academic Year"
                    onChange={(e) => setFilterAcademicYear(e.target.value)}
                  >
                    {academicYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Scholarships Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Description</TableCell>
                  <TableCell sx={{ color: "white" }}>Type</TableCell>
                  <TableCell sx={{ color: "white" }}>Academic Year</TableCell>
                  <TableCell sx={{ color: "white" }}>Recipients</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredScholarships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" sx={{ py: 2 }}>
                        No scholarships found. Click "Add Scholarship" to create
                        one.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredScholarships.map((scholarship) => {
                    const recipientCount = recipients.filter(
                      (r) => r.scholarshipId === scholarship._id
                    ).length;

                    return (
                      <TableRow
                        key={scholarship._id}
                        hover
                        onClick={() => handleSelectScholarship(scholarship._id)}
                        selected={selectedScholarship === scholarship._id}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          <Typography
                            variant="body1"
                            fontWeight={
                              selectedScholarship === scholarship._id
                                ? "bold"
                                : "normal"
                            }
                          >
                            {scholarship.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{scholarship.description || "—"}</TableCell>
                        <TableCell>
                          <Chip
                            label={
                              scholarship.type === "government"
                                ? "Government"
                                : "Private"
                            }
                            color={
                              scholarship.type === "government"
                                ? "info"
                                : "warning"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{scholarship.academicYear}</TableCell>
                        <TableCell>{recipientCount}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenScholarshipDialog(scholarship);
                            }}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteScholarshipId(scholarship._id);
                            }}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Recipients Tab */}
      {selectedTab === 1 && selectedScholarship && (
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
                  {selectedScholarshipDetails?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedScholarshipDetails?.type === "government"
                    ? "Government Scholarship"
                    : "Private Scholarship"}{" "}
                  • {selectedScholarshipDetails?.academicYear}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={() => handleOpenRecipientDialog()}
              >
                Add Recipient
              </Button>
            </Box>
            {selectedScholarshipDetails?.description && (
              <Typography variant="body1">
                {selectedScholarshipDetails.description}
              </Typography>
            )}
          </Paper>

          {/* Recipients Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white" }}>Student Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Class</TableCell>
                  <TableCell sx={{ color: "white" }}>Amount</TableCell>
                  <TableCell sx={{ color: "white" }}>Details</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" sx={{ py: 2 }}>
                        No recipients found for this scholarship. Click "Add
                        Recipient" to add one.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  recipients.map((recipient) => (
                    <TableRow key={recipient._id}>
                      <TableCell>{recipient.studentName}</TableCell>
                      <TableCell>{recipient.class || "—"}</TableCell>
                      <TableCell>{recipient.amount || "—"}</TableCell>
                      <TableCell>{recipient.details || "—"}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenRecipientDialog(recipient)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            setConfirmDeleteRecipientId(recipient._id)
                          }
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
        </Box>
      )}

      {/* Add/Edit Scholarship Dialog */}
      <Dialog
        open={openScholarshipDialog}
        onClose={handleCloseScholarshipDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingScholarshipId ? "Edit Scholarship" : "Add Scholarship"}
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
            name="name"
            label="Scholarship Name"
            type="text"
            fullWidth
            variant="outlined"
            value={scholarshipFormData.name}
            onChange={handleScholarshipInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description (Optional)"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={scholarshipFormData.description}
            onChange={handleScholarshipInputChange}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="scholarship-type-label">Type</InputLabel>
                <Select
                  labelId="scholarship-type-label"
                  name="type"
                  value={scholarshipFormData.type}
                  label="Type"
                  onChange={handleScholarshipInputChange}
                >
                  <MenuItem value="government">Government</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="academic-year-label">Academic Year</InputLabel>
                <Select
                  labelId="academic-year-label"
                  name="academicYear"
                  value={scholarshipFormData.academicYear}
                  label="Academic Year"
                  onChange={handleScholarshipInputChange}
                >
                  <MenuItem value="2023-2024">2023-2024</MenuItem>
                  <MenuItem value="2024-2025">2024-2025</MenuItem>
                  <MenuItem value="2025-2026">2025-2026</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScholarshipDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleScholarshipSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Recipient Dialog */}
      <Dialog
        open={openRecipientDialog}
        onClose={handleCloseRecipientDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingRecipientId ? "Edit Recipient" : "Add Recipient"}
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
            name="studentName"
            label="Student Name"
            type="text"
            fullWidth
            variant="outlined"
            value={recipientFormData.studentName}
            onChange={handleRecipientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="class"
            label="Class (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={recipientFormData.class}
            onChange={handleRecipientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={recipientFormData.amount}
            onChange={handleRecipientInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="details"
            label="Additional Details (Optional)"
            multiline
            rows={2}
            fullWidth
            variant="outlined"
            value={recipientFormData.details}
            onChange={handleRecipientInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRecipientDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRecipientSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Scholarship Dialog */}
      <Dialog
        open={confirmDeleteScholarshipId !== null}
        onClose={() => setConfirmDeleteScholarshipId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this scholarship? All recipients
            associated with this scholarship will also be deleted. This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteScholarshipId(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteScholarship(confirmDeleteScholarshipId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Recipient Dialog */}
      <Dialog
        open={confirmDeleteRecipientId !== null}
        onClose={() => setConfirmDeleteRecipientId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this recipient? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteRecipientId(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteRecipient(confirmDeleteRecipientId)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminScholarship;
