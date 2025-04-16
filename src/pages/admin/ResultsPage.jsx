// src/pages/admin/ResultsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Import our custom components and utilities
import {
  ResultsTable,
  NoYearsAlert,
} from "../../components/admin/results/ResultTableComponents";
import {
  ResultFormDialog,
  DeleteConfirmationDialog,
} from "../../components/admin/results/ResultDialogs";
import {
  useResultState,
  getAvailableYears,
  getDefaultResultState,
} from "../../components/admin/results/ResultUtils";

function ResultsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [expandedRow, setExpandedRow] = useState(null);
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

  // Use our custom hook for managing result state and calculations
  const {
    currentResult,
    setCurrentResult,
    handleInputChange,
    handleStudentInputChange,
    handleSummaryInputChange,
    handlePositionInputChange,
    handleAddStudent,
    handleRemoveStudent,
  } = useResultState(getDefaultResultState());

  // Get all years for tabs
  const years = [...new Set(allResults.map((result) => result.year))]
    .sort()
    .reverse();

  // Get available years for dropdown
  const availableYears = getAvailableYears(years);

  // Filter results by the selected year tab
  const filteredResults = allResults.filter(
    (result) => result.year === (years[tabValue] || "")
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      // For edit mode, copy the existing result
      setCurrentResult({
        year: item.year,
        class: item.class,
        data: item.data.map((student) => ({
          ...student,
          totalMarks: student.totalMarks || "", // Handle old data without totalMarks
          percentage: student.percentage || "", // Handle old data without percentage
        })),
        summary: item.summary
          ? {
              ...item.summary,
              firstPosition: {
                ...item.summary.firstPosition,
                totalMarks: item.summary.firstPosition?.totalMarks || "",
              },
              secondPosition: {
                ...item.summary.secondPosition,
                totalMarks: item.summary.secondPosition?.totalMarks || "",
              },
            }
          : getDefaultResultState().summary,
      });
      setCurrentResultId(item._id);
    } else {
      // For add mode, reset to defaults
      setCurrentResult(getDefaultResultState());
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

  return (
    <Box>
      {/* Header with title and add button */}
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

      {/* Year tabs or no results message */}
      {years.length > 0 ? (
        <Tabs
          value={tabValue < years.length ? tabValue : 0}
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
        <NoYearsAlert handleOpenDialog={handleOpenDialog} />
      )}

      {/* Results table */}
      {years.length > 0 && (
        <ResultsTable
          filteredResults={filteredResults}
          expandedRow={expandedRow}
          handleToggleExpand={handleToggleExpand}
          handleOpenDialog={handleOpenDialog}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
        />
      )}

      {/* Dialogs */}
      <ResultFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        dialogMode={dialogMode}
        currentResult={currentResult}
        availableYears={availableYears}
        handleInputChange={handleInputChange}
        handleStudentInputChange={handleStudentInputChange}
        handleSummaryInputChange={handleSummaryInputChange}
        handlePositionInputChange={handlePositionInputChange}
        handleAddStudent={handleAddStudent}
        handleRemoveStudent={handleRemoveStudent}
        handleSaveResults={handleSaveResults}
      />

      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        currentResult={currentResult}
        handleDeleteResults={handleDeleteResults}
      />

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
