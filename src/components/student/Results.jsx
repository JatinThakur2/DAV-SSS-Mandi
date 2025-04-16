import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Alert,
  Skeleton,
} from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ClassResultsComponent from "./ClassResultsComponent";

function Results() {
  const [tabValue, setTabValue] = useState(0);

  // Fetch results from Convex
  const allResults = useQuery(api.results.getResults) || [];

  // Get unique years for tabs
  const years = [...new Set(allResults.map((result) => result.year))]
    .sort()
    .reverse();

  // Set the default tab value based on available years
  React.useEffect(() => {
    if (years.length > 0 && tabValue >= years.length) {
      setTabValue(0);
    }
  }, [years, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter results by year
  const yearResults = allResults.filter(
    (result) => result.year === (years[tabValue] || "")
  );

  // Loading state
  const isLoading = allResults === undefined;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Academic Results
      </Typography>

      {isLoading ? (
        // Loading skeleton
        <>
          <Skeleton variant="rectangular" height={48} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={400} />
        </>
      ) : years.length === 0 ? (
        // No results case
        <Alert severity="info" sx={{ my: 3 }}>
          No examination results available at the moment.
        </Alert>
      ) : (
        <>
          <Tabs
            value={tabValue < years.length ? tabValue : 0}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{ mb: 3 }}
          >
            {years.map((year, index) => (
              <Tab key={year} label={year} />
            ))}
          </Tabs>

          {/* Use our reusable component to display results */}
          <ClassResultsComponent results={yearResults} year={years[tabValue]} />
        </>
      )}
    </Box>
  );
}

export default Results;
