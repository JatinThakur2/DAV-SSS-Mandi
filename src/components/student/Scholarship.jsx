import React, { useState } from "react";
import {
  Typography,
  Box,
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
  Grid,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  EmojiEvents as AwardIcon,
  LocalLibrary as LibraryIcon,
} from "@mui/icons-material";

function Scholarship() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Scholarship data from student zone.txt
  const governmentScholarships = [
    "Swami Vivekanand Scholarship (Gen)",
    "Dr. Ambedkar Medhavi Chayravriti Yojna (SC/ST)",
    "Centrally Sponsored Pre Matric Scholarship (SC/ST)",
    "Centrally Sponsored Post Matric Scholarship (SC/ST)",
    "PM Yashavi Pre Matric Scholarship (OBC/EBC/DNT)",
    "PM Yashavi Post Matric Scholarship (OBC/EBC/DNT)",
  ];

  const privateScholarships = [
    {
      name: "NVM Memorial Prize",
      description:
        "For outstanding performance in academic and extracurricular activities Class 10th",
    },
    {
      name: "Bhom Prakash and Bhagwati Devi Memorial Scholarship",
      description: "Toppers in Science especially girl child in 10th and 11th",
    },
    {
      name: "Devkinandan Malhotra Scholarship",
      description:
        "Two students for their outstanding performance in Class X and Class XI",
    },
  ];

  // Scholarship recipients data
  const recipients2025 = {
    private: [
      {
        scholarship: "NVM Memorial Prize",
        recipients: ["KARTIK MANDYAL S/O Sh RAKESH KUMAR Rs 6332/-"],
      },
      {
        scholarship: "Bhom Parkash and Bhagwati Devi Memorial Scholarship",
        recipients: [
          "JIYA D/O Sh JANAK RAJ Rs 4962/-",
          "KARTIK MANDYAL S/O Sh Rakesh Kumar Rs 4962/-",
        ],
      },
      {
        scholarship: "Devkinandan Malhotra Memorial Scholarship",
        recipients: [
          "Sunakshi D/O Sh Naval Kishore Class X Rs 3000/-",
          "Jiya D/O Sh Janka Raj Class XI Rs 1500/-",
          "Himanshu S/O Sh Khem Chand Class XI Rs 1500/-",
        ],
      },
    ],
    government: [
      {
        scholarship: "PM Yasasvi Pre Matric Scholarship (OBC)",
        recipients: ["Nishikant Kumar Class X"],
      },
      {
        scholarship: "PM Yasasvi Post Matric Scholarship (OBC)",
        recipients: ["Sunakshi XI", "Devanshi XI", "Jatin XII"],
      },
      {
        scholarship: "Centrally Sponsored Post Matric Scholarship (SC/ST)",
        recipients: ["Yashwant Kumar Class XII", "Vibhore Class XII"],
      },
      {
        scholarship: "Centrally Sponsored Pre Matric Scholarship (SC/ST)",
        recipients: [
          "Anshika Suryavanshi Class IX",
          "Kritika Saklani Class IX",
          "Shubham Class X",
          "Hiten Class X",
          "Rajat Class X",
          "Mannat Class X",
        ],
      },
      {
        scholarship: "Swami Vivekanand Scholarship (Gen)",
        recipients: ["Suhani Class XII", "Sonali Class XII"],
      },
    ],
  };

  const recipients2024 = {
    private: [
      {
        scholarship: "NVM Memorial Prize",
        recipients: ["AAYUSHI D/O Sh Praveen Rs 6332/-"],
      },
      {
        scholarship: "Bhom Parkash and Bhagwati Devi Memorial Scholarship",
        recipients: [
          "Suhani D/O Sh Ram Lal Rs 4962/-",
          "Mahima D/O Sh Surender Kumar Rs 4962/-",
        ],
      },
      {
        scholarship: "Devkinandan Malhotra Memorial Scholarship",
        recipients: [
          "Suhani D/O Sh Ram Lal Class X Rs 3000/-",
          "Mahima D/O Sh Surender Kumar Class XI Rs 3000/-",
        ],
      },
    ],
    government: [
      {
        scholarship: "Dr Ambedkar Medhavi Chhatravati yojna",
        recipients: ["Yashika (SC) Topper X Rs 18,000/-"],
      },
      {
        scholarship: "PM Yasasvi Pre Matric Scholarship (OBC)",
        recipients: ["Devanshi Class X", "Sunakshi Class X"],
      },
      {
        scholarship: "PM Yasasvi Post Matric Scholarship (OBC)",
        recipients: ["Nitesh Kumar XII", "Adarsh Thakur XII", "Jatin XI"],
      },
      {
        scholarship: "Centrally Sponsored Post Matric Scholarship (SC/ST)",
        recipients: ["Daksh Barpagga Class XI", "Vibhore Class XI"],
      },
      {
        scholarship: "Centrally Sponsored Pre Matric Scholarship (SC/ST)",
        recipients: [
          "Shubham Class IX",
          "Hiten Class IX",
          "Rajat Class IX",
          "Anuj Kumar Class IX",
          "Dherya Class IX",
          "Mannat Class IX",
        ],
      },
      {
        scholarship: "Swami Vivekanand Scholarship (Gen)",
        recipients: ["Suhani Class XI", "Sonali Class XI"],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Scholarships
      </Typography>

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
                <List>
                  {governmentScholarships.map((scholarship, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <SchoolIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={scholarship} />
                    </ListItem>
                  ))}
                </List>
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
                <List>
                  {privateScholarships.map((scholarship, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={scholarship.name}
                        secondary={scholarship.description}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        {/* Scholarship Recipients */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Scholarship Recipients
            </Typography>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              sx={{ mb: 3 }}
            >
              <Tab label="2024-2025" />
              <Tab label="2023-2024" />
            </Tabs>

            {tabValue === 0 ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  <AwardIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Private Scholarships (2024-2025)
                </Typography>

                {recipients2025.private.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary"
                    >
                      {item.scholarship}
                    </Typography>
                    <List dense>
                      {item.recipients.map((recipient, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <LibraryIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={recipient} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Government Scholarships (2024-2025)
                </Typography>

                {recipients2025.government.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary"
                    >
                      {item.scholarship}
                    </Typography>
                    <List dense>
                      {item.recipients.map((recipient, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <SchoolIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={recipient} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  <AwardIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Private Scholarships (2023-2024)
                </Typography>

                {recipients2024.private.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary"
                    >
                      {item.scholarship}
                    </Typography>
                    <List dense>
                      {item.recipients.map((recipient, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <LibraryIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={recipient} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  Government Scholarships (2023-2024)
                </Typography>

                {recipients2024.government.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="primary"
                    >
                      {item.scholarship}
                    </Typography>
                    <List dense>
                      {item.recipients.map((recipient, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <SchoolIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={recipient} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Scholarship;
