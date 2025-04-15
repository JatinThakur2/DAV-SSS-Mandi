// src/components/admin/gallery/AddEventButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

function AddEventButton({ onAddEvent }) {
  return (
    <Button variant="contained" startIcon={<AddIcon />} onClick={onAddEvent}>
      Add New Event
    </Button>
  );
}

export default AddEventButton;
