import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  School as SchoolIcon,
  People as PeopleIcon,
  EmojiEvents as AwardIcon,
  History as HistoryIcon,
} from "@mui/icons-material";

function StatsCounter() {
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({
    established: 0,
    students: 0,
    faculty: 0,
    pass: 0,
  });
  const sectionRef = useRef(null);

  // Target values for counters - memoized to avoid recreation
  const targetCounts = useMemo(
    () => ({
      established: 1944,
      students: 1000,
      faculty: 25,
      pass: 100,
    }),
    []
  );

  // Check if element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Once triggered, disconnect observer
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Store the current ref value in a variable to use in cleanup
    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  // Counting animation effect
  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // Duration of count animation in ms
    const frameDuration = 1000 / 60; // Duration of one frame at 60fps
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;

      const progress = frame / totalFrames;

      setCounts({
        established: Math.floor(progress * targetCounts.established),
        students: Math.floor(progress * targetCounts.students),
        faculty: Math.floor(progress * targetCounts.faculty),
        pass: Math.floor(progress * targetCounts.pass),
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setCounts(targetCounts); // Ensure we hit exact target numbers
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [inView, targetCounts]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 6,
        backgroundColor: "primary.main",
        color: "white",
        transform: inView ? "translateY(0)" : "translateY(50px)",
        opacity: inView ? 1 : 0,
        transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        maxWidth="lg"
        sx={{ mx: "auto", px: 2 }}
      >
        {/* Established Year */}
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "primary.dark",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
              },
            }}
          >
            <HistoryIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
            <Typography variant="h3" fontWeight="bold">
              {counts.established}
            </Typography>
            <Typography variant="h6" textAlign="center">
              Established
            </Typography>
          </Paper>
        </Grid>

        {/* Number of Students */}
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "primary.dark",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
              },
            }}
          >
            <PeopleIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
            <Typography variant="h3" fontWeight="bold">
              {counts.students}+
            </Typography>
            <Typography variant="h6" textAlign="center">
              Students
            </Typography>
          </Paper>
        </Grid>

        {/* Faculty Members */}
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "primary.dark",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
              },
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
            <Typography variant="h3" fontWeight="bold">
              {counts.faculty}+
            </Typography>
            <Typography variant="h6" textAlign="center">
              Faculty Members
            </Typography>
          </Paper>
        </Grid>

        {/* Pass Percentage */}
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "primary.dark",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
              },
            }}
          >
            <AwardIcon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
            <Typography variant="h3" fontWeight="bold">
              {counts.pass}%
            </Typography>
            <Typography variant="h6" textAlign="center">
              Pass Percentage
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatsCounter;
