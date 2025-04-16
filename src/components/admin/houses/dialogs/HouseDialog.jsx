// src/components/admin/houses/dialogs/HouseDialog.jsx
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
  Grid,
} from "@mui/material";
import ImageUploader from "../../common/ImageUploader";

function HouseDialog({
  open,
  onClose,
  dialogMode,
  currentHouse,
  onHouseChange,
  onHouseColorChange,
  onImageUpload,
  onSaveHouse,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {dialogMode === "add" ? "Add New" : "Edit"} House
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="House Name"
                name="name"
                value={currentHouse.name}
                onChange={onHouseChange}
                margin="normal"
                placeholder="e.g., GANDHI HOUSE"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mr: 2 }}>
                  House Color:
                </Typography>
                <input
                  type="color"
                  value={currentHouse.color}
                  onChange={(e) => onHouseColorChange(e.target.value)}
                  style={{
                    width: "50px",
                    height: "40px",
                    padding: 0,
                    border: "none",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Boy Captain"
                name="captainBoy"
                value={currentHouse.captainBoy}
                onChange={onHouseChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Girl Captain"
                name="captainGirl"
                value={currentHouse.captainGirl}
                onChange={onHouseChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="House Teacher"
                name="houseTeacher"
                value={currentHouse.houseTeacher}
                onChange={onHouseChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                name="description"
                value={currentHouse.description}
                onChange={onHouseChange}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                House Image (Optional)
              </Typography>
              <ImageUploader
                onImageUpload={(url) => onImageUpload(url, "house")}
                currentImage={currentHouse.imageUrl}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSaveHouse}
          disabled={
            !currentHouse.name ||
            !currentHouse.captainBoy ||
            !currentHouse.captainGirl ||
            !currentHouse.houseTeacher
          }
        >
          {dialogMode === "add" ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HouseDialog;
