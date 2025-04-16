// src/components/admin/results/ResultDialogs.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {
  ResultBasicInfo,
  TopPerformersTable,
  ResultSummary,
  PositionDetails,
  ResultFormHeader,
  AddStudentButton,
} from "./ResultFormComponents";

// Add/Edit Result Dialog
export const ResultFormDialog = ({
  open,
  onClose,
  dialogMode,
  currentResult,
  availableYears,
  handleInputChange,
  handleStudentInputChange,
  handleSummaryInputChange,
  handlePositionInputChange,
  handleAddStudent,
  handleRemoveStudent,
  handleSaveResults,
}) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {dialogMode === "add" ? "Add New" : "Edit"} Results
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Basic Information (Year & Class) */}
          <ResultBasicInfo
            currentResult={currentResult}
            handleInputChange={handleInputChange}
            availableYears={availableYears}
          />

          {/* Top Performers Section */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Top Performers
          </Typography>

          <TopPerformersTable
            currentResult={currentResult}
            handleStudentInputChange={handleStudentInputChange}
            handleRemoveStudent={handleRemoveStudent}
          />

          <AddStudentButton handleAddStudent={handleAddStudent} />

          {/* Summary Information Section */}
          <ResultFormHeader />

          <ResultSummary
            currentResult={currentResult}
            handleSummaryInputChange={handleSummaryInputChange}
          />

          {/* First Position Details */}
          <Box sx={{ mt: 3 }}>
            <PositionDetails
              positionType="firstPosition"
              positionData={currentResult.summary?.firstPosition}
              studentData={currentResult.data[0]}
              handlePositionInputChange={handlePositionInputChange}
            />
          </Box>

          {/* Second Position Details */}
          <Box sx={{ mt: 3 }}>
            <PositionDetails
              positionType="secondPosition"
              positionData={currentResult.summary?.secondPosition}
              studentData={currentResult.data[1]}
              handlePositionInputChange={handlePositionInputChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
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
  );
};

// Delete Confirmation Dialog
export const DeleteConfirmationDialog = ({
  open,
  onClose,
  currentResult,
  handleDeleteResults,
}) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete results for Class{" "}
          {currentResult.class} ({currentResult.year})? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDeleteResults} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
