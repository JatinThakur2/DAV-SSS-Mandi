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
import {
  Person as PersonIcon,
  SupervisorAccount as AdminIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

function NonTeachingStaff() {
  // Ministerial staff data from the administration.txt file
  const ministerialStaff = [
    {
      id: 1,
      name: "DEVRAJ",
      designation: "Office Incharge",
      qualification: "Higher Secondary",
      experience: "30 years",
    },
    {
      id: 2,
      name: "MAHENDER RANA",
      designation: "Office Assistant",
      qualification: "Higher Secondary",
      experience: "13 years",
    },
    {
      id: 3,
      name: "MAHESHWAR SINGH",
      designation: "Office Assistant",
      qualification: "Higher Secondary",
      experience: "19 years",
    },
  ];

  // Supporting staff data from the administration.txt file
  const supportingStaff = [
    {
      id: 4,
      name: "HANSA DEVI",
      designation: "Peon",
      qualification: "Matriculation",
      experience: "32 years",
    },
    {
      id: 5,
      name: "MAMTA KUMARI",
      designation: "Peon",
      qualification: "BA",
      experience: "07 years",
    },
    {
      id: 6,
      name: "DHANI RAM",
      designation: "Chowkidar",
      qualification: "Higher Secondary",
      experience: "07 years",
    },
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

  // Function to get icon for staff type
  const getDesignationIcon = (designation) => {
    if (designation.includes("Office")) {
      return <AdminIcon />;
    } else if (designation.includes("Chowkidar")) {
      return <SecurityIcon />;
    }
    return <PersonIcon />;
  };

  // Function to get color based on designation
  const getDesignationColor = (designation) => {
    if (designation.includes("Office Incharge")) {
      return "#5e35b1"; // Deep purple
    } else if (designation.includes("Office")) {
      return "#1976d2"; // Blue
    } else if (designation.includes("Chowkidar")) {
      return "#f57c00"; // Orange
    }
    return "#388e3c"; // Green for peons
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Ministerial & Non-Teaching Staff
      </Typography>

      {/* Ministerial Staff Section */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, color: "primary.main" }}
      >
        Ministerial Staff
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="ministerial staff table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                S.No
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
                Job Experience
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ministerialStaff.map((staff) => (
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
                      }}
                    >
                      {getInitials(staff.name)}
                    </Avatar>
                    {staff.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getDesignationIcon(staff.designation)}
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

      {/* Supporting Staff Section */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, color: "primary.main" }}
      >
        Supporting Staff (Class IV)
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="supporting staff table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                S.No
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
                Job Experience
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supportingStaff.map((staff) => (
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
                      }}
                    >
                      {getInitials(staff.name)}
                    </Avatar>
                    {staff.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getDesignationIcon(staff.designation)}
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

export default NonTeachingStaff;
