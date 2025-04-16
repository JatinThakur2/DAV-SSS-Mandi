// src/components/admin/houses/HousesGridSection.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function HousesGridSection({ onAddHouse, onEditHouse, onDeleteHouse }) {
  // Fetch houses data from Convex
  const houses = useQuery(api.houses.getHouses);

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Houses Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddHouse}
        >
          Add House
        </Button>
      </Box>

      <Grid container spacing={3}>
        {houses && houses.length > 0 ? (
          houses.map((house) => (
            <Grid item xs={12} sm={6} md={3} key={house._id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  height: "100%",
                  borderTop: `4px solid ${house.color || "#607D8B"}`,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">{house.name}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => onEditHouse("edit", house)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => onDeleteHouse("house", house._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {house.imageUrl && (
                  <Box sx={{ mb: 2, height: 120, overflow: "hidden" }}>
                    <img
                      src={house.imageUrl}
                      alt={house.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}

                <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                  <Box sx={{ mb: 1 }}>
                    <strong>Captains:</strong> {house.captainBoy} &{" "}
                    {house.captainGirl}
                  </Box>
                  <Box>
                    <strong>Teacher:</strong> {house.houseTeacher}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">
              No houses found. Click the button above to add some.
            </Alert>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default HousesGridSection;
