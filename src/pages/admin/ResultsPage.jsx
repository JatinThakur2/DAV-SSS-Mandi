// src/pages/admin/ResultsPage.jsx
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Grid,
  Alert,
  Snackbar,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  EmojiEvents as AwardIcon,
} from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function ResultsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentResult, setCurrentResult] = useState({
    year: new Date().getFullYear().toString(),
    class: "10",
    data: [
      { position: "1st", name: "", marks: "" },
      { position: "2nd", name: "", marks: "" },
      { position: "3rd", name: "", marks: "" },
    ],
    summary: {
      totalStudents: 0,
      passed: 0,
      result: "0%",
      firstPosition: { name: "", marks: "", percentage: "" },
      secondPosition: { name: "", marks: "", percentage: "" },
    },
  });
  const [currentResultId, setCurrentResultId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Convex API hooks
  const allResults = useQuery(api.results.getResults) || [];

  const addResults = useMutation(api.results.addResults);
  const updateResults = useMutation(api.results.updateResults);
  const deleteResults = useMutation(api.results.deleteResults);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      setCurrentResult({
        year: item.year,
        class: item.class,
        data: [...item.data],
        summary: item.summary ? { ...item.summary } : null,
      });
      setCurrentResultId(item._id);
    } else {
      setCurrentResult({
        year: new Date().getFullYear().toString(),
        class: "10",
        data: [
          { position: "1st", name: "", marks: "" },
          { position: "2nd", name: "", marks: "" },
          { position: "3rd", name: "", marks: "" },
        ],
        summary: {
          totalStudents: 0,
          passed: 0,
          result: "0%",
          firstPosition: { name: "", marks: "", percentage: "" },
          secondPosition: { name: "", marks: "", percentage: "" },
        },
      });
      setCurrentResultId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id, info) => {
    setCurrentResultId(id);
    setCurrentResult(info);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentResult({
      ...currentResult,
      [name]: value,
    });
  };

  const handleStudentInputChange = (index, field, value) => {
    const updatedData = [...currentResult.data];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setCurrentResult({
      ...currentResult,
      data: updatedData,
    });
  };

  const handleSummaryInputChange = (field, value) => {
    setCurrentResult({
      ...currentResult,
      summary: {
        ...currentResult.summary,
        [field]: value,
      },
    });
  };

  const handlePositionInputChange = (positionType, field, value) => {
    setCurrentResult({
      ...currentResult,
      summary: {
        ...currentResult.summary,
        [positionType]: {
          ...currentResult.summary[positionType],
          [field]: value,
        },
      },
    });
  };

  const handleAddStudent = () => {
    setCurrentResult({
      ...currentResult,
      data: [
        ...currentResult.data,
        { position: `${currentResult.data.length + 1}th`, name: "", marks: "" },
      ],
    });
  };

  const handleRemoveStudent = (index) => {
    const updatedData = [...currentResult.data];
    updatedData.splice(index, 1);
    setCurrentResult({
      ...currentResult,
      data: updatedData,
    });
  };

  const handleSaveResults = async () => {
    try {
      if (dialogMode === "add") {
        await addResults(currentResult);
        setSnackbar({
          open: true,
          message: `Results for Class ${currentResult.class} (${currentResult.year}) added successfully`,
          severity: "success",
        });
      } else {
        await updateResults({
          id: currentResultId,
          ...currentResult,
        });
        setSnackbar({
          open: true,
          message: `Results for Class ${currentResult.class} (${currentResult.year}) updated successfully`,
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving results:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleDeleteResults = async () => {
    try {
      await deleteResults({ id: currentResultId });
      setSnackbar({
        open: true,
        message: "Results deleted successfully",
        severity: "success",
      });
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting results:", error);
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

  const handleToggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Filter results by year
  const years = [...new Set(allResults.map((result) => result.year))]
    .sort()
    .reverse();
  const filteredResults = allResults.filter(
    (result) => result.year === (years[tabValue] || "")
  );

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
        <Typography variant="h4">Examination Results</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Add Results
        </Button>
      </Box>

      {years.length > 0 ? (
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          {years.map((year, index) => (
            <Tab key={year} label={year} />
          ))}
        </Tabs>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          No results added yet. Click the "Add Results" button to add your first
          results.
        </Alert>
      )}

      {years.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="5%"></TableCell>
                  <TableCell width="15%">Class</TableCell>
                  <TableCell width="15%">Year</TableCell>
                  <TableCell width="50%">Top Students</TableCell>
                  <TableCell width="15%" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" sx={{ py: 3 }}>
                        No results found for this year. Click the "Add Results"
                        button to add some.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResults.map((result) => (
                    <React.Fragment key={result._id}>
                      <TableRow hover>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleExpand(result._id)}
                          >
                            {expandedRow === result._id ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={result.class}
                            color={
                              result.class === "10"
                                ? "primary"
                                : result.class.includes("Science")
                                  ? "success"
                                  : result.class.includes("Arts")
                                    ? "warning"
                                    : "info"
                            }
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{result.year}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            {result.data.slice(0, 3).map((student, index) => (
                              <Chip
                                key={index}
                                icon={<AwardIcon />}
                                label={`${student.position}: ${student.name}`}
                                variant="outlined"
                                size="small"
                                sx={{
                                  bgcolor:
                                    index === 0
                                      ? "gold"
                                      : index === 1
                                        ? "silver"
                                        : "#cd7f32",
                                  color: "white",
                                }}
                              />
                            ))}
                            {result.data.length > 3 && (
                              <Chip
                                label={`+${result.data.length - 3} more`}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Stack>
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
                              onClick={() => handleOpenDialog("edit", result)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() =>
                                handleOpenDeleteDialog(result._id, result)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                      {expandedRow === result._id && (
                        <TableRow>
                          <TableCell colSpan={5} sx={{ py: 0 }}>
                            <Box sx={{ p: 2, bgcolor: "action.hover" }}>
                              <Typography variant="subtitle1" gutterBottom>
                                Detailed Results for Class {result.class} (
                                {result.year})
                              </Typography>
                              <Divider sx={{ mb: 2 }} />
                              <Grid container spacing={3}>
                                {result.summary && (
                                  <Grid item xs={12} md={4}>
                                    <Typography
                                      variant="subtitle2"
                                      gutterBottom
                                    >
                                      Summary
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2 }}>
                                      <li>
                                        <Typography variant="body2">
                                          Total Students:{" "}
                                          {result.summary.totalStudents}
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="body2">
                                          Passed: {result.summary.passed}
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="body2">
                                          Pass Percentage:{" "}
                                          {result.summary.result}
                                        </Typography>
                                      </li>
                                    </Box>
                                  </Grid>
                                )}
                                <Grid item xs={12} md={8}>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Top Performers
                                  </Typography>
                                  <TableContainer>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Position</TableCell>
                                          <TableCell>Name</TableCell>
                                          <TableCell>Marks</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {result.data.map((student, index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {student.position}
                                            </TableCell>
                                            <TableCell>
                                              {student.name}
                                            </TableCell>
                                            <TableCell>
                                              {student.marks}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add New" : "Edit"} Results
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Year"
                  name="year"
                  value={currentResult.year}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="class"
                    value={currentResult.class}
                    label="Class"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="10">Class X</MenuItem>
                    <MenuItem value="12Arts">Class XII (Arts)</MenuItem>
                    <MenuItem value="12Commerce">Class XII (Commerce)</MenuItem>
                    <MenuItem value="12Science">Class XII (Science)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Top Performers
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width="20%">Position</TableCell>
                    <TableCell width="40%">Name</TableCell>
                    <TableCell width="30%">Marks</TableCell>
                    <TableCell width="10%"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentResult.data.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          size="small"
                          value={student.position}
                          onChange={(e) =>
                            handleStudentInputChange(
                              index,
                              "position",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={student.name}
                          onChange={(e) =>
                            handleStudentInputChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={student.marks}
                          onChange={(e) =>
                            handleStudentInputChange(
                              index,
                              "marks",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        {index > 2 && (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveStudent(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              startIcon={<AddIcon />}
              onClick={handleAddStudent}
              sx={{ mt: 2 }}
            >
              Add Student
            </Button>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Summary Information (Optional)
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Total Students"
                  type="number"
                  value={currentResult.summary?.totalStudents || ""}
                  onChange={(e) =>
                    handleSummaryInputChange(
                      "totalStudents",
                      parseInt(e.target.value, 10)
                    )
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Students Passed"
                  type="number"
                  value={currentResult.summary?.passed || ""}
                  onChange={(e) =>
                    handleSummaryInputChange(
                      "passed",
                      parseInt(e.target.value, 10)
                    )
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Pass Percentage"
                  value={currentResult.summary?.result || ""}
                  onChange={(e) =>
                    handleSummaryInputChange("result", e.target.value)
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  First Position Details:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Name"
                      value={currentResult.summary?.firstPosition?.name || ""}
                      onChange={(e) =>
                        handlePositionInputChange(
                          "firstPosition",
                          "name",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Marks"
                      value={currentResult.summary?.firstPosition?.marks || ""}
                      onChange={(e) =>
                        handlePositionInputChange(
                          "firstPosition",
                          "marks",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Percentage"
                      value={
                        currentResult.summary?.firstPosition?.percentage || ""
                      }
                      onChange={(e) =>
                        handlePositionInputChange(
                          "firstPosition",
                          "percentage",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Second Position Details:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Name"
                      value={currentResult.summary?.secondPosition?.name || ""}
                      onChange={(e) =>
                        handlePositionInputChange(
                          "secondPosition",
                          "name",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Marks"
                      value={currentResult.summary?.secondPosition?.marks || ""}
                      onChange={(e) =>
                        handlePositionInputChange(
                          "secondPosition",
                          "marks",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Percentage"
                      value={
                        currentResult.summary?.secondPosition?.percentage || ""
                      }
                      onChange={(e) =>
                        handlePositionInputChange(
                          "secondPosition",
                          "percentage",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveResults}
            variant="contained"
            disabled={
              !currentResult.year ||
              !currentResult.class ||
              currentResult.data.some((s) => !s.name || !s.marks)
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
            Are you sure you want to delete results for Class{" "}
            {currentResult.class} ({currentResult.year})? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleDeleteResults}
            color="error"
            variant="contained"
          >
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

export default ResultsPage;
