// src/pages/admin/DashboardPage.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Divider,
} from "@mui/material";
import {
  Newspaper as NewsIcon,
  School as SchoolIcon,
  MonetizationOn as ScholarshipIcon,
  Collections as GalleryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get counts for dashboard
  const news = useQuery(api.news.getNews) || [];
  const results = useQuery(api.results.getResults) || [];
  const scholarships = useQuery(api.scholarships.getScholarships) || [];
  const galleryEvents = useQuery(api.gallery.getGalleryEvents) || [];

  const dashboardItems = [
    {
      title: "News & Notices",
      icon: <NewsIcon sx={{ fontSize: 40 }} />,
      count: news.length,
      color: "#1E88E5",
      path: "/admin/news",
    },
    {
      title: "Results",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      count: results.length,
      color: "#43A047",
      path: "/admin/results",
    },
    {
      title: "Scholarships",
      icon: <ScholarshipIcon sx={{ fontSize: 40 }} />,
      count: scholarships.length,
      color: "#FB8C00",
      path: "/admin/scholarships",
    },
    {
      title: "Gallery",
      icon: <GalleryIcon sx={{ fontSize: 40 }} />,
      count: galleryEvents.length,
      color: "#E53935",
      path: "/admin/gallery",
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || "Admin"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your school's website content easily from this dashboard.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardActionArea
                sx={{ height: "100%" }}
                onClick={() => navigate(item.path)}
              >
                <CardContent sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: `${item.color}15`,
                        color: item.color,
                        borderRadius: "50%",
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h3" fontWeight="700" sx={{ mb: 1 }}>
                      {item.count}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {item.title}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 2,
              }}
            >
              <CardActionArea onClick={() => navigate("/admin/news/add")}>
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <NewsIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="h6">Add News</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                bgcolor: "success.main",
                color: "white",
                borderRadius: 2,
              }}
            >
              <CardActionArea onClick={() => navigate("/admin/results/add")}>
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <SchoolIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="h6">Add Results</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                bgcolor: "warning.main",
                color: "white",
                borderRadius: 2,
              }}
            >
              <CardActionArea
                onClick={() => navigate("/admin/scholarships/add")}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <ScholarshipIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="h6">Add Scholarship</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                bgcolor: "error.main",
                color: "white",
                borderRadius: 2,
              }}
            >
              <CardActionArea onClick={() => navigate("/admin/gallery/add")}>
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <GalleryIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Typography variant="h6">Add Gallery Event</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Recent Updates
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" color="text.secondary">
          This panel will show the most recent updates to your content.
        </Typography>
      </Paper>
    </Box>
  );
}

export default DashboardPage;
