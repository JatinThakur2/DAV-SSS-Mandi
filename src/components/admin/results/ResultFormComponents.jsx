// src/components/admin/results/ResultFormComponents.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Calculate as CalculateIcon,
} from "@mui/icons-material";

// Component for the basic result information (year and class)
export const ResultBasicInfo = ({
  currentResult,
  handleInputChange,
  availableYears,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            value={currentResult.year}
            label="Year"
            onChange={handleInputChange}
          >
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
  );
};

// Component for the top performers table
export const TopPerformersTable = ({
  currentResult,
  handleStudentInputChange,
  handleRemoveStudent,
}) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="15%">Position</TableCell>
            <TableCell width="35%">Name</TableCell>
            <TableCell width="25%">Marks Obtained</TableCell>
            <TableCell width="15%">Total Marks</TableCell>
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
                    handleStudentInputChange(index, "position", e.target.value)
                  }
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  value={student.name}
                  onChange={(e) =>
                    handleStudentInputChange(index, "name", e.target.value)
                  }
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  value={student.marks}
                  onChange={(e) =>
                    handleStudentInputChange(index, "marks", e.target.value)
                  }
                  fullWidth
                  placeholder="e.g. 480"
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  value={student.totalMarks}
                  onChange={(e) =>
                    handleStudentInputChange(
                      index,
                      "totalMarks",
                      e.target.value
                    )
                  }
                  fullWidth
                  placeholder="e.g. 600"
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
  );
};

// Component for the summary information
export const ResultSummary = ({ currentResult, handleSummaryInputChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          label="Total Students"
          type="number"
          value={currentResult.summary?.totalStudents || ""}
          onChange={(e) =>
            handleSummaryInputChange(
              "totalStudents",
              parseInt(e.target.value, 10) || 0
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
              parseInt(e.target.value, 10) || 0
            )
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Pass Percentage"
          value={currentResult.summary?.result || ""}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          helperText="Auto-calculated from Total Students and Students Passed"
        />
      </Grid>
    </Grid>
  );
};

// Component for position details
export const PositionDetails = ({
  positionType,
  positionData,
  studentData,
  handlePositionInputChange,
}) => {
  const isAutoFilled =
    Boolean(studentData?.name) &&
    positionData?.name === studentData?.name &&
    positionData?.marks === studentData?.marks;

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {positionType === "firstPosition" ? "First" : "Second"} Position
        Details:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Name"
            value={positionData?.name || ""}
            onChange={(e) =>
              handlePositionInputChange(positionType, "name", e.target.value)
            }
            fullWidth
            InputProps={{
              readOnly: isAutoFilled,
            }}
            helperText={
              Boolean(studentData?.name)
                ? "Auto-filled from top performer"
                : "Enter manually or will be auto-filled"
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Marks Obtained"
            value={positionData?.marks || ""}
            onChange={(e) =>
              handlePositionInputChange(positionType, "marks", e.target.value)
            }
            fullWidth
            InputProps={{
              readOnly: isAutoFilled,
            }}
            helperText={
              Boolean(studentData?.marks)
                ? "Auto-filled from top performer"
                : "Enter manually or will be auto-filled"
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Total Marks"
            value={positionData?.totalMarks || ""}
            onChange={(e) =>
              handlePositionInputChange(
                positionType,
                "totalMarks",
                e.target.value
              )
            }
            fullWidth
            InputProps={{
              readOnly: isAutoFilled && Boolean(studentData?.totalMarks),
            }}
            helperText={
              Boolean(studentData?.totalMarks)
                ? "Auto-filled from top performer"
                : "Enter manually or will be auto-filled"
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Percentage"
            value={positionData?.percentage || ""}
            onChange={(e) =>
              handlePositionInputChange(
                positionType,
                "percentage",
                e.target.value
              )
            }
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            helperText="Auto-calculated from marks"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Result form header component
export const ResultFormHeader = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Summary Information
        <Chip
          icon={<CalculateIcon />}
          label="Auto-calculated"
          size="small"
          color="primary"
          variant="outlined"
          sx={{ ml: 2 }}
        />
      </Typography>
    </Box>
  );
};

// Add student button component
export const AddStudentButton = ({ handleAddStudent }) => {
  return (
    <Button startIcon={<AddIcon />} onClick={handleAddStudent} sx={{ mt: 2 }}>
      Add Student
    </Button>
  );
};
