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
  Avatar,
  Chip,
} from "@mui/material";

function TeachingStaff() {
  // Teaching staff data from the administration.txt file
  const teachingStaff = [
    {
      id: 1,
      name: "SANGEETA KAPOOR",
      designation: "Principal",
      qualification: "MA Eng B.Ed",
      experience: "28 years",
    },
    {
      id: 2,
      name: "JAGDISH KUMAR",
      designation: "Vice Principal",
      qualification: "M.Sc Physics M.Ed",
      experience: "23 years",
    },
    {
      id: 3,
      name: "BANDANA TANDON",
      designation: "PGT Commerce",
      qualification: "M.Com B.Ed",
      experience: "24 years",
    },
    {
      id: 4,
      name: "DEEPA",
      designation: "PGT Chemistry",
      qualification: "M.Sc Chem B.Ed",
      experience: "01 year",
    },
    {
      id: 5,
      name: "RASHMI",
      designation: "PGT Maths",
      qualification: "M.Sc Maths B.Ed",
      experience: "01 year",
    },
    {
      id: 6,
      name: "MAYA DEVI",
      designation: "PGT Hindi",
      qualification: "MA Hindi B.Ed",
      experience: "07 years",
    },
    {
      id: 7,
      name: "KUNJAN SHARMA",
      designation: "PGT Eng",
      qualification: "MA Eng B.Ed",
      experience: "08 years",
    },
    {
      id: 8,
      name: "MARUTI SHARMA",
      designation: "PGT Computers",
      qualification: "MCA",
      experience: "23 years",
    },
    {
      id: 9,
      name: "KASHMIR SINGH",
      designation: "PGT P.Ed",
      qualification: "M.PEd",
      experience: "08 years",
    },
    {
      id: 10,
      name: "RITA DEVI",
      designation: "PGT Bio",
      qualification: "M.Sc Bio B.Ed",
      experience: "05 years",
    },
    {
      id: 11,
      name: "MEENA KUMARI",
      designation: "PGT Pol Sci",
      qualification: "MA Pol Sci B.Ed",
      experience: "05years",
    },
    {
      id: 12,
      name: "KIRAN",
      designation: "PGT Economics",
      qualification: "MA Eco B.Ed",
      experience: "02 years",
    },
    {
      id: 13,
      name: "POOJA GAUTAM",
      designation: "LT",
      qualification: "MA Hindi B.Ed",
      experience: "01 year",
    },
    {
      id: 14,
      name: "POONAM KAPOOR",
      designation: "TGT Arts",
      qualification: "MA Sociology B.Ed",
      experience: "25 years",
    },
    {
      id: 15,
      name: "APARNA KAPOOR",
      designation: "TGT Arts",
      qualification: "MA Pub Adm B.Ed",
      experience: "23 years",
    },
    {
      id: 16,
      name: "SUNITA DEVI",
      designation: "TGT Medical",
      qualification: "M.Sc Bio B.Ed",
      experience: "06 years",
    },
    {
      id: 17,
      name: "MUNISHA SHARMA",
      designation: "TGT Non Medical",
      qualification: "B.Sc B.Ed",
      experience: "03years",
    },
    {
      id: 18,
      name: "NIRMALA DEVI",
      designation: "TGT Sanskrit",
      qualification: "MA Skt B.Ed",
      experience: "03 year",
    },
    {
      id: 19,
      name: "BABITA MALHOTRA",
      designation: "TGT Arts",
      qualification: "BA B.Ed",
      experience: "35 years",
    },
    {
      id: 20,
      name: "MUSKAN",
      designation: "JBT",
      qualification: "BA B.Ed",
      experience: "01 year",
    },
    {
      id: 21,
      name: "SONIA KAPOOR",
      designation: "Asstt Librarian",
      qualification: "BA B.Ed",
      experience: "14 years",
    },
    {
      id: 22,
      name: "YOGITA SHARMA",
      designation: "Arts & Craft",
      qualification: "Diploma in Arts & Craft",
      experience: "14 years",
    },
    {
      id: 23,
      name: "POONAM RANA",
      designation: "JBT",
      qualification: "MA Hindi B.Ed",
      experience: "09years",
    },
    {
      id: 24,
      name: "NISHA",
      designation: "JBT",
      qualification: "MA B.Ed",
      experience: "01 year",
    },
    {
      id: 25,
      name: "CHANCHAL",
      designation: "JBT",
      qualification: "MA B.Ed",
      experience: "01 year",
    },
  ];

  // Get unique designations for filtering
  const designations = [
    ...new Set(teachingStaff.map((staff) => staff.designation)),
  ];

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Function to get color based on designation
  const getDesignationColor = (designation) => {
    const colors = {
      Principal: "#8e24aa",
      "Vice Principal": "#5e35b1",
      PGT: "#1976d2",
      TGT: "#00897b",
      JBT: "#43a047",
      "Asstt Librarian": "#fb8c00",
      "Arts & Craft": "#d81b60",
    };

    for (const key in colors) {
      if (designation.includes(key)) {
        return colors[key];
      }
    }
    return "#757575"; // Default color
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Teaching Staff
      </Typography>
      <Typography variant="body1" paragraph>
        For Session 2025
      </Typography>

      <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {designations.map((designation, index) => (
          <Chip
            key={index}
            label={designation}
            sx={{
              backgroundColor: getDesignationColor(designation),
              color: "white",
              m: 0.5,
            }}
          />
        ))}
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="teaching staff table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Sr. No
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Designation
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Qualification
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Experience
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachingStaff.map((staff) => (
              <TableRow
                key={staff.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                  "&:hover": { backgroundColor: "action.selected" },
                }}
              >
                <TableCell>{staff.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        mr: 2,
                        bgcolor: getDesignationColor(staff.designation),
                        width: 36,
                        height: 36,
                        fontSize: "0.875rem",
                      }}
                    >
                      {getInitials(staff.name)}
                    </Avatar>
                    {staff.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={staff.designation}
                    size="small"
                    sx={{
                      backgroundColor: getDesignationColor(staff.designation),
                      color: "white",
                    }}
                  />
                </TableCell>
                <TableCell>{staff.qualification}</TableCell>
                <TableCell>{staff.experience}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TeachingStaff;
