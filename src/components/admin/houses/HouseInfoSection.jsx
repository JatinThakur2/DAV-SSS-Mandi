// src/components/admin/houses/HouseInfoSection.jsx
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
  TableRow,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function HouseInfoSection({ onEditInfo }) {
  // Fetch house info from Convex
  const houseInfo = useQuery(api.houses.getHouseInfo);

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">House System Information</Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEditInfo}
        >
          Edit Information
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell width="20%" sx={{ fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell>{houseInfo?.title || "DAV School Houses"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell>
                {houseInfo?.description ||
                  "DAV Senior Secondary school offers a high level of pastoral care through House system..."}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default HouseInfoSection;
