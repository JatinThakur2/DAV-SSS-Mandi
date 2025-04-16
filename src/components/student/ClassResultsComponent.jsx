// src/components/student/ClassResultsComponent.jsx
import React from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import {
  School as SchoolIcon,
  EmojiEvents as AwardIcon,
} from "@mui/icons-material";

// Helper function to get medal color based on position
const getMedalColor = (position) => {
  switch (position) {
    case "1st":
      return "#FFD700"; // Gold
    case "2nd":
      return "#C0C0C0"; // Silver
    case "3rd":
      return "#CD7F32"; // Bronze
    default:
      return "#1976d2"; // Default blue
  }
};

// Helper function to get a readable class name
const getClassName = (classCode) => {
  switch (classCode) {
    case "10":
      return "Class X";
    case "12Arts":
      return "Class XII (Arts)";
    case "12Commerce":
      return "Class XII (Commerce)";
    case "12Science":
      return "Class XII (Science)";
    default:
      return `Class ${classCode}`;
  }
};

const ClassResultsComponent = ({ results, year }) => {
  // Group results by class for better organization
  const resultsByClass = {};

  // Process all results for the given year
  results.forEach((result) => {
    // Initialize the array for this class if it doesn't exist
    if (!resultsByClass[result.class]) {
      resultsByClass[result.class] = [];
    }

    // Add this result to the appropriate class
    resultsByClass[result.class].push(result);
  });

  // Get all available classes
  const classes = Object.keys(resultsByClass);

  return (
    <Grid container spacing={4}>
      {classes.length === 0 ? (
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">No results found for {year}</Typography>
          </Paper>
        </Grid>
      ) : (
        classes.map((classCode) =>
          // For each class, show all results
          resultsByClass[classCode].map((result) => (
            <Grid item xs={12} md={6} key={result._id}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SchoolIcon sx={{ mr: 1 }} />
                  {getClassName(result.class)} Results
                </Typography>

                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  <Table
                    aria-label={`${getClassName(result.class)} results table`}
                  >
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "primary.main" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Position
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Marks
                        </TableCell>
                        {/* Show total marks column if data has it */}
                        {result.data[0]?.totalMarks && (
                          <TableCell
                            sx={{ color: "white", fontWeight: "bold" }}
                          >
                            Total
                          </TableCell>
                        )}
                        {/* Show percentage column if data has it */}
                        {result.data[0]?.percentage && (
                          <TableCell
                            sx={{ color: "white", fontWeight: "bold" }}
                            align="right"
                          >
                            Percentage
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.data.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: getMedalColor(
                                  student.position
                                ),
                                color: "white",
                                borderRadius: "4px",
                                px: 1,
                                py: 0.5,
                                width: "fit-content",
                              }}
                            >
                              <AwardIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
                              {student.position}
                            </Box>
                          </TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.marks}</TableCell>
                          {/* Show total marks if available */}
                          {result.data[0]?.totalMarks && (
                            <TableCell>{student.totalMarks}</TableCell>
                          )}
                          {/* Show percentage if available */}
                          {result.data[0]?.percentage && (
                            <TableCell align="right">
                              {student.percentage}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Show summary information if available */}
                {result.summary && (
                  <Box
                    sx={{
                      mt: 2,
                      bgcolor: "action.hover",
                      p: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Summary:
                    </Typography>
                    <Typography variant="body2">
                      Total Students: {result.summary.totalStudents} | Passed:{" "}
                      {result.summary.passed} | Pass Percentage:{" "}
                      {result.summary.result}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))
        )
      )}
    </Grid>
  );
};

export default ClassResultsComponent;
