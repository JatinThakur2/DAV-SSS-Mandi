// src/components/admin/houses/PresidiumSection.jsx
import React from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function PresidiumSection({ onAddMember, onEditMember, onDeleteMember }) {
  // Fetch presidium data from Convex
  const presidium = useQuery(api.houses.getSchoolPresidium);

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">School Presidium</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddMember}
        >
          Add Presidium Member
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="30%">Position</TableCell>
              <TableCell width="30%">Name</TableCell>
              <TableCell width="20%">Year</TableCell>
              <TableCell width="20%" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {presidium && presidium.length > 0 ? (
              presidium.map((member) => (
                <TableRow key={member._id} hover>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.year}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onEditMember("edit", member)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => onDeleteMember("presidium", member._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" sx={{ py: 3 }}>
                    No presidium members found. Click the button above to add
                    some.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PresidiumSection;
