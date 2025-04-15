import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  EmojiEvents as AwardIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function Results() {
  const [tabValue, setTabValue] = useState(0);

  // Fetch results from Convex
  const allResults = useQuery(api.results.getResults) || [];

  // Get unique years for tabs
  const years = [...new Set(allResults.map((result) => result.year))]
    .sort()
    .reverse();

  // Set the default tab value based on available years
  React.useEffect(() => {
    if (years.length > 0 && tabValue >= years.length) {
      setTabValue(0);
    }
  }, [years, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  // Loading state
  const isLoading = allResults === undefined;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Academic Results
      </Typography>

      {isLoading ? (
        // Loading skeleton
        <>
          <Skeleton variant="rectangular" height={48} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={400} />
        </>
      ) : years.length === 0 ? (
        // No results case
        <Alert severity="info" sx={{ my: 3 }}>
          No examination results available at the moment.
        </Alert>
      ) : (
        <>
          <Tabs
            value={tabValue < years.length ? tabValue : 0}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{ mb: 3 }}
          >
            {years.map((year, index) => (
              <Tab key={year} label={year} />
            ))}
          </Tabs>

          {years.map((year, yearIndex) => {
            // Filter results by the selected year
            const yearResults = allResults.filter(
              (result) => result.year === year
            );

            return (
              <Box
                key={year}
                sx={{ display: tabValue === yearIndex ? "block" : "none" }}
              >
                <Grid container spacing={4}>
                  {/* Class 10 Results */}
                  {yearResults
                    .filter((result) => result.class === "10")
                    .map((result) => (
                      <Grid item xs={12} md={6} key={result._id}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <SchoolIcon sx={{ mr: 1 }} />
                            Class X Results
                          </Typography>

                          <TableContainer
                            component={Paper}
                            variant="outlined"
                            sx={{ mt: 2 }}
                          >
                            <Table aria-label="class 12 arts results table">
                              <TableHead>
                                <TableRow
                                  sx={{ backgroundColor: "primary.main" }}
                                >
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Position
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Name
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                    align="right"
                                  >
                                    Marks
                                  </TableCell>
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
                                        <AwardIcon
                                          sx={{ mr: 0.5, fontSize: "1rem" }}
                                        />
                                        {student.position}
                                      </Box>
                                    </TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell align="right">
                                      {student.marks}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </Grid>
                    ))}

                  {/* Class 12 Commerce Results */}
                  {yearResults
                    .filter((result) => result.class === "12Commerce")
                    .map((result) => (
                      <Grid item xs={12} md={6} key={result._id}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <SchoolIcon sx={{ mr: 1 }} />
                            Class XII (Commerce) Results
                          </Typography>

                          <TableContainer
                            component={Paper}
                            variant="outlined"
                            sx={{ mt: 2 }}
                          >
                            <Table aria-label="class 12 commerce results table">
                              <TableHead>
                                <TableRow
                                  sx={{ backgroundColor: "primary.main" }}
                                >
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Position
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Name
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                    align="right"
                                  >
                                    Marks
                                  </TableCell>
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
                                        <AwardIcon
                                          sx={{ mr: 0.5, fontSize: "1rem" }}
                                        />
                                        {student.position}
                                      </Box>
                                    </TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell align="right">
                                      {student.marks}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </Grid>
                    ))}

                  {/* Class 12 Science Results */}
                  {yearResults
                    .filter((result) => result.class === "12Science")
                    .map((result) => (
                      <Grid item xs={12} md={6} key={result._id}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <SchoolIcon sx={{ mr: 1 }} />
                            Class XII (Science) Results
                          </Typography>

                          <TableContainer
                            component={Paper}
                            variant="outlined"
                            sx={{ mt: 2 }}
                          >
                            <Table aria-label="class 12 science results table">
                              <TableHead>
                                <TableRow
                                  sx={{ backgroundColor: "primary.main" }}
                                >
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Position
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                  >
                                    Name
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "white", fontWeight: "bold" }}
                                    align="right"
                                  >
                                    Marks
                                  </TableCell>
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
                                        <AwardIcon
                                          sx={{ mr: 0.5, fontSize: "1rem" }}
                                        />
                                        {student.position}
                                      </Box>
                                    </TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell align="right">
                                      {student.marks}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </Grid>
                    ))}

                  {/* Summary Cards - Only displayed if we have summary data */}
                  {yearResults.some((result) => result.summary) && (
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                        Result Summary
                      </Typography>
                      <Grid container spacing={3}>
                        {yearResults
                          .filter((result) => result.summary)
                          .map((result) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={3}
                              key={`summary-${result._id}`}
                            >
                              <Card>
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    color="primary"
                                  >
                                    Class{" "}
                                    {result.class === "10"
                                      ? "Tenth"
                                      : result.class === "12Arts"
                                        ? "XII Arts"
                                        : result.class === "12Commerce"
                                          ? "XII Commerce"
                                          : "XII Science"}
                                  </Typography>
                                  <Divider sx={{ mb: 2 }} />

                                  <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                      <Typography variant="body2">
                                        Total Students
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                      >
                                        {result.summary.totalStudents}
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                      <Typography variant="body2">
                                        Passed
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                      >
                                        {result.summary.passed}
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                      <Typography variant="body2">
                                        Result
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color="success.main"
                                      >
                                        {result.summary.result}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Divider sx={{ my: 2 }} />

                                  <Typography variant="subtitle2" gutterBottom>
                                    Top Performers
                                  </Typography>

                                  <Box sx={{ mt: 1 }}>
                                    {result.summary.firstPosition && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          mb: 1,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            backgroundColor: "#FFD700",
                                            color: "white",
                                            borderRadius: "50%",
                                            width: 24,
                                            height: 24,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mr: 1,
                                          }}
                                        >
                                          1
                                        </Box>
                                        <Typography
                                          variant="body2"
                                          fontWeight="bold"
                                        >
                                          {result.summary.firstPosition.name} -{" "}
                                          {result.summary.firstPosition.marks} (
                                          {
                                            result.summary.firstPosition
                                              .percentage
                                          }
                                          )
                                        </Typography>
                                      </Box>
                                    )}

                                    {result.summary.secondPosition && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            backgroundColor: "#C0C0C0",
                                            color: "white",
                                            borderRadius: "50%",
                                            width: 24,
                                            height: 24,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mr: 1,
                                          }}
                                        >
                                          2
                                        </Box>
                                        <Typography
                                          variant="body2"
                                          fontWeight="bold"
                                        >
                                          {result.summary.secondPosition.name} -{" "}
                                          {result.summary.secondPosition.marks}{" "}
                                          (
                                          {
                                            result.summary.secondPosition
                                              .percentage
                                          }
                                          )
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
}

export default Results;
