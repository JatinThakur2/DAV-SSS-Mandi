import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { format, parseISO } from "date-fns";
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material";

// CSS class-based marquee with fade effects
const MarqueeContent = ({ children, height = "300px" }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Box
      className="marquee-container"
      sx={{
        height: height,
        overflow: "hidden",
        position: "relative",
        mx: 1, // Add margin to the left and right
      }}
    >
      {/* Top fade effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(to bottom, white 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Box
        className={`marquee-content ${isPaused ? "paused" : ""}`}
        sx={{
          animation: "marquee 20s linear infinite",
          paddingRight: 2,
          paddingLeft: 2,
          "&.paused": {
            animationPlayState: "paused",
          },
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {children}
        {/* Duplicate content for seamless looping */}
        {children}
      </Box>

      {/* Bottom fade effect */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(to top, white 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Add the keyframes animation with global styles */}
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
          `,
        }}
      />
    </Box>
  );
};

const LatestNewsSection = ({ overlayMode = false }) => {
  const isIpadSize = useMediaQuery("(min-width:768px) and (max-width:820px)");

  // Adjust marquee height for overlay mode and iPad-sized screens
  const getMarqueeHeight = () => {
    if (overlayMode) {
      if (isIpadSize) {
        return "220px"; // Shorter height for iPad in overlay mode
      }
      return "320px"; // Default for overlay mode
    }
    return "400px"; // Default height
  };

  // Fetch news and notices from Convex
  const news = useQuery(api.news.getNews, { isNotice: false }) || [];
  const notices = useQuery(api.news.getNews, { isNotice: true }) || [];

  // Loading state
  const isLoading = news === undefined || notices === undefined;

  // Sort and get the latest items
  const latestNews = [...(news || [])]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 6); // Get more items for better scrolling
  const latestNotices = [...(notices || [])]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 6); // Get more items for better scrolling

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString; // Fallback to the original string if parsing fails
    }
  };

  // Adjusted NewsItem component with conditional styling for overlay mode
  const NewsItem = ({ item }) => (
    <Box
      sx={{
        mb: overlayMode && isIpadSize ? 2 : 3,
        position: "relative",
        pr: 5, // Make room for the icon button
        pb: 1,
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <Typography
        variant={overlayMode && isIpadSize ? "subtitle1" : "h6"}
        sx={{ pr: 4 }}
      >
        {item.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        {formatDate(item.date)}
      </Typography>
      <Typography variant="body2">
        {item.description.length > (overlayMode && isIpadSize ? 80 : 120)
          ? `${item.description.substring(0, overlayMode && isIpadSize ? 80 : 120)}...`
          : item.description}
      </Typography>

      {/* Link button, only visible if link exists */}
      {item.link && (
        <Tooltip title="Open Link">
          <IconButton
            size="small"
            color="primary"
            component="a"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: "absolute",
              top: 8,
              right: 0,
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  // In overlay mode, remove the outer margins and styling
  if (overlayMode) {
    return (
      <Grid container spacing={isIpadSize ? 2 : 4}>
        {/* Latest News Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: isIpadSize ? "300px" : "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 0, pb: 1 }}>
              <Typography variant={isIpadSize ? "h6" : "h5"} gutterBottom>
                Latest News
              </Typography>
            </CardContent>

            <Divider />

            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              {isLoading ? (
                // Loading skeleton
                <Box sx={{ p: 2 }}>
                  {Array.from(new Array(2)).map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton variant="text" width="30%" height={20} />
                      <Skeleton variant="text" height={50} />
                      <Skeleton
                        variant="rectangular"
                        width={40}
                        height={40}
                        sx={{ mt: 1, position: "absolute", right: 16, top: 10 }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : latestNews.length === 0 ? (
                // No news case
                <Box sx={{ p: 2 }}>
                  <Alert severity="info">No recent news available.</Alert>
                </Box>
              ) : (
                // Display news with marquee effect
                <MarqueeContent height={getMarqueeHeight()}>
                  <Box>
                    {latestNews.map((newsItem) => (
                      <NewsItem key={newsItem._id} item={newsItem} />
                    ))}
                  </Box>
                </MarqueeContent>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Notices Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: isIpadSize ? "300px" : "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 0, pb: 1 }}>
              <Typography variant={isIpadSize ? "h6" : "h5"} gutterBottom>
                Notices
              </Typography>
            </CardContent>

            <Divider />

            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              {isLoading ? (
                // Loading skeleton
                <Box sx={{ p: 2 }}>
                  {Array.from(new Array(2)).map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton variant="text" width="30%" height={20} />
                      <Skeleton variant="text" height={50} />
                      <Skeleton
                        variant="rectangular"
                        width={40}
                        height={40}
                        sx={{ mt: 1, position: "absolute", right: 16, top: 10 }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : latestNotices.length === 0 ? (
                // No notices case
                <Box sx={{ p: 2 }}>
                  <Alert severity="info">No recent notices available.</Alert>
                </Box>
              ) : (
                // Display notices with marquee effect
                <MarqueeContent height={getMarqueeHeight()}>
                  <Box>
                    {latestNotices.map((notice) => (
                      <NewsItem key={notice._id} item={notice} />
                    ))}
                  </Box>
                </MarqueeContent>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    );
  }

  // Standard mode with normal margins and divider
  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {/* Latest News Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "400px", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 0, pb: 1 }}>
              <Typography variant="h5" gutterBottom>
                Latest News
              </Typography>
            </CardContent>

            <Divider />

            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              {isLoading ? (
                // Loading skeleton
                <Box sx={{ p: 2 }}>
                  {Array.from(new Array(2)).map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Skeleton variant="text" width="60%" height={40} />
                      <Skeleton variant="text" width="30%" height={40} />
                      <Skeleton variant="text" height={50} />
                      <Skeleton
                        variant="rectangular"
                        width={40}
                        height={40}
                        sx={{ mt: 1, position: "absolute", right: 16, top: 10 }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : latestNews.length === 0 ? (
                // No news case
                <Box sx={{ p: 2 }}>
                  <Alert severity="info">No recent news available.</Alert>
                </Box>
              ) : (
                // Display news with marquee effect
                <MarqueeContent>
                  <Box>
                    {latestNews.map((newsItem) => (
                      <NewsItem key={newsItem._id} item={newsItem} />
                    ))}
                  </Box>
                </MarqueeContent>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Notices Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "400px", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 0, pb: 1 }}>
              <Typography variant="h5" gutterBottom>
                Notices
              </Typography>
            </CardContent>

            <Divider />

            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
              {isLoading ? (
                // Loading skeleton
                <Box sx={{ p: 2 }}>
                  {Array.from(new Array(2)).map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton variant="text" width="30%" height={20} />
                      <Skeleton variant="text" height={50} />
                      <Skeleton
                        variant="rectangular"
                        width={40}
                        height={40}
                        sx={{ mt: 1, position: "absolute", right: 16, top: 10 }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : latestNotices.length === 0 ? (
                // No notices case
                <Box sx={{ p: 2 }}>
                  <Alert severity="info">No recent notices available.</Alert>
                </Box>
              ) : (
                // Display notices with marquee effect
                <MarqueeContent>
                  <Box>
                    {latestNotices.map((notice) => (
                      <NewsItem key={notice._id} item={notice} />
                    ))}
                  </Box>
                </MarqueeContent>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default LatestNewsSection;
