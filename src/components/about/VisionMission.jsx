import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

function VisionMission() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Our Vision
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          The motto of the School envisions to inculcate the qualities of
          truthfulness and good conduct, that have long been the cultural
          heritage of our nation.
        </Typography>
        <Typography variant="body1" paragraph>
          To be a vibrant and innovative centre for learning, equipping students
          with value-based education.
        </Typography>
        <Typography variant="body1" paragraph>
          To empower students to translate dreams into reality.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Our Mission
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          The D.A.V senior secondary school aims to unlock the talent and
          enterprise of all our young people. We promote high achievement and
          learning for life by working with every individual to:
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[
            "Value, trust and respect everybody and work together co-operatively",
            "Develop their full academic, creative, physical and personal potential",
            "Overcome barriers to learning",
            "Develop the knowledge, skills and attributes they need to lead successful and happy lives",
            "Become independent, confident, considerate and responsible young people who make a positive contribution to society",
            "Understand the importance of a fairer and environmentally sustainable world",
            "Be empowered to make an ethical and sustainable contribution to local, national and global prosperity",
          ].map((point, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "primary.main",
                  color: "white",
                }}
              >
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {point}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

export default VisionMission;
