import React from "react";
import { Typography, Box, Paper, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Computer as ComputerIcon,
  LocalLibrary as LibraryIcon,
  SportsSoccer as SportsIcon,
  MedicalServices as MedicalIcon,
  Explore as TourIcon,
  SmartToy as SmartClassIcon,
} from "@mui/icons-material";

function Facilities() {
  const facilities = [
    {
      title: "Computer Education",
      icon: <ComputerIcon fontSize="large" />,
      description:
        "Realizing the importance of computers education in today's education system which caters to the demanding needs of students, computer education is made a compulsory part of the school curriculum with the latest computers and updated curriculum.",
    },
    {
      title: "Smart Classes",
      icon: <SmartClassIcon fontSize="large" />,
      description:
        "Our smart classrooms are equipped with modern technology to enhance the learning experience through interactive and engaging digital content.",
    },
    {
      title: "Library",
      icon: <LibraryIcon fontSize="large" />,
      description:
        "Our library is well-stocked with books covering various subjects, reference materials, and literature to nurture reading habits among students.",
    },
    {
      title: "Sports & Games",
      icon: <SportsIcon fontSize="large" />,
      description:
        "We provide excellent sports facilities to promote physical fitness, teamwork, and sportsmanship among our students.",
    },
    {
      title: "Medical Facilities",
      icon: <MedicalIcon fontSize="large" />,
      description:
        "Basic medical facilities are available at school to handle emergency situations and ensure the well-being of students.",
    },
    {
      title: "Educational Tours & Excursions",
      icon: <TourIcon fontSize="large" />,
      description:
        "We organize educational tours and excursions to provide practical knowledge and exposure to students beyond classroom learning.",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        School Facilities
      </Typography>
      <Typography variant="body1" paragraph>
        The school's purpose-built facilities are modern, secure, and
        well-suited to support academic and wider learning.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {facilities.map((facility, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    color: "primary.main",
                  }}
                >
                  {facility.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {facility.title}
                  </Typography>
                </Box>
                <Typography variant="body2">{facility.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Facilities;
