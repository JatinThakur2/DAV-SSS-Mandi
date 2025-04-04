import React, { useState } from "react";
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
  Tabs,
  Tab,
} from "@mui/material";

function FeeStructure() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fee structure data for new students
  const newStudentsFees = [
    {
      class: "Nursery",
      tuition: 1250,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 3370,
    },
    {
      class: "KG",
      tuition: 1250,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 3370,
    },
    {
      class: "I",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4880,
    },
    {
      class: "II",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4880,
    },
    {
      class: "III",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4880,
    },
    {
      class: "IV",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4880,
    },
    {
      class: "V",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4880,
    },
    {
      class: "VI",
      tuition: 1600,
      ip: 150,
      totalWithIP: 5400,
      totalWithoutIP: "—",
    },
    {
      class: "VII",
      tuition: 1600,
      ip: 150,
      totalWithIP: 5400,
      totalWithoutIP: "—",
    },
    {
      class: "VIII",
      tuition: 1600,
      ip: 150,
      totalWithIP: 5400,
      totalWithoutIP: "—",
    },
    {
      class: "IX",
      tuition: 1700,
      ip: 200,
      totalWithIP: 6050,
      totalWithoutIP: "—",
    },
    {
      class: "X",
      tuition: 1700,
      ip: 200,
      totalWithIP: 6050,
      totalWithoutIP: "—",
    },
    {
      class: "XI (Arts/Comm)",
      tuition: 1800,
      ip: 250,
      totalWithIP: 8450,
      totalWithoutIP: 8200,
    },
    {
      class: "XI (Medical)",
      tuition: 2130,
      ip: 250,
      totalWithIP: 10630,
      totalWithoutIP: 10380,
    },
    {
      class: "XI (Non Medical)",
      tuition: 2040,
      ip: 250,
      totalWithIP: 10540,
      totalWithoutIP: 10290,
    },
    {
      class: "XII (Arts/Comm)",
      tuition: 1800,
      ip: 250,
      totalWithIP: 8450,
      totalWithoutIP: 8200,
    },
    {
      class: "XII (Medical)",
      tuition: 2130,
      ip: 250,
      totalWithIP: 10630,
      totalWithoutIP: 10380,
    },
    {
      class: "XII (Non Medical)",
      tuition: 2040,
      ip: 250,
      totalWithIP: 10540,
      totalWithoutIP: 10290,
    },
  ];

  // Fee structure data for old students
  const oldStudentsFees = [
    {
      class: "Nursery",
      tuition: 1250,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 2770,
    },
    {
      class: "KG",
      tuition: 1250,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 2770,
    },
    {
      class: "I",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4880,
    },
    {
      class: "II",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4160,
    },
    {
      class: "III",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4160,
    },
    {
      class: "IV",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4160,
    },
    {
      class: "V",
      tuition: 1430,
      ip: "—",
      totalWithIP: "—",
      totalWithoutIP: 4160,
    },
    {
      class: "VI",
      tuition: 1600,
      ip: 150,
      totalWithIP: 5250,
      totalWithoutIP: "—",
    },
    {
      class: "VII",
      tuition: 1600,
      ip: 150,
      totalWithIP: 4650,
      totalWithoutIP: "—",
    },
    {
      class: "VIII",
      tuition: 1600,
      ip: 150,
      totalWithIP: 4650,
      totalWithoutIP: "—",
    },
    {
      class: "IX",
      tuition: 1700,
      ip: 200,
      totalWithIP: 5900,
      totalWithoutIP: "—",
    },
    {
      class: "X",
      tuition: 1700,
      ip: 200,
      totalWithIP: 5000,
      totalWithoutIP: "—",
    },
    {
      class: "XI (Arts/Comm)",
      tuition: 1800,
      ip: 250,
      totalWithIP: 8250,
      totalWithoutIP: 8000,
    },
    {
      class: "XI (Medical)",
      tuition: 2130,
      ip: 250,
      totalWithIP: 10430,
      totalWithoutIP: 10180,
    },
    {
      class: "XI (Non Medical)",
      tuition: 2040,
      ip: 250,
      totalWithIP: 10340,
      totalWithoutIP: 10090,
    },
    {
      class: "XII (Arts/Comm)",
      tuition: 1800,
      ip: 250,
      totalWithIP: 8250,
      totalWithoutIP: 8000,
    },
    {
      class: "XII (Medical)",
      tuition: 2130,
      ip: 250,
      totalWithIP: 10430,
      totalWithoutIP: 10180,
    },
    {
      class: "XII (Non Medical)",
      tuition: 2040,
      ip: 250,
      totalWithIP: 10150,
      totalWithoutIP: 10090,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fees Structure
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="New Students" />
        <Tab label="Existing Students" />
      </Tabs>

      <Paper elevation={2} sx={{ p: 3 }}>
        {tabValue === 0 ? (
          <>
            <Typography variant="h6" gutterBottom color="primary">
              Fees Structure (New Students)
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table aria-label="fee structure table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.main" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Class
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Tuition Fees
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      IP Fee
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Total (With IP)
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Total (Without IP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newStudentsFees.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.class}
                      </TableCell>
                      <TableCell align="right">{row.tuition}</TableCell>
                      <TableCell align="right">{row.ip}</TableCell>
                      <TableCell align="right">{row.totalWithIP}</TableCell>
                      <TableCell align="right">{row.totalWithoutIP}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom color="primary">
              Fees Structure (Existing Students)
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table aria-label="fee structure table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.main" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Class
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Tuition Fees
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      IP Fee
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Total (With IP)
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Total (Without IP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {oldStudentsFees.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.class}
                      </TableCell>
                      <TableCell align="right">{row.tuition}</TableCell>
                      <TableCell align="right">{row.ip}</TableCell>
                      <TableCell align="right">{row.totalWithIP}</TableCell>
                      <TableCell align="right">{row.totalWithoutIP}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Typography
          variant="subtitle2"
          color="error"
          sx={{ mt: 3, fontWeight: "bold" }}
        >
          Note: Please note that Computers are compulsory for classes 6th to 8th
          session
        </Typography>
      </Paper>
    </Box>
  );
}

export default FeeStructure;
