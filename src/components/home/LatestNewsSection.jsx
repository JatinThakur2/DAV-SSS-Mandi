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
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { format, parseISO } from "date-fns";
import {
  OpenInNew as OpenInNewIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

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
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={36}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))
              ) : latestNews.length === 0 ? (
                // No news case
                <Alert severity="info">No recent news available.</Alert>
              ) : (
                // Display news
                latestNews.map((newsItem) => (
                  <Box key={newsItem._id} sx={{ mb: 3 }}>
                    <Typography variant="h6">{newsItem.title}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {formatDate(newsItem.date)}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {newsItem.description.length > 150
                        ? `${newsItem.description.substring(0, 150)}...`
                        : newsItem.description}
                    </Typography>

                    {/* Link button, only visible if link exists */}
                    {newsItem.link && (
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNewIcon />}
                        component="a"
                        href={newsItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 1 }}
                      >
                        Click Here
                      </Button>
                    )}

                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))
              )}

              <Link
                component={RouterLink}
                to="/news"
                variant="body2"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                View All News
                <ArrowForwardIcon sx={{ ml: 0.5, fontSize: 16 }} />
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
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={36}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))
              ) : latestNotices.length === 0 ? (
                // No notices case
                <Alert severity="info">No recent notices available.</Alert>
              ) : (
                // Display notices
                latestNotices.map((notice) => (
                  <Box key={notice._id} sx={{ mb: 3 }}>
                    <Typography variant="h6">{notice.title}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {formatDate(notice.date)}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {notice.description.length > 150
                        ? `${notice.description.substring(0, 150)}...`
                        : notice.description}
                    </Typography>

                    {/* Link button, only visible if link exists */}
                    {notice.link && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        endIcon={<OpenInNewIcon />}
                        component="a"
                        href={notice.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 1 }}
                      >
                        Click Here
                      </Button>
                    )}

                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))
              )}

              <Link
                component={RouterLink}
                to="/notices"
                variant="body2"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                View All Notices
                <ArrowForwardIcon sx={{ ml: 0.5, fontSize: 16 }} />
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
