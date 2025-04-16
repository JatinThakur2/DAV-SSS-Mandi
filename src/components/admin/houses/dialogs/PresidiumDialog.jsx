// src/components/admin/houses/dialogs/PresidiumDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ImageUploader from "../../common/ImageUploader";

// Preset position options
const positionOptions = [
  { value: "head-boy", label: "HEAD BOY" },
  { value: "head-girl", label: "HEAD GIRL" },
  { value: "captain-boy", label: "SCHOOL CAPTAIN (BOY)" },
  { value: "captain-girl", label: "SCHOOL CAPTAIN (GIRL)" },
  { value: "other", label: "Other" },
];

function PresidiumDialog({
  open,
  onClose,
  dialogMode,
  currentPresidium,
  positionType,
  customPosition,
  onPresidiumChange,
  onPositionTypeChange,
  onCustomPositionChange,
  onImageUpload,
  onSavePresidium,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogMode === "add" ? "Add New" : "Edit"} Presidium Member
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Position Type Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Position Type</InputLabel>
            <Select
              value={positionType}
              onChange={onPositionTypeChange}
              label="Position Type"
            >
              {positionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Custom Position Field (shown only when 'Other' is selected) */}
          {positionType === "other" && (
            <TextField
              fullWidth
              label="Custom Position"
              value={customPosition}
              onChange={onCustomPositionChange}
              margin="normal"
              placeholder="e.g., VICE CAPTAIN, SPORTS CAPTAIN"
            />
          )}

          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentPresidium.name}
            onChange={onPresidiumChange}
          />

          <TextField
            margin="dense"
            name="year"
            label="Academic Year"
            type="text"
            fullWidth
            value={currentPresidium.year}
            onChange={onPresidiumChange}
            placeholder="e.g., 2023-2024"
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Profile Image (Optional)
            </Typography>
            <ImageUploader
              onImageUpload={(url) => onImageUpload(url, "presidium")}
              currentImage={currentPresidium.imageUrl}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSavePresidium}
          disabled={
            !currentPresidium.name ||
            !currentPresidium.year ||
            (positionType === "other" && !customPosition)
          }
        >
          {dialogMode === "add" ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PresidiumDialog;
