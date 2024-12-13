import React from "react";
import { Box, Typography } from "@mui/material";

function GoogleMapLocation({ title, height = "300px" }) {
  return (
    <Box sx={{ mt: 2 }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <iframe
        title="Google Map Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.394552332948!2d76.91739047682247!3d31.708644775796065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904c5f5bfc4c6a3%3A0x3322e5aa2bd22d63!2sD.A.V.%20Senior%20Secondary%20School%2C%20Mandi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
}

export default GoogleMapLocation;
