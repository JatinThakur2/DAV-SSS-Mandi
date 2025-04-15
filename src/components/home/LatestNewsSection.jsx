import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
  Grid,
  Skeleton,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { format, parseISO } from "date-fns";

const LatestNewsSection = () => {
  // Fetch news and notices from Convex
  const news = useQuery(api.news.getNews, { isNotice: false }) || [];
  const notices = useQuery(api.news.getNews, { isNotice: true }) || [];

  // Loading state
  const isLoading = news === undefined || notices === undefined;

  // Sort and get the latest items
  const latestNews = [...(news || [])]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2);
  const latestNotices = [...(notices || [])]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2);

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString; // Fallback to the original string if parsing fails
    }
  };

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

              {isLoading ? (
                // Loading skeleton
                Array.from(new Array(2)).map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="30%" height={20} />
                    <Skeleton variant="text" height={50} />
                  </Box>
                ))
              ) : latestNews.length === 0 ? (
                // No news case
                <Alert severity="info">No recent news available.</Alert>
              ) : (
                // Display news
                latestNews.map((newsItem) => (
                  <Box key={newsItem._id} sx={{ mb: 2 }}>
                    <Typography variant="h6">{newsItem.title}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {formatDate(newsItem.date)}
                    </Typography>
                    <Typography variant="body1">
                      {newsItem.description.length > 150
                        ? `${newsItem.description.substring(0, 150)}...`
                        : newsItem.description}
                    </Typography>
                  </Box>
                ))
              )}

              <Link
                component={RouterLink}
                to="/news"
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

              {isLoading ? (
                // Loading skeleton
                Array.from(new Array(2)).map((_, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="30%" height={20} />
                    <Skeleton variant="text" height={50} />
                  </Box>
                ))
              ) : latestNotices.length === 0 ? (
                // No notices case
                <Alert severity="info">No recent notices available.</Alert>
              ) : (
                // Display notices
                latestNotices.map((notice) => (
                  <Box key={notice._id} sx={{ mb: 2 }}>
                    <Typography variant="h6">{notice.title}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {formatDate(notice.date)}
                    </Typography>
                    <Typography variant="body1">
                      {notice.description.length > 150
                        ? `${notice.description.substring(0, 150)}...`
                        : notice.description}
                    </Typography>
                  </Box>
                ))
              )}

              <Link
                component={RouterLink}
                to="/notices"
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
