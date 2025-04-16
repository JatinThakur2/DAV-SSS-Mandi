// src/pages/admin/HousesPage.jsx
import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Snackbar, Alert } from "@mui/material";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Import sections
import HouseInfoSection from "../../components/admin/houses/HouseInfoSection";
import PresidiumSection from "../../components/admin/houses/PresidiumSection";
import HousesGridSection from "../../components/admin/houses/HousesGridSection";

// Import dialogs
import HouseInfoDialog from "../../components/admin/houses/dialogs/HouseInfoDialog";
import PresidiumDialog from "../../components/admin/houses/dialogs/PresidiumDialog";
import HouseDialog from "../../components/admin/houses/dialogs/HouseDialog";
import DeleteDialog from "../../components/admin/houses/dialogs/DeleteDialog";

function HousesPage() {
  // Tab state
  const [tabValue, setTabValue] = useState(0);

  // Dialog states
  const [houseInfoDialog, setHouseInfoDialog] = useState(false);
  const [presidiumDialog, setPresidiumDialog] = useState(false);
  const [houseDialog, setHouseDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    type: "",
    id: null,
  });

  // Form states
  const [dialogMode, setDialogMode] = useState("add");
  const [positionType, setPositionType] = useState("other");
  const [customPosition, setCustomPosition] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null);

  // Current edited items
  const [currentHouseInfo, setCurrentHouseInfo] = useState({
    title: "",
    description: "",
  });

  const [currentPresidium, setCurrentPresidium] = useState({
    position: "",
    positionType: "other",
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

  // Notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch data from Convex
  const houseInfo = useQuery(api.houses.getHouseInfo);
  const presidium = useQuery(api.houses.getSchoolPresidium);

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

  // Get position name from position type
  const getPositionName = (type) => {
    const options = [
      { value: "head-boy", label: "HEAD BOY" },
      { value: "head-girl", label: "HEAD GIRL" },
      { value: "captain-boy", label: "SCHOOL CAPTAIN (BOY)" },
      { value: "captain-girl", label: "SCHOOL CAPTAIN (GIRL)" },
    ];
    const option = options.find((opt) => opt.value === type);
    return option ? option.label : "";
  };

  // Helper to determine position type from text
  const determinePositionType = (position) => {
    if (!position) return "other";

    position = position.toUpperCase();

    if (position === "HEAD BOY") return "head-boy";
    if (position === "HEAD GIRL") return "head-girl";
    if (position.includes("CAPTAIN") && position.includes("BOY"))
      return "captain-boy";
    if (position.includes("CAPTAIN") && position.includes("GIRL"))
      return "captain-girl";

    return "other";
  };

  // Dialog handlers
  const handleOpenHouseInfoDialog = () => {
    // Set initial values from fetched data
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
      // Set position type from database or determine if not present
      const type = item.positionType || determinePositionType(item.position);
      setPositionType(type);

      if (type === "other") {
        setCustomPosition(item.position);
      } else {
        setCustomPosition("");
      }

      setCurrentPresidium({
        position: item.position,
        positionType: type,
        name: item.name,
        year: item.year,
        imageUrl: item.imageUrl || "",
      });
      setCurrentItemId(item._id);
    } else {
      const defaultYear =
        new Date().getFullYear() + "-" + (new Date().getFullYear() + 1);

      setPositionType("other");
      setCustomPosition("");

      setCurrentPresidium({
        position: "",
        positionType: "other",
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

  // Input handlers
  const handleHouseInfoChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouseInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresidiumChange = (e) => {
    const { name, value } = e.target;
    setCurrentPresidium((prev) => ({ ...prev, [name]: value }));
  };

  const handlePositionTypeChange = (e) => {
    const type = e.target.value;
    setPositionType(type);
    setCurrentPresidium((prev) => ({
      ...prev,
      positionType: type,
    }));

    if (type !== "other") {
      // Set the position based on the selected type
      const position = getPositionName(type);
      setCurrentPresidium((prev) => ({
        ...prev,
        position: position,
      }));
    }
  };

  const handleCustomPositionChange = (e) => {
    const value = e.target.value;
    setCustomPosition(value);
    setCurrentPresidium((prev) => ({
      ...prev,
      position: value,
    }));
  };

  const handleHouseChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleHouseColorChange = (color) => {
    setCurrentHouse((prev) => ({ ...prev, color }));
  };

  const handleImageUpload = (url, type) => {
    if (type === "presidium") {
      setCurrentPresidium((prev) => ({ ...prev, imageUrl: url }));
    } else if (type === "house") {
      setCurrentHouse((prev) => ({ ...prev, imageUrl: url }));
    }
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
      // Determine the position based on the selected type
      let position = "";

      if (positionType === "other") {
        position = customPosition;
      } else {
        position = getPositionName(positionType);
      }

      const updatedPresidium = {
        ...currentPresidium,
        position: position,
        positionType: positionType,
      };

      if (dialogMode === "add") {
        await addPresidiumMember(updatedPresidium);
        setSnackbar({
          open: true,
          message: "Presidium member added successfully",
          severity: "success",
        });
      } else {
        await updatePresidiumMember({
          id: currentItemId,
          ...updatedPresidium,
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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        <HouseInfoSection onEditInfo={handleOpenHouseInfoDialog} />
      )}

      {/* School Presidium Tab */}
      {tabValue === 1 && (
        <PresidiumSection
          onAddMember={() => handleOpenPresidiumDialog("add")}
          onEditMember={handleOpenPresidiumDialog}
          onDeleteMember={handleOpenDeleteDialog}
        />
      )}

      {/* Houses Tab */}
      {tabValue === 2 && (
        <HousesGridSection
          onAddHouse={() => handleOpenHouseDialog("add")}
          onEditHouse={handleOpenHouseDialog}
          onDeleteHouse={handleOpenDeleteDialog}
        />
      )}

      {/* Dialogs */}
      <HouseInfoDialog
        open={houseInfoDialog}
        onClose={() => setHouseInfoDialog(false)}
        currentHouseInfo={currentHouseInfo}
        onHouseInfoChange={handleHouseInfoChange}
        onSaveHouseInfo={handleSaveHouseInfo}
      />

      <PresidiumDialog
        open={presidiumDialog}
        onClose={() => setPresidiumDialog(false)}
        dialogMode={dialogMode}
        currentPresidium={currentPresidium}
        positionType={positionType}
        customPosition={customPosition}
        onPresidiumChange={handlePresidiumChange}
        onPositionTypeChange={handlePositionTypeChange}
        onCustomPositionChange={handleCustomPositionChange}
        onImageUpload={handleImageUpload}
        onSavePresidium={handleSavePresidium}
      />

      <HouseDialog
        open={houseDialog}
        onClose={() => setHouseDialog(false)}
        dialogMode={dialogMode}
        currentHouse={currentHouse}
        onHouseChange={handleHouseChange}
        onHouseColorChange={handleHouseColorChange}
        onImageUpload={handleImageUpload}
        onSaveHouse={handleSaveHouse}
      />

      <DeleteDialog
        open={deleteDialog.open}
        dialogType={deleteDialog.type}
        onClose={() => setDeleteDialog({ ...deleteDialog, open: false })}
        onDelete={handleDelete}
      />

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

export default HousesPage;
