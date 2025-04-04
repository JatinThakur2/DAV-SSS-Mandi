import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

function AboutDAV() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Our History
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          The D.A.V senior secondary school Mandi was started in 1944 as a
          Primary school in the premises of Arya Samaj Mandir. The school was
          patronized and run under the guidance of Late Swami Krishanand ji
          (Freedom fighter and social reformer), late captain Inder Singh and
          Late Sh. Dina Nath Vaidya (Advocate).
        </Typography>
        <Typography variant="body1" paragraph>
          The school was upgraded to middle level in 1980 and high level in
          1984. Since the year 2002 it has been up-graded to senior secondary
          level. Presently the school is managed under patronage of Maharishi
          Dayananad Shiksha Parishad, a registered body.
        </Typography>
        <Typography variant="body1" paragraph>
          Ever since its inception, the school has made rapid progress in every
          area. It's alumni are positioned at higher echelons in Medicine,
          Engineering, Academics, Defence, Administration and the Corporate
          World.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Management Committee
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {[
            { id: 1, name: "Mr. V.P. Mittal" },
            { id: 2, name: "Mr. Y.C. Sehgal" },
            { id: 3, name: "Mr. H.R. Malhotra" },
            { id: 4, name: "Mr. Santosh Vaidya" },
            { id: 5, name: "Mr. Rattan Lal Vaidya" },
            { id: 6, name: "Col. K.K. Malhotra" },
            { id: 7, name: "Mr. L.S. Handa" },
          ].map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "primary.light",
                  color: "white",
                }}
              >
                <Typography variant="body1">{member.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Affiliation
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1">
          DAV Senior Secondary School, Mandi, District Mandi is affiliated to
          The Himachal Pradesh Board of School Education.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AboutDAV;
