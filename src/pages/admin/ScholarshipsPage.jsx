// src/pages/admin/ScholarshipsPage.jsx
import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Alert,
  Snackbar,
  Stack,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  MonetizationOn as ScholarshipIcon,
  School as GovernmentIcon,
  PeopleAlt as PrivateIcon,
} from "@mui/icons-material";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

function ScholarshipsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit"
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentScholarship, setCurrentScholarship] = useState({
    type: "government",
    name: "",
    description: "",
    recipients: [
      { name: "", details: "", year: new Date().getFullYear().toString() },
    ],
  });
  const [currentScholarshipId, setCurrentScholarshipId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Convex API hooks
  const allScholarships = useQuery(api.scholarships.getScholarships) || [];
  const governmentScholarships = allScholarships.filter(
    (s) => s.type === "government"
  );
  const privateScholarships = allScholarships.filter(
    (s) => s.type === "private"
  );

  const addScholarship = useMutation(api.scholarships.addScholarship);
  const updateScholarship = useMutation(api.scholarships.updateScholarship);
  const deleteScholarship = useMutation(api.scholarships.deleteScholarship);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      setCurrentScholarship({
        type: item.type,
        name: item.name,
        description: item.description || "",
        recipients: [...item.recipients],
      });
      setCurrentScholarshipId(item._id);
    } else {
      setCurrentScholarship({
        type: tabValue === 0 ? "government" : "private",
        name: "",
        description: "",
        recipients: [
          { name: "", details: "", year: new Date().getFullYear().toString() },
        ],
      });
      setCurrentScholarshipId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id, name) => {
    setCurrentScholarshipId(id);
    setCurrentScholarship({ ...currentScholarship, name });
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentScholarship({
      ...currentScholarship,
      [name]: value,
    });
  };

  const handleTypeChange = (e) => {
    setCurrentScholarship({
      ...currentScholarship,
      type: e.target.value,
    });
  };

  const handleRecipientInputChange = (index, field, value) => {
    const updatedRecipients = [...currentScholarship.recipients];
    updatedRecipients[index] = { ...updatedRecipients[index], [field]: value };
    setCurrentScholarship({
      ...currentScholarship,
      recipients: updatedRecipients,
    });
  };

  const handleAddRecipient = () => {
    setCurrentScholarship({
      ...currentScholarship,
      recipients: [
        ...currentScholarship.recipients,
        { name: "", details: "", year: new Date().getFullYear().toString() },
      ],
    });
  };

  const handleRemoveRecipient = (index) => {
    const updatedRecipients = [...currentScholarship.recipients];
    updatedRecipients.splice(index, 1);
    setCurrentScholarship({
      ...currentScholarship,
      recipients: updatedRecipients,
    });
  };

  const handleSaveScholarship = async () => {
    try {
      if (dialogMode === "add") {
        await addScholarship(currentScholarship);
        setSnackbar({
          open: true,
          message: `Scholarship "${currentScholarship.name}" added successfully`,
          severity: "success",
        });
      } else {
        await updateScholarship({
          id: currentScholarshipId,
          ...currentScholarship,
        });
        setSnackbar({
          open: true,
          message: `Scholarship "${currentScholarship.name}" updated successfully`,
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving scholarship:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleDeleteScholarship = async () => {
    try {
      await deleteScholarship({ id: currentScholarshipId });
      setSnackbar({
        open: true,
        message: "Scholarship deleted successfully",
        severity: "success",
      });
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Something went wrong"}`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleToggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
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
        <Typography variant="h4">Scholarships</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Add Scholarship
        </Button>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab
          icon={<GovernmentIcon />}
          label="Government Scholarships"
          iconPosition="start"
        />
        <Tab
          icon={<PrivateIcon />}
          label="Private Scholarships"
          iconPosition="start"
        />
      </Tabs>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="5%"></TableCell>
                <TableCell width="40%">Name</TableCell>
                <TableCell width="40%">Description</TableCell>
                <TableCell width="15%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tabValue === 0 ? governmentScholarships : privateScholarships)
                .length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      No {tabValue === 0 ? "government" : "private"}{" "}
                      scholarships found. Click the button above to add some.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (tabValue === 0
                  ? governmentScholarships
                  : privateScholarships
                ).map((scholarship) => (
                  <React.Fragment key={scholarship._id}>
                    <TableRow hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleExpand(scholarship._id)}
                        >
                          {expandedRow === scholarship._id ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ScholarshipIcon
                            sx={{
                              mr: 1,
                              color:
                                scholarship.type === "government"
                                  ? "primary.main"
                                  : "warning.main",
                            }}
                          />
                          <Typography variant="body1">
                            {scholarship.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {scholarship.description ? (
                          scholarship.description.length > 100 ? (
                            `${scholarship.description.substring(0, 100)}...`
                          ) : (
                            scholarship.description
                          )
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontStyle="italic"
                          >
                            No description provided
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={1}
                        >
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() =>
                              handleOpenDialog("edit", scholarship)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() =>
                              handleOpenDeleteDialog(
                                scholarship._id,
                                scholarship.name
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                    {expandedRow === scholarship._id && (
                      <TableRow>
                        <TableCell colSpan={4} sx={{ py: 0 }}>
                          <Box sx={{ p: 2, bgcolor: "action.hover" }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Recipients
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {scholarship.recipients.length === 0 ? (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                fontStyle="italic"
                              >
                                No recipients added yet.
                              </Typography>
                            ) : (
                              <List>
                                {scholarship.recipients.map(
                                  (recipient, index) => (
                                    <ListItem
                                      key={index}
                                      divider={
                                        index !==
                                        scholarship.recipients.length - 1
                                      }
                                    >
                                      <ListItemText
                                        primary={recipient.name}
                                        secondary={
                                          <React.Fragment>
                                            <Typography
                                              variant="body2"
                                              component="span"
                                              display="block"
                                            >
                                              {recipient.details}
                                            </Typography>
                                            <Chip
                                              label={`Year: ${recipient.year}`}
                                              size="small"
                                              sx={{ mt: 1 }}
                                            />
                                          </React.Fragment>
                                        }
                                      />
                                    </ListItem>
                                  )
                                )}
                              </List>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add New" : "Edit"} Scholarship
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={currentScholarship.type}
                label="Type"
                name="type"
                onChange={handleTypeChange}
              >
                <MenuItem value="government">Government Scholarship</MenuItem>
                <MenuItem value="private">Private Scholarship</MenuItem>
              </Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Scholarship Name"
              type="text"
              fullWidth
              value={currentScholarship.name}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <TextField
              margin="dense"
              name="description"
              label="Description (Optional)"
              multiline
              rows={3}
              fullWidth
              value={currentScholarship.description}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Recipients
            </Typography>

            {currentScholarship.recipients.map((recipient, index) => (
              <Box
                key={index}
                sx={{ mb: 3, p: 2, border: "1px solid #eee", borderRadius: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1">
                    Recipient #{index + 1}
                  </Typography>
                  {currentScholarship.recipients.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveRecipient(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Student Name"
                      value={recipient.name}
                      onChange={(e) =>
                        handleRecipientInputChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Details"
                      value={recipient.details}
                      onChange={(e) =>
                        handleRecipientInputChange(
                          index,
                          "details",
                          e.target.value
                        )
                      }
                      fullWidth
                      size="small"
                      placeholder="e.g. Class X, Rs 5000/-"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Year"
                      value={recipient.year}
                      onChange={(e) =>
                        handleRecipientInputChange(
                          index,
                          "year",
                          e.target.value
                        )
                      }
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={handleAddRecipient}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Recipient
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveScholarship}
            variant="contained"
            disabled={
              !currentScholarship.name ||
              currentScholarship.recipients.some((r) => !r.name)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the scholarship "
            {currentScholarship.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleDeleteScholarship}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default ScholarshipsPage;
