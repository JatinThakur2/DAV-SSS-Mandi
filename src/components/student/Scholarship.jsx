import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  EmojiEvents as AwardIcon,
  LocalLibrary as LibraryIcon,
} from "@mui/icons-material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function Scholarship() {
  const [tabValue, setTabValue] = useState(0);

  // Fetch scholarships from Convex
  const scholarships = useQuery(api.scholarships.getScholarships) || [];
  const governmentScholarships = scholarships.filter(
    (s) => s.type === "government"
  );
  const privateScholarships = scholarships.filter((s) => s.type === "private");

  // Loading state
  const isLoading = scholarships === undefined;

  // Get unique years for filtering recipients
  const allYears = [
    ...new Set(
      scholarships
        .flatMap((s) => s.recipients.map((r) => r.year))
        .filter(Boolean)
    ),
  ]
    .sort()
    .reverse();

  // Default to the most recent year if available
  const currentYear =
    allYears.length > 0
      ? allYears[tabValue]
      : new Date().getFullYear().toString();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Scholarships
      </Typography>

      {isLoading ? (
        // Loading skeleton
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="rectangular" height={48} sx={{ mb: 3 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          </Grid>
        </Box>
      ) : scholarships.length === 0 ? (
        // No scholarships case
        <Alert severity="info" sx={{ mb: 4 }}>
          No scholarship information available at the moment.
        </Alert>
      ) : (
        <>
          {allYears.length > 0 && (
            <Tabs
              value={tabValue < allYears.length ? tabValue : 0}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              sx={{ mb: 3 }}
            >
              {allYears.map((year) => (
                <Tab key={year} label={year} />
              ))}
            </Tabs>
          )}

          <Grid container spacing={4}>
            {/* Available Scholarships */}
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Available Scholarships
                </Typography>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="government-scholarships-content"
                    id="government-scholarships-header"
                  >
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <SchoolIcon sx={{ mr: 1, color: "primary.main" }} />
                      Government Scholarships
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {governmentScholarships.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No government scholarships available.
                      </Typography>
                    ) : (
                      <List>
                        {governmentScholarships.map((scholarship) => (
                          <ListItem key={scholarship._id}>
                            <ListItemIcon>
                              <SchoolIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={scholarship.name}
                              secondary={scholarship.description}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={{ mt: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="private-scholarships-content"
                    id="private-scholarships-header"
                  >
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AwardIcon sx={{ mr: 1, color: "primary.main" }} />
                      Private Scholarships
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {privateScholarships.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No private scholarships available.
                      </Typography>
                    ) : (
                      <List>
                        {privateScholarships.map((scholarship) => (
                          <ListItem key={scholarship._id}>
                            <ListItemText
                              primary={scholarship.name}
                              secondary={scholarship.description}
                              primaryTypographyProps={{ fontWeight: "bold" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>

            {/* Scholarship Recipients */}
            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Scholarship Recipients for {currentYear}
                </Typography>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    <AwardIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Private Scholarships Recipients
                  </Typography>

                  {privateScholarships
                    .filter((item) =>
                      item.recipients.some((r) => r.year === currentYear)
                    )
                    .map((item) => (
                      <Box key={item._id} sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="primary"
                        >
                          {item.name}
                        </Typography>
                        <List dense>
                          {item.recipients
                            .filter((r) => r.year === currentYear)
                            .map((recipient, idx) => (
                              <ListItem key={idx}>
                                <ListItemIcon>
                                  <LibraryIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={recipient.name}
                                  secondary={recipient.details}
                                />
                              </ListItem>
                            ))}
                          {item.recipients.filter((r) => r.year === currentYear)
                            .length === 0 && (
                            <ListItem>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    fontStyle="italic"
                                  >
                                    No recipients for {currentYear}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          )}
                        </List>
                      </Box>
                    ))}

                  {privateScholarships.filter((item) =>
                    item.recipients.some((r) => r.year === currentYear)
                  ).length === 0 && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                      No private scholarship recipients for {currentYear}.
                    </Alert>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Government Scholarships Recipients
                  </Typography>

                  {governmentScholarships
                    .filter((item) =>
                      item.recipients.some((r) => r.year === currentYear)
                    )
                    .map((item) => (
                      <Box key={item._id} sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="primary"
                        >
                          {item.name}
                        </Typography>
                        <List dense>
                          {item.recipients
                            .filter((r) => r.year === currentYear)
                            .map((recipient, idx) => (
                              <ListItem key={idx}>
                                <ListItemIcon>
                                  <SchoolIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={recipient.name}
                                  secondary={recipient.details}
                                />
                              </ListItem>
                            ))}
                          {item.recipients.filter((r) => r.year === currentYear)
                            .length === 0 && (
                            <ListItem>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    fontStyle="italic"
                                  >
                                    No recipients for {currentYear}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          )}
                        </List>
                      </Box>
                    ))}

                  {governmentScholarships.filter((item) =>
                    item.recipients.some((r) => r.year === currentYear)
                  ).length === 0 && (
                    <Alert severity="info">
                      No government scholarship recipients for {currentYear}.
                    </Alert>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Scholarship;
