// src/components/admin/houses/dialogs/HouseInfoDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
} from "@mui/material";

function HouseInfoDialog({
  open,
  onClose,
  currentHouseInfo,
  onHouseInfoChange,
  onSaveHouseInfo,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit House Information</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={currentHouseInfo.title}
            onChange={onHouseInfoChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={currentHouseInfo.description}
            onChange={onHouseInfoChange}
            multiline
            rows={4}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSaveHouseInfo}
          disabled={!currentHouseInfo.title || !currentHouseInfo.description}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HouseInfoDialog;
