// src/pages/admin/DashboardPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
} from "@mui/material";
import {
  Newspaper as NewsIcon,
  School as SchoolIcon,
  MonetizationOn as ScholarshipIcon,
  Collections as GalleryIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreVertIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  TimerOutlined as PendingIcon,
  DateRange as DateIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Chart/graph component placeholder (you can replace with an actual chart library)
const SimpleBarChart = ({ data, height = 200 }) => (
  <Box sx={{ height, position: 'relative', mb: 2 }}>
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
      {data.map((item, index) => (
        <Box 
          key={index} 
          sx={{ 
            flex: 1,
            mx: 0.5,
            backgroundColor: item.color || 'primary.main',
            height: `${item.value}%`,
            minHeight: 10,
            borderRadius: '4px 4px 0 0',
            position: 'relative',
            '&:hover': {
              opacity: 0.8,
              transform: 'translateY(-5px)',
              transition: 'all 0.3s',
            }
          }}
        >
          <Typography 
            variant="caption" 
            component="div" 
            sx={{ 
              position: 'absolute', 
              bottom: '-25px', 
              width: '100%', 
              textAlign: 'center',
              fontSize: '0.7rem',
            }}
          >
            {item.label}
          </Typography>
          <Typography 
            variant="caption" 
            component="div" 
            sx={{ 
              position: 'absolute', 
              top: '-20px', 
              width: '100%', 
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);
  
  // Simulate loading state
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Get counts for dashboard
  const news = useQuery(api.news.getNews) || [];
  const results = useQuery(api.results.getResults) || [];
  const scholarships = useQuery(api.scholarships.getScholarships) || [];
  const galleryEvents = useQuery(api.gallery.getGalleryEvents) || [];

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 1000);
  };

  // Handle more menu
  const handleMoreMenuOpen = (event) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  // Mock data for charts
  const monthlyVisits = [
    { label: 'Jan', value: 65, color: theme.palette.primary.main },
    { label: 'Feb', value: 45, color: theme.palette.primary.main },
    { label: 'Mar', value: 75, color: theme.palette.primary.main },
    { label: 'Apr', value: 85, color: theme.palette.primary.main },
    { label: 'May', value: 60, color: theme.palette.primary.main },
    { label: 'Jun', value: 90, color: theme.palette.primary.main },
  ];

  // Stats cards data
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

  // Recent activity data
  const recentActivities = [
    { 
      id: 1, 
      type: 'news', 
      title: 'New notice published', 
      time: '30 minutes ago',
      status: 'completed',
      icon: <NewsIcon color="primary" />,
    },
    { 
      id: 2, 
      type: 'gallery', 
      title: 'Gallery updated with new images', 
      time: '2 hours ago',
      status: 'completed',
      icon: <GalleryIcon color="primary" />,
    },
    { 
      id: 3, 
      type: 'results', 
      title: 'Class X results uploaded', 
      time: 'Yesterday',
      status: 'completed',
      icon: <SchoolIcon color="success" />,
    },
    { 
      id: 4, 
      type: 'scholarship', 
      title: 'Scholarship application processing', 
      time: '3 days ago',
      status: 'pending',
      icon: <ScholarshipIcon color="warning" />,
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Day Celebration',
      date: '25 Apr 2025',
      type: 'school'
    },
    {
      id: 2,
      title: 'Sports Day',
      date: '10 May 2025',
      type: 'sports'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '15 May 2025',
      type: 'meeting'
    }
  ];

  // Adjust line width, spacing based on screen size
  const lineHeight = isMobile ? 140 : 200;
  const cardSpacing = isMobile ? 1.5 : 3;
  const cardHeight = isMobile ? 120 : 160;

  return (
    <Box>
      {/* Dashboard Header */}
      <Box sx={{ 
        mb: 3,
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 0.5 }}>
            Welcome, {user?.name || "Admin"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {isLoading ? ' • Refreshing...' : ` • Last updated at ${lastUpdated}`}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
          <Button 
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={isLoading}
            size={isMobile ? "small" : "medium"}
          >
            Refresh
          </Button>
          {!isMobile && (
            <Button
              variant="contained"
              startIcon={<DateIcon />}
              size={isMobile ? "small" : "medium"}
            >
              Today
            </Button>
          )}
          
          <IconButton onClick={handleMoreMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          
          <Menu
            anchorEl={moreMenuAnchor}
            open={Boolean(moreMenuAnchor)}
            onClose={handleMoreMenuClose}
          >
            <MenuItem onClick={handleMoreMenuClose}>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              View Website
            </MenuItem>
            <MenuItem onClick={handleMoreMenuClose}>
              <ListItemIcon>
                <RefreshIcon fontSize="small" />
              </ListItemIcon>
              Refresh Data
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMoreMenuClose}>
              <ListItemIcon>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              Export Report
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      
      {isLoading && (
        <LinearProgress sx={{ mb: 3, borderRadius: 1 }} />
      )}

      {/* Main Stats Cards */}
      <Grid container spacing={isMobile ? 1.5 : 2}>
        {dashboardItems.map((item) => (
          <Grid item xs={6} sm={6} md={3} key={item.title}>
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
                      py: isMobile ? 1 : 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: `${item.color}15`,
                        color: item.color,
                        borderRadius: "50%",
                        p: isMobile ? 1 : 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant={isMobile ? "h4" : "h3"}
                      fontWeight="700"
                      sx={{ mb: 1 }}
                    >
                      {item.count}
                    </Typography>
                    <Typography
                      variant={isMobile ? "body2" : "body1"}
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dashboard content panels with responsive layout */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Monthly Traffic/Website Stats */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mb: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Website Traffic</Typography>
              <Chip 
                label="Last 6 Months" 
                variant="outlined" 
                size="small" 
                icon={<TrendingUpIcon fontSize="small" />}
              />
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <SimpleBarChart data={monthlyVisits} height={220} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold">1,204</Typography>
                <Typography variant="caption" color="text.secondary">Total Visits</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold">85%</Typography>
                <Typography variant="caption" color="text.secondary">Return Rate</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold">2.5m</Typography>
                <Typography variant="caption" color="text.secondary">Avg. Duration</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mb: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Upcoming Events</Typography>
              <IconButton size="small">
                <CalendarIcon fontSize="small" />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <List sx={{ px: 0 }}>
              {upcomingEvents.map((event) => (
                <ListItem 
                  key={event.id} 
                  disablePadding 
                  sx={{ 
                    py: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 1.5,
                    px: 2,
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 42 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                      <CalendarIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={event.title}
                    secondary={event.date}
                    primaryTypographyProps={{ fontWeight: 500, variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<CalendarIcon />} 
              sx={{ mt: 2 }}
              size="small"
            >
              View All Events
            </Button>
          </Paper>
        </Grid>
      
        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Activities</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List disablePadding>
              {recentActivities.map((activity) => (
                <ListItem 
                  key={activity.id}
                  sx={{ 
                    p: 2, 
                    mb: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider', 
                  }}
                >
                  <ListItemIcon>
                    {activity.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1">{activity.title}</Typography>
                        <Chip 
                          size="small" 
                          label={activity.status} 
                          color={activity.status === 'completed' ? 'success' : 'warning'}
                          variant="outlined"
                          icon={activity.status === 'completed' ? <CheckCircleIcon fontSize="small" /> : <PendingIcon fontSize="small" />}
                          sx={{ ml: 2 }}
                        />
                      </Box>
                    }
                    secondary={activity.time}
                  />
                  <Tooltip title="View details">
                    <IconButton edge="end" size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="outlined">View All Activities</Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Quick Actions section */}
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <CardActionArea onClick={() => navigate("/admin/news")}>
                    <CardContent sx={{ textAlign: "center", py: { xs: 2, md: 3 } }}>
                      <NewsIcon sx={{ fontSize: isMobile ? 24 : 30, mb: 1 }} />
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        Add News
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    bgcolor: "success.main",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <CardActionArea onClick={() => navigate("/admin/results")}>
                    <CardContent sx={{ textAlign: "center", py: { xs: 2, md: 3 } }}>
                      <SchoolIcon sx={{ fontSize: isMobile ? 24 : 30, mb: 1 }} />
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        Add Results
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    bgcolor: "warning.main",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <CardActionArea onClick={() => navigate("/admin/scholarships")}>
                    <CardContent sx={{ textAlign: "center", py: { xs: 2, md: 3 } }}>
                      <ScholarshipIcon
                        sx={{ fontSize: isMobile ? 24 : 30, mb: 1 }}
                      />
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        Scholarships
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={6} sm={3}>
                <Card
                  sx={{
                    bgcolor: "error.main",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <CardActionArea onClick={() => navigate("/admin/gallery")}>
                    <CardContent sx={{ textAlign: "center", py: { xs: 2, md: 3 } }}>
                      <GalleryIcon sx={{ fontSize: isMobile ? 24 : 30, mb: 1 }} />
                      <Typography variant={isMobile ? "body2" : "body1"}>
                        Gallery
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );