import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import GoogleMapLocation from "../components/common/GoogleMapsLocation";

function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 3 }}>
        Please feel free to contact us
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                School Address
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
                <LocationIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Typography variant="body1">
                  D.A.V Senior Secondary School, <br />
                  Near Victoria bridge, Mandi, <br />
                  District Mandi, H.P. - 175001
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <a
                    href="mailto:davsss.mnd@gmail.com"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      borderBottom: "1px dotted",
                    }}
                  >
                    davsss.mnd@gmail.com
                  </a>
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="body1">
                  <a
                    href="tel:01905-223145"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      borderBottom: "1px dotted",
                    }}
                  >
                    01905-223145
                  </a>
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Contact Form */}
              <Typography variant="h5" gutterBottom>
                Send us a Message
              </Typography>

              <Box component="form" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Google Map */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Location
              </Typography>
              <Typography variant="body2" paragraph>
                We are conveniently located near Victoria Bridge in Mandi. You
                can find us on the map below:
              </Typography>
              <Box sx={{ mt: 2, height: "calc(100% - 80px)" }}>
                <GoogleMapLocation height="450px" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
