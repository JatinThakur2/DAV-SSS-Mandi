import React from "react";
import { Box, Container, Typography, Badge } from "@mui/material";
import {
  PhoneInTalk as PhoneIcon,
  MailOutline as MailIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

function TopBar() {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        py: 1,
        display: { xs: "none", md: "block" },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon fontSize="small" sx={{ color: "white", mr: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ color: "white", fontWeight: 500 }}
              >
                01905-223145
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MailIcon fontSize="small" sx={{ color: "white", mr: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ color: "white", fontWeight: 500 }}
              >
                davsss.mnd@gmail.com
              </Typography>
            </Box>
          </Box>
          <Badge
            badgeContent={2}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.6rem",
                height: "16px",
                minWidth: "16px",
              },
            }}
          >
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </Box>
      </Container>
    </Box>
  );
}

export default TopBar;
