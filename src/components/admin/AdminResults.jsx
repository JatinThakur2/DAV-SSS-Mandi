// src/components/admin/AdminResults.jsx
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
  Divider,
  Grid,
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
  School as SchoolIcon,
} from "@mui/icons-material";

function AdminResults() {
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedClass, setSelectedClass] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingResultId, setEditingResultId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState("");

  // Sample data for results
  const [results, setResults] = useState([
    {
      id: 1,
      class: "X",
      academicYear: "2023-2024",
      examType: "Annual",
      totalStudents: 42,
      passed: 42,
      result: "100%",
      topPerformers: [
        { name: "SUHANI", position: "1st", marks: "654/700" },
        { name: "AAYUSHI", position: "2nd", marks: "625/700" },
        { name: "JIYA", position: "3rd", marks: "610/700" },
      ],
    },
    {
      id: 2,
      class: "XII (Arts)",
      academicYear: "2023-2024",
      examType: "Annual",
      totalStudents: 20,
      passed: 20,
      result: "100%",
      topPerformers: [
        { name: "SHIVANSH SHARMA", position: "1st", marks: "406/500" },
        { name: "KAVYANSH", position: "2nd", marks: "405/500" },
        { name: "ANAMIKA SHARMA", position: "3rd", marks: "388/500" },
      ],
    },
    {
      id: 3,
      class: "XII (Commerce)",
      academicYear: "2023-2024",
      examType: "Annual",
      totalStudents: 15,
      passed: 15,
      result: "100%",
      topPerformers: [
        { name: "TANISHA", position: "1st", marks: "422/500" },
        { name: "DIKSHA THAKUR", position: "2nd", marks: "382/500" },
        { name: "AKSHAT SHARMA", position: "3rd", marks: "332/500" },
      ],
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    class: "",
    academicYear: "",
    examType: "",
    totalStudents: "",
    passed: "",
    result: "",
    topPerformers: [{ name: "", position: "", marks: "" }],
  });

  const handleOpenDialog = (result = null) => {
    if (result) {
      // Edit existing result
      setEditingResultId(result.id);
      setFormData({
        class: result.class,
        academicYear: result.academicYear,
        examType: result.examType,
        totalStudents: result.totalStudents,
        passed: result.passed,
        result: result.result,
        topPerformers: [...result.topPerformers],
      });
    } else {
      // Create new result
      setEditingResultId(null);
      setFormData({
        class: "",
        academicYear: selectedYear,
        examType: "Annual",
        totalStudents: "",
        passed: "",
        result: "",
        topPerformers: [{ name: "", position: "", marks: "" }],
      });
    }
    setOpenDialog(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingResultId(null);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopPerformerChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedPerformers = [...prev.topPerformers];
      updatedPerformers[index] = {
        ...updatedPerformers[index],
        [field]: value,
      };
      return {
        ...prev,
        topPerformers: updatedPerformers,
      };
    });
  };

  const addTopPerformer = () => {
    setFormData((prev) => ({
      ...prev,
      topPerformers: [
        ...prev.topPerformers,
        { name: "", position: "", marks: "" },
      ],
    }));
  };

  const removeTopPerformer = (index) => {
    if (formData.topPerformers.length > 1) {
      setFormData((prev) => {
        const updatedPerformers = [...prev.topPerformers];
        updatedPerformers.splice(index, 1);
        return {
          ...prev,
          topPerformers: updatedPerformers,
        };
      });
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.class) {
      setError("Class is required");
      return;
    }
    if (!formData.academicYear) {
      setError("Academic Year is required");
      return;
    }
    if (!formData.totalStudents) {
      setError("Total Students is required");
      return;
    }
    if (!formData.passed) {
      setError("Passed Students is required");
      return;
    }

    // Calculate result percentage if not provided
    const resultPercentage =
      formData.result ||
      `${Math.round((parseInt(formData.passed) / parseInt(formData.totalStudents)) * 100)}%`;

    const updatedFormData = {
      ...formData,
      result: resultPercentage,
      // Convert numeric fields to numbers
      totalStudents: parseInt(formData.totalStudents),
      passed: parseInt(formData.passed),
    };

    if (editingResultId) {
      // Update existing result
      setResults((prev) =>
        prev.map((item) =>
          item.id === editingResultId
            ? { ...updatedFormData, id: item.id }
            : item
        )
      );
    } else {
      // Create new result
      const newId = Math.max(...results.map((r) => r.id), 0) + 1;
      setResults((prev) => [...prev, { ...updatedFormData, id: newId }]);
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    // Delete result
    setResults((prev) => prev.filter((result) => result.id !== id));
    setConfirmDeleteId(null);
  };

  // Filter results based on selected year and class
  const filteredResults = results.filter((result) => {
    if (selectedYear !== "all" && result.academicYear !== selectedYear) {
      return false;
    }
    if (selectedClass !== "all" && result.class !== selectedClass) {
      return false;
    }
    return true;
  });

  // Get unique classes and years for filtering
  const classes = ["all", ...new Set(results.map((result) => result.class))];
  const years = [
    "all",
    ...new Set(results.map((result) => result.academicYear)),
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Academic Results</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Result
        </Button>
      </Box>

      {/* Results Summary Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Results Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {results.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Results
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {results.filter((r) => r.academicYear === "2023-2024").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2023-2024
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1">Filters</Typography>
          </Grid>
          <Grid item xs={12} sm={4.5} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="year-filter-label">Academic Year</InputLabel>
              <Select
                labelId="year-filter-label"
                value={selectedYear}
                label="Academic Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4.5} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="class-filter-label">Class</InputLabel>
              <Select
                labelId="class-filter-label"
                value={selectedClass}
                label="Class"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls === "all" ? "All Classes" : cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white" }}>Class</TableCell>
              <TableCell sx={{ color: "white" }}>Academic Year</TableCell>
              <TableCell sx={{ color: "white" }}>Exam Type</TableCell>
              <TableCell sx={{ color: "white" }}>Students</TableCell>
              <TableCell sx={{ color: "white" }}>Result</TableCell>
              <TableCell sx={{ color: "white" }}>Top Performers</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No results found. Click "Add Result" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SchoolIcon sx={{ mr: 1, color: "primary.main" }} />
                      {result.class}
                    </Box>
                  </TableCell>
                  <TableCell>{result.academicYear}</TableCell>
                  <TableCell>{result.examType}</TableCell>
                  <TableCell>{`${result.passed}/${result.totalStudents}`}</TableCell>
                  <TableCell>
                    <Chip label={result.result} color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    {result.topPerformers.slice(0, 2).map((performer, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {performer.position}: {performer.name} (
                        {performer.marks})
                      </Typography>
                    ))}
                    {result.topPerformers.length > 2 && (
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                      >
                        +{result.topPerformers.length - 2} more
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(result)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setConfirmDeleteId(result.id)}
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

      {/* Add/Edit Result Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingResultId ? "Edit Result" : "Add Result"}
        </DialogTitle>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="class-label">Class</InputLabel>
                <Select
                  labelId="class-label"
                  name="class"
                  value={formData.class}
                  label="Class"
                  onChange={handleInputChange}
                >
                  <MenuItem value="X">Class X</MenuItem>
                  <MenuItem value="XII (Arts)">Class XII (Arts)</MenuItem>
                  <MenuItem value="XII (Commerce)">
                    Class XII (Commerce)
                  </MenuItem>
                  <MenuItem value="XII (Science)">Class XII (Science)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="year-label">Academic Year</InputLabel>
                <Select
                  labelId="year-label"
                  name="academicYear"
                  value={formData.academicYear}
                  label="Academic Year"
                  onChange={handleInputChange}
                >
                  <MenuItem value="2023-2024">2023-2024</MenuItem>
                  <MenuItem value="2024-2025">2024-2025</MenuItem>
                  <MenuItem value="2025-2026">2025-2026</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="exam-type-label">Exam Type</InputLabel>
                <Select
                  labelId="exam-type-label"
                  name="examType"
                  value={formData.examType}
                  label="Exam Type"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Annual">Annual</MenuItem>
                  <MenuItem value="Half-yearly">Half-yearly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                margin="dense"
                name="totalStudents"
                label="Total Students"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.totalStudents}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                margin="dense"
                name="passed"
                label="Passed Students"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.passed}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Top Performers
          </Typography>

          {formData.topPerformers.map((performer, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  margin="dense"
                  label="Student Name"
                  fullWidth
                  variant="outlined"
                  value={performer.name}
                  onChange={(e) =>
                    handleTopPerformerChange(index, "name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id={`position-label-${index}`}>
                    Position
                  </InputLabel>
                  <Select
                    labelId={`position-label-${index}`}
                    value={performer.position}
                    label="Position"
                    onChange={(e) =>
                      handleTopPerformerChange(
                        index,
                        "position",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="1st">1st</MenuItem>
                    <MenuItem value="2nd">2nd</MenuItem>
                    <MenuItem value="3rd">3rd</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  margin="dense"
                  label="Marks"
                  fullWidth
                  variant="outlined"
                  value={performer.marks}
                  onChange={(e) =>
                    handleTopPerformerChange(index, "marks", e.target.value)
                  }
                  placeholder="e.g. 450/500"
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={1}
                sx={{ display: "flex", alignItems: "center", mt: 1 }}
              >
                {index > 0 && (
                  <IconButton
                    color="error"
                    onClick={() => removeTopPerformer(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addTopPerformer}
            sx={{ mt: 2 }}
          >
            Add Another Performer
          </Button>
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
            Are you sure you want to delete this result record? This action
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

export default AdminResults;
