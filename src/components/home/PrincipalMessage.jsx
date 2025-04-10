import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";

function PrincipalMessage() {
  return (
    <Box>
      <Grid container spacing={4}>
        {/* Card 1: Information about the Principal */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image="/api/placeholder/200/200"
                  alt="Principal Image"
                  sx={{ borderRadius: "50%", width: 200, height: 200, mb: 2 }}
                />
                <Box sx={{ mt: "auto", textAlign: "center" }}>
                  <Typography variant="h5">About the Principal</Typography>
                  <Typography variant="body1">
                    <strong>Name:</strong> Mrs. Sangeeta Kapoor
                  </Typography>
                  <Typography variant="body1">
                    <strong>Experience:</strong> 20+ years in educational
                    leadership
                  </Typography>
                  <Typography variant="body1">
                    <strong>Qualifications:</strong> M.A., B.Ed.
                  </Typography>
                  <Typography variant="body1">
                    Mrs. Sangeeta Kapoor is committed to fostering holistic
                    development and academic excellence.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Message from the Principal */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="body1">Dear Readers,</Typography>
              <Typography variant="body1" paragraph>
                D.A.V. S.S.S continues to uphold traditional values while
                adopting contemporary infrastructure and pedagogies. We live
                today in a world that is very different from one we grew up in,
                the one we were educated in. The world today is changing at such
                an accelerated rate that we, as educators, need to pause and
                reflect on the entire education system. At DAVSSS, unrelenting
                effort goes into mentoring and metamorphosing the uncut diamonds
                into finer DAV gems. Our aim is to work unanimously to unleash
                the inherent intellectual, social, and emotional capabilities of
                all students who pass through the gate of this school.
              </Typography>
              <Typography variant="body1" paragraph>
                Is our school well equipped to prepare our children to face the
                challenges that the future holds? Such questions motivate us to
                go through a continuous process of reflection, and hence we at
                DAVSSS work at implementing a well-balanced curriculum to ensure
                that the children of our school will not just love their school
                but truly be prepared to face the challenges of life.
              </Typography>
              <Typography variant="body1" paragraph>
                Teamwork is the hallmark of DAVSSS. We aim to provide continuous
                and comprehensive evaluation education with state-of-art
                facilities for the holistic development and all-round growth of
                the child.
              </Typography>
              <Typography variant="body1">With regards,</Typography>
              <Typography variant="body2" color="textSecondary">
                MRS. SANGEETA KAPOOR, PRINCIPAL
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PrincipalMessage;
