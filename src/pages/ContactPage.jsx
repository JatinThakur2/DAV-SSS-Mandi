import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
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
        {/* Contact Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                D.A.V Senior Secondary School
              </Typography>
              <Typography variant="body1" paragraph>
                Near Victoria Bridge, Mandi, District Mandi, H.P. - 175001
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> davsss.mnd@gmail.com
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Phone:</strong> 01905-223145
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Google Map */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Our Location
              </Typography>
              <Box sx={{ mt: 2 }}>
                <iframe
                  title="Google Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.394552332948!2d76.91739047682247!3d31.708644775796065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904c5f5bfc4c6a3%3A0x3322e5aa2bd22d63!2sD.A.V.%20Senior%20Secondary%20School%2C%20Mandi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
