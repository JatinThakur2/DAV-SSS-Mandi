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
} from "@mui/material";
import {
  EmojiEvents as AwardIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

function Results() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Results data from student zone.txt
  const results2023 = {
    class10: [
      { position: "1st", name: "SUHANI", marks: "654/700" },
      { position: "2nd", name: "AAYUSHI", marks: "625/700" },
      { position: "3rd", name: "JIYA", marks: "610/700" },
    ],
    class12Arts: [
      { position: "1st", name: "SHIVANSH SHARMA", marks: "406/500" },
      { position: "2nd", name: "KAVYANSH", marks: "405/500" },
      { position: "3rd", name: "ANAMIKA SHARMA", marks: "388/500" },
    ],
    class12Commerce: [
      { position: "1st", name: "TANISHA", marks: "422/500" },
      { position: "2nd", name: "DIKSHA THAKUR", marks: "382/500" },
      { position: "3rd", name: "AKSHAT SHARMA", marks: "332/500" },
    ],
    class12Science: [
      { position: "1st", name: "YUKTA", marks: "438/500" },
      { position: "2nd", name: "MANIKA SHARMA", marks: "423/500" },
      { position: "3rd", name: "PANKAJ", marks: "408/500" },
    ],
  };

  const results2021 = {
    summary: {
      class10: {
        totalStudents: 42,
        passed: 42,
        result: "100%",
        firstPosition: {
          name: "Yukta",
          marks: "643/700",
          percentage: "91.85%",
        },
        secondPosition: {
          name: "YuvRaj",
          marks: "610/700",
          percentage: "87.14%",
        },
      },
      class12Science: {
        totalStudents: 25,
        passed: 25,
        result: "100%",
        firstPosition: {
          name: "Nancy Chandel",
          marks: "767/500",
          percentage: "93%",
        },
        secondPosition: {
          name: "Nikita Kumari",
          marks: "449/500",
          percentage: "90%",
        },
      },
      class12Arts: {
        totalStudents: 21,
        passed: 21,
        result: "100%",
        firstPosition: {
          name: "Gayatri Saini",
          marks: "480/500",
          percentage: "96%",
        },
        secondPosition: {
          name: "Anshika Yadav",
          marks: "432/500",
          percentage: "86.4%",
        },
      },
      class12Commerce: {
        totalStudents: 6,
        passed: 3,
        result: "100%",
        firstPosition: {
          name: "Anshika Thakur",
          marks: "364/500",
          percentage: "72.8%",
        },
        secondPosition: {
          name: "Kavisha",
          marks: "336/500",
          percentage: "67.2%",
        },
      },
    },
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Academic Results
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="2023-2024" />
        <Tab label="2020-2021" />
      </Tabs>

      {tabValue === 0 ? (
        <Grid container spacing={4}>
          {/* Class 10 Results */}
          <Grid item xs={12} md={6}>
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
                <Table aria-label="class 10 results table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Position
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
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
                    {results2023.class10.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: getMedalColor(result.position),
                              color: "white",
                              borderRadius: "4px",
                              px: 1,
                              py: 0.5,
                              width: "fit-content",
                            }}
                          >
                            <AwardIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
                            {result.position}
                          </Box>
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell align="right">{result.marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Class 12 Arts Results */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <SchoolIcon sx={{ mr: 1 }} />
                Class XII (Arts) Results
              </Typography>

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                <Table aria-label="class 12 arts results table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Position
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
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
                    {results2023.class12Arts.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: getMedalColor(result.position),
                              color: "white",
                              borderRadius: "4px",
                              px: 1,
                              py: 0.5,
                              width: "fit-content",
                            }}
                          >
                            <AwardIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
                            {result.position}
                          </Box>
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell align="right">{result.marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Class 12 Commerce Results */}
          <Grid item xs={12} md={6}>
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
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Position
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
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
                    {results2023.class12Commerce.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: getMedalColor(result.position),
                              color: "white",
                              borderRadius: "4px",
                              px: 1,
                              py: 0.5,
                              width: "fit-content",
                            }}
                          >
                            <AwardIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
                            {result.position}
                          </Box>
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell align="right">{result.marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Class 12 Science Results */}
          <Grid item xs={12} md={6}>
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
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Position
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
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
                    {results2023.class12Science.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: getMedalColor(result.position),
                              color: "white",
                              borderRadius: "4px",
                              px: 1,
                              py: 0.5,
                              width: "fit-content",
                            }}
                          >
                            <AwardIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
                            {result.position}
                          </Box>
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell align="right">{result.marks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom align="center">
            Academic Session 2020-21
          </Typography>

          <Grid container spacing={4}>
            {/* Class 10 Results */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Class Tenth
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Total Students Appeared
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class10.totalStudents}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Passed</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class10.passed}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Result</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {results2021.summary.class10.result}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Top Performers
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class10.firstPosition.name} -{" "}
                        {results2021.summary.class10.firstPosition.marks} (
                        {results2021.summary.class10.firstPosition.percentage})
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class10.secondPosition.name} -{" "}
                        {results2021.summary.class10.secondPosition.marks} (
                        {results2021.summary.class10.secondPosition.percentage})
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Class 12 Science Results */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Class XII Science
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Total Students Appeared
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class12Science.totalStudents}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Passed</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class12Science.passed}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Result</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {results2021.summary.class12Science.result}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Top Performers
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class12Science.firstPosition.name}{" "}
                        -{" "}
                        {results2021.summary.class12Science.firstPosition.marks}{" "}
                        (
                        {
                          results2021.summary.class12Science.firstPosition
                            .percentage
                        }
                        )
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class12Science.secondPosition.name}{" "}
                        -{" "}
                        {
                          results2021.summary.class12Science.secondPosition
                            .marks
                        }{" "}
                        (
                        {
                          results2021.summary.class12Science.secondPosition
                            .percentage
                        }
                        )
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Class 12 Arts Results */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Class XII Arts
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Total Students Appeared
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class12Arts.totalStudents}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Passed</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class12Arts.passed}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Result</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {results2021.summary.class12Arts.result}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Top Performers
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class12Arts.firstPosition.name} -{" "}
                        {results2021.summary.class12Arts.firstPosition.marks} (
                        {
                          results2021.summary.class12Arts.firstPosition
                            .percentage
                        }
                        )
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class12Arts.secondPosition.name} -{" "}
                        {results2021.summary.class12Arts.secondPosition.marks} (
                        {
                          results2021.summary.class12Arts.secondPosition
                            .percentage
                        }
                        )
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Class 12 Commerce Results */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Class XII Commerce
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Total Students Appeared
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class12Commerce.totalStudents}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Passed</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" fontWeight="bold">
                        {results2021.summary.class12Commerce.passed}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2">Result</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="success.main"
                      >
                        {results2021.summary.class12Commerce.result}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Top Performers
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {results2021.summary.class12Commerce.firstPosition.name}{" "}
                        -{" "}
                        {
                          results2021.summary.class12Commerce.firstPosition
                            .marks
                        }{" "}
                        (
                        {
                          results2021.summary.class12Commerce.firstPosition
                            .percentage
                        }
                        )
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      <Typography variant="body2" fontWeight="bold">
                        {
                          results2021.summary.class12Commerce.secondPosition
                            .name
                        }{" "}
                        -{" "}
                        {
                          results2021.summary.class12Commerce.secondPosition
                            .marks
                        }{" "}
                        (
                        {
                          results2021.summary.class12Commerce.secondPosition
                            .percentage
                        }
                        )
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Results;
