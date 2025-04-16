// src/pages/admin/HousesPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Similar to gallery image upload functionality
function ImageUploader({ onImageUpload, currentImage = null }) {
  const [uploading, setUploading] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveFileInfo = useMutation(api.files.saveFileInfo);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      // Get upload URL
      const uploadUrl = await generateUploadUrl();

      // Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      // Get storage ID
      const { storageId } = await result.json();

      // Save file info
      const fileInfo = await saveFileInfo({
        storageId,
        fileName: file.name,
        fileType: file.type,
      });

      // Pass URL to parent
      onImageUpload(fileInfo.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {currentImage && (
        <Box sx={{ mb: 2 }}>
          <img
            src={currentImage}
            alt="Current"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              objectFit: "contain",
            }}
          />
        </Box>
      )}

      <Button
        variant="outlined"
        component="label"
        startIcon={uploading ? <CircularProgress size={20} /> : <ImageIcon />}
        disabled={uploading}
      >
        {currentImage ? "Change Image" : "Upload Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
}

function HousesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [houseInfoDialog, setHouseInfoDialog] = useState(false);
  const [presidiumDialog, setPresidiumDialog] = useState(false);
  const [houseDialog, setHouseDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    type: "",
    id: null,
  });
  const [dialogMode, setDialogMode] = useState("add");

  // Current edited items
  const [currentHouseInfo, setCurrentHouseInfo] = useState({
    title: "",
    description: "",
  });
  const [currentPresidium, setCurrentPresidium] = useState({
    position: "",
    name: "",
    year: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    imageUrl: "",
  });
  const [currentHouse, setCurrentHouse] = useState({
    name: "",
    captainBoy: "",
    captainGirl: "",
    houseTeacher: "",
    color: "#607D8B",
    description: "",
    imageUrl: "",
  });
  const [currentItemId, setCurrentItemId] = useState(null);

  // Notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch data from Convex
  const houseInfo = useQuery(api.houses.getHouseInfo);
  const presidium = useQuery(api.houses.getSchoolPresidium);
  const houses = useQuery(api.houses.getHouses);

  // Mutations
  const updateHouseInfo = useMutation(api.houses.updateHouseInfo);
  const addPresidiumMember = useMutation(api.houses.addPresidiumMember);
  const updatePresidiumMember = useMutation(api.houses.updatePresidiumMember);
  const deletePresidiumMember = useMutation(api.houses.deletePresidiumMember);
  const addHouse = useMutation(api.houses.addHouse);
  const updateHouse = useMutation(api.houses.updateHouse);
  const deleteHouse = useMutation(api.houses.deleteHouse);

  // Tab handling
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Dialog handlers
  const handleOpenHouseInfoDialog = () => {
    if (houseInfo) {
      setCurrentHouseInfo({
        title: houseInfo.title || "DAV School Houses",
        description:
          houseInfo.description ||
          "DAV Senior Secondary school offers a high level of pastoral care through House system. The House also provides the day-to-day framework of discipline and respect for others. Although there are school rules which must be adhered to, just as important is our pro-active system of commendation and reward. Students are encouraged to act with consideration, self-discipline and social awareness.",
      });
    }
    setHouseInfoDialog(true);
  };

  const handleOpenPresidiumDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      setCurrentPresidium({
        position: item.position,
        name: item.name,
        year: item.year,
        imageUrl: item.imageUrl || "",
      });
      setCurrentItemId(item._id);
    } else {
      const defaultYear =
        new Date().getFullYear() + "-" + (new Date().getFullYear() + 1);
      setCurrentPresidium({
        position: "",
        name: "",
        year:
          presidium && presidium.length > 0 ? presidium[0].year : defaultYear,
        imageUrl: "",
      });
      setCurrentItemId(null);
    }
    setPresidiumDialog(true);
  };

  const handleOpenHouseDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      setCurrentHouse({
        name: item.name,
        captainBoy: item.captainBoy,
        captainGirl: item.captainGirl,
        houseTeacher: item.houseTeacher,
        color: item.color || "#607D8B",
        description: item.description || "",
        imageUrl: item.imageUrl || "",
      });
      setCurrentItemId(item._id);
    } else {
      setCurrentHouse({
        name: "",
        captainBoy: "",
        captainGirl: "",
        houseTeacher: "",
        color: "#607D8B",
        description: "",
        imageUrl: "",
      });
      setCurrentItemId(null);
    }
    setHouseDialog(true);
  };

  const handleOpenDeleteDialog = (type, id) => {
    setDeleteDialog({ open: true, type, id });
  };

  // Save handlers
  const handleSaveHouseInfo = async () => {
    try {
      await updateHouseInfo(currentHouseInfo);
      setSnackbar({
        open: true,
        message: "House information updated successfully",
        severity: "success",
      });
      setHouseInfoDialog(false);
    } catch (error) {
      console.error("Error saving house info:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleSavePresidium = async () => {
    try {
      if (dialogMode === "add") {
        await addPresidiumMember(currentPresidium);
        setSnackbar({
          open: true,
          message: "Presidium member added successfully",
          severity: "success",
        });
      } else {
        await updatePresidiumMember({
          id: currentItemId,
          ...currentPresidium,
        });
        setSnackbar({
          open: true,
          message: "Presidium member updated successfully",
          severity: "success",
        });
      }
      setPresidiumDialog(false);
    } catch (error) {
      console.error("Error saving presidium member:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleSaveHouse = async () => {
    try {
      if (dialogMode === "add") {
        await addHouse(currentHouse);
        setSnackbar({
          open: true,
          message: "House added successfully",
          severity: "success",
        });
      } else {
        await updateHouse({
          id: currentItemId,
          ...currentHouse,
        });
        setSnackbar({
          open: true,
          message: "House updated successfully",
          severity: "success",
        });
      }
      setHouseDialog(false);
    } catch (error) {
      console.error("Error saving house:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { type, id } = deleteDialog;

      if (type === "presidium") {
        await deletePresidiumMember({ id });
        setSnackbar({
          open: true,
          message: "Presidium member deleted successfully",
          severity: "success",
        });
      } else if (type === "house") {
        await deleteHouse({ id });
        setSnackbar({
          open: true,
          message: "House deleted successfully",
          severity: "success",
        });
      }

      setDeleteDialog({ open: false, type: "", id: null });
    } catch (error) {
      console.error("Error deleting item:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  // Input handlers
  const handleHouseInfoChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouseInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresidiumChange = (e) => {
    const { name, value } = e.target;
    setCurrentPresidium((prev) => ({ ...prev, [name]: value }));
  };

  const handleHouseChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url, type) => {
    if (type === "presidium") {
      setCurrentPresidium((prev) => ({ ...prev, imageUrl: url }));
    } else if (type === "house") {
      setCurrentHouse((prev) => ({ ...prev, imageUrl: url }));
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Houses Management</Typography>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="House Information" />
        <Tab label="School Presidium" />
        <Tab label="Houses" />
      </Tabs>

      {/* House Information Tab */}
      {tabValue === 0 && (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">House System Information</Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleOpenHouseInfoDialog}
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
                  <TableCell>
                    {houseInfo?.title || "DAV School Houses"}
                  </TableCell>
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
      )}

      {/* School Presidium Tab */}
      {tabValue === 1 && (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">School Presidium</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenPresidiumDialog("add")}
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
                          onClick={() =>
                            handleOpenPresidiumDialog("edit", member)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenDeleteDialog("presidium", member._id)
                          }
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
                        No presidium members found. Click the button above to
                        add some.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Houses Tab */}
      {tabValue === 2 && (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">Houses Management</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenHouseDialog("add")}
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
                          onClick={() => handleOpenHouseDialog("edit", house)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenDeleteDialog("house", house._id)
                          }
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
      )}

      {/* House Info Dialog */}
      <Dialog
        open={houseInfoDialog}
        onClose={() => setHouseInfoDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit House Information</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={currentHouseInfo.title}
              onChange={handleHouseInfoChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={currentHouseInfo.description}
              onChange={handleHouseInfoChange}
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHouseInfoDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveHouseInfo}
            disabled={!currentHouseInfo.title || !currentHouseInfo.description}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Presidium Dialog */}
      <Dialog
        open={presidiumDialog}
        onClose={() => setPresidiumDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add New" : "Edit"} Presidium Member
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={currentPresidium.position}
              onChange={handlePresidiumChange}
              margin="normal"
              placeholder="e.g., HEAD BOY, SCHOOL CAPTAIN (GIRL)"
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentPresidium.name}
              onChange={handlePresidiumChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Academic Year"
              name="year"
              value={currentPresidium.year}
              onChange={handlePresidiumChange}
              margin="normal"
              placeholder="e.g., 2023-2024"
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Profile Image (Optional)
              </Typography>
              <ImageUploader
                onImageUpload={(url) => handleImageUpload(url, "presidium")}
                currentImage={currentPresidium.imageUrl}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPresidiumDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSavePresidium}
            disabled={
              !currentPresidium.position ||
              !currentPresidium.name ||
              !currentPresidium.year
            }
          >
            {dialogMode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* House Dialog */}
      <Dialog
        open={houseDialog}
        onClose={() => setHouseDialog(false)}
        maxWidth="md"
        fullWidth
      >
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
                  onChange={handleHouseChange}
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
                    onChange={(e) =>
                      setCurrentHouse({
                        ...currentHouse,
                        color: e.target.value,
                      })
                    }
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
                  onChange={handleHouseChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Girl Captain"
                  name="captainGirl"
                  value={currentHouse.captainGirl}
                  onChange={handleHouseChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="House Teacher"
                  name="houseTeacher"
                  value={currentHouse.houseTeacher}
                  onChange={handleHouseChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  name="description"
                  value={currentHouse.description}
                  onChange={handleHouseChange}
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
                  onImageUpload={(url) => handleImageUpload(url, "house")}
                  currentImage={currentHouse.imageUrl}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHouseDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveHouse}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this{" "}
            {deleteDialog.type === "presidium" ? "presidium member" : "house"}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}
          >
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default HousesPage;
