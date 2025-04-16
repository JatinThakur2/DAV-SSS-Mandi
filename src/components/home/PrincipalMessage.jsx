import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Paper,
} from "@mui/material";
// Import the image from assets
import principalImage from "../../assets/images/principal.jpg"; // Adjust the path as necessary

function PrincipalMessage() {
  return (
    <Box>
      <Grid container spacing={4}>
        {/* Card 1: Information about the Principal */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%", position: "relative" }}>
            <CardMedia
              component="img"
              image={principalImage} // Use the imported image
              alt="Principal Image"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                minHeight: 500,
              }}
            />
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                left: 16,
                maxWidth: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                About the Principal
              </Typography>
              <Typography variant="body2" paragraph sx={{ mb: 0.5 }}>
                <strong>Name:</strong> Mrs. Sangeeta Kapoor
              </Typography>
              <Typography variant="body2" paragraph sx={{ mb: 0.5 }}>
                <strong>Experience:</strong> 20+ years in educational leadership
              </Typography>
              <Typography variant="body2" paragraph sx={{ mb: 0.5 }}>
                <strong>Qualifications:</strong> M.A., B.Ed.
              </Typography>
              <Typography variant="body2">
                Mrs. Sangeeta Kapoor is committed to fostering holistic
                development and academic excellence.
              </Typography>
            </Paper>
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
