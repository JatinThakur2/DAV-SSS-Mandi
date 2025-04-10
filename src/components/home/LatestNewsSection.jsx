import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
  Grid,
} from "@mui/material";

// Example data for News, Notices, and About Us
const latestNews = [
  {
    title: "Annual Sports Day 2024",
    date: "December 10, 2024",
    description:
      "Join us for the Annual Sports Day, featuring various athletic events and fun activities for students of all ages.",
  },
  {
    title: "School Annual Day Celebrations",
    date: "December 5, 2024",
    description:
      "We are excited to celebrate the Annual Day with performances by our talented students. Don't miss it!",
  },
];

const notices = [
  {
    title: "School Closed for Winter Break",
    date: "December 15, 2024",
    description:
      "School will be closed for Winter Break from December 15th to January 5th.",
  },
  {
    title: "Parent-Teacher Meeting",
    date: "January 10, 2025",
    description: "Parent-Teacher Meeting scheduled for January 10th at 10 AM.",
  },
];

const LatestNewsSection = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {/* Latest News Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Latest News
              </Typography>
              {latestNews.map((news, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6">{news.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {news.date}
                  </Typography>
                  <Typography variant="body1">{news.description}</Typography>
                </Box>
              ))}
              <Link
                href="#"
                variant="body2"
                color="inherit"
                sx={{ textDecoration: "underline" }}
              >
                View All News
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Notices Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Notices
              </Typography>
              {notices.map((notice, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6">{notice.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {notice.date}
                  </Typography>
                  <Typography variant="body1">{notice.description}</Typography>
                </Box>
              ))}
              <Link
                href="#"
                variant="body2"
                color="inherit"
                sx={{ textDecoration: "underline" }}
              >
                View All Notices
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default LatestNewsSection;
