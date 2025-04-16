// src/components/student/Houses.jsx
import React from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Skeleton,
  Alert,
  Chip,
  Avatar,
} from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function Houses() {
  // Fetch house information, presidium, and houses data
  const houseInfo = useQuery(api.houses.getHouseInfo);
  const presidium = useQuery(api.houses.getSchoolPresidium);
  const houses = useQuery(api.houses.getHouses);

  // Loading states
  const isLoading =
    houseInfo === undefined || presidium === undefined || houses === undefined;

  // Determine current academic year
  const currentYear =
    presidium && presidium.length > 0 ? presidium[0].year : "2023-2024"; // Default fallback

  // House colors mapping
  const houseColors = {
    "GANDHI HOUSE": "#4CAF50", // Green
    "NEHRU HOUSE": "#2196F3", // Blue
    "TAGORE HOUSE": "#FFC107", // Yellow/Amber
    "TILAK HOUSE": "#F44336", // Red
  };

  // Helper to get house color or default
  const getHouseColor = (houseName) => {
    if (!houseName) return "#607D8B"; // Default gray

    const house = houses?.find(
      (h) => h.name.toUpperCase() === houseName.toUpperCase()
    );
    if (house?.color) return house.color;

    return houseColors[houseName.toUpperCase()] || "#607D8B";
  };

  // Filter presidium members for leadership positions
  const getPresidiumByPosition = (positionKeyword) => {
    if (!presidium) return null;
    return presidium.find((member) =>
      member.position.toUpperCase().includes(positionKeyword.toUpperCase())
    );
  };

  // Get key leadership positions
  const headBoy = getPresidiumByPosition("HEAD BOY");
  const headGirl = getPresidiumByPosition("HEAD GIRL");
  const schoolCaptainBoy =
    getPresidiumByPosition("CAPTAIN BOY") ||
    getPresidiumByPosition("SCHOOL CAPTAIN (BOY)");
  const schoolCaptainGirl =
    getPresidiumByPosition("CAPTAIN GIRL") ||
    getPresidiumByPosition("SCHOOL CAPTAIN (GIRL)");

  // Render loading skeleton
  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={150} sx={{ mb: 4 }} />
        <Typography variant="h5">
          <Skeleton width="50%" />
        </Typography>
        <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />
        <Typography variant="h5">
          <Skeleton width="40%" />
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* House System Introduction */}
      <Typography variant="h4" gutterBottom>
        {houseInfo?.title || "DAV School Houses"}
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          {houseInfo?.description ||
            "DAV Senior Secondary school offers a high level of pastoral care through House system. The House also provides the day-to-day framework of discipline and respect for others. Although there are school rules which must be adhered to, just as important is our pro-active system of commendation and reward. Students are encouraged to act with consideration, self-discipline and social awareness."}
        </Typography>
      </Paper>

      {/* School Leadership Section with Images */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, color: "primary.main" }}
      >
        SCHOOL PRESIDIUM (SESSION {currentYear})
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Head Boy */}
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <Box sx={{ position: "relative", pt: "100%" }}>
                <CardMedia
                  component="img"
                  image={headBoy?.imageUrl || "/api/placeholder/400/400"}
                  alt={headBoy?.name || "Head Boy"}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  textAlign: "center",
                  bgcolor: "secondary.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {headBoy?.name || "ADARSH THAKUR"}
                </Typography>
                <Chip
                  label={headBoy?.position || "HEAD BOY"}
                  sx={{
                    mt: 1,
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Head Girl */}
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <Box sx={{ position: "relative", pt: "100%" }}>
                <CardMedia
                  component="img"
                  image={headGirl?.imageUrl || "/api/placeholder/400/400"}
                  alt={headGirl?.name || "Head Girl"}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  textAlign: "center",
                  bgcolor: "secondary.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {headGirl?.name || "JIYA JAMWAL"}
                </Typography>
                <Chip
                  label={headGirl?.position || "HEAD GIRL"}
                  sx={{
                    mt: 1,
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* School Captain Boy */}
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <Box sx={{ position: "relative", pt: "100%" }}>
                <CardMedia
                  component="img"
                  image={
                    schoolCaptainBoy?.imageUrl || "/api/placeholder/400/400"
                  }
                  alt={schoolCaptainBoy?.name || "School Captain (Boy)"}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  textAlign: "center",
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {schoolCaptainBoy?.name || "NITESH KUMAR"}
                </Typography>
                <Chip
                  label={schoolCaptainBoy?.position || "SCHOOL CAPTAIN (BOY)"}
                  sx={{
                    mt: 1,
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* School Captain Girl */}
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <Box sx={{ position: "relative", pt: "100%" }}>
                <CardMedia
                  component="img"
                  image={
                    schoolCaptainGirl?.imageUrl || "/api/placeholder/400/400"
                  }
                  alt={schoolCaptainGirl?.name || "School Captain (Girl)"}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  textAlign: "center",
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {schoolCaptainGirl?.name || "YASHIKA KAUNDAL"}
                </Typography>
                <Chip
                  label={schoolCaptainGirl?.position || "SCHOOL CAPTAIN (GIRL)"}
                  sx={{
                    mt: 1,
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Other Presidium Members Table */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Other Leadership Positions
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Position
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Student Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presidium && presidium.length > 0 ? (
                  presidium
                    .filter(
                      (member) =>
                        !member.position.toUpperCase().includes("HEAD BOY") &&
                        !member.position.toUpperCase().includes("HEAD GIRL") &&
                        !member.position.toUpperCase().includes("CAPTAIN")
                    )
                    .map((member) => (
                      <TableRow
                        key={member._id}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: "action.hover",
                          },
                          "&:hover": { backgroundColor: "action.selected" },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {member.imageUrl && (
                              <Avatar
                                src={member.imageUrl}
                                alt={member.name}
                                sx={{ mr: 2, width: 36, height: 36 }}
                              />
                            )}
                            {member.position}
                          </Box>
                        </TableCell>
                        <TableCell>{member.name}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ py: 2 }}
                      >
                        No additional presidium data available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* Houses Section */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, color: "primary.main" }}
      >
        HOUSES AND HOUSE CAPTAINS
      </Typography>

      <Grid container spacing={3}>
        {houses && houses.length > 0 ? (
          houses.map((house) => (
            <Grid item xs={12} sm={6} md={3} key={house._id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                  borderTop: `4px solid ${house.color || getHouseColor(house.name)}`,
                }}
              >
                {house.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={house.imageUrl}
                    alt={house.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {house.name}
                    <Chip
                      size="small"
                      sx={{
                        ml: 1,
                        backgroundColor:
                          house.color || getHouseColor(house.name),
                        color: "white",
                      }}
                      label="House"
                    />
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="subtitle2" color="text.secondary">
                    House Captains:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Boy:</strong> {house.captainBoy}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Girl:</strong> {house.captainGirl}
                  </Typography>
                  <Typography variant="body2">
                    <strong>House Teacher:</strong> {house.houseTeacher}
                  </Typography>

                  {house.description && (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {house.description}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">
              House information will be updated soon.
            </Alert>
          </Grid>
        )}
      </Grid>

      {/* Fallback if no houses defined */}
      {(!houses || houses.length === 0) && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="houses table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  HOUSE
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  CAPTAINS
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  HOUSE TEACHER
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>GANDHI HOUSE</TableCell>
                <TableCell>KASHISH & AKHIL</TableCell>
                <TableCell>Mrs YOGITA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NEHRU HOUSE</TableCell>
                <TableCell>MUSKAN & ADITYA</TableCell>
                <TableCell>Mrs KUNJAN</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TAGORE HOUSE</TableCell>
                <TableCell>JAHANVI & ANKIT</TableCell>
                <TableCell>Mrs APARNA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>TILAK HOUSE</TableCell>
                <TableCell>MAHIMA & PARVEEN</TableCell>
                <TableCell>Mrs SUNITA</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Houses;
