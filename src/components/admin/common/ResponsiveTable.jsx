// src/components/admin/common/ResponsiveTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";

/**
 * A responsive table component that displays as cards on mobile devices
 * and as a traditional table on larger screens
 *
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data objects
 * @param {string} props.idField - Field to use as unique ID
 * @param {React.ReactNode} props.emptyContent - Content to display when data is empty
 * @param {Function} props.onRowClick - Function to call when a row is clicked
 * @param {string} props.selectedId - ID of the selected row
 */
function ResponsiveTable({
  columns = [],
  data = [],
  idField = "id",
  emptyContent,
  onRowClick,
  selectedId,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // If no data, show empty content
  if (data.length === 0) {
    return (
      emptyContent || (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      )
    );
  }

  // Card view for mobile
  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        {data.map((row) => {
          const id = row[idField];
          const isSelected = selectedId === id;

          return (
            <Card
              key={id}
              sx={{
                mb: 2,
                cursor: onRowClick ? "pointer" : "default",
                border: isSelected
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
                boxShadow: isSelected ? 3 : 1,
              }}
              onClick={() => onRowClick && onRowClick(row)}
            >
              <CardContent sx={{ p: 2 }}>
                {columns.map((column, idx) => {
                  // Skip actions column in mobile card view
                  if (column.field === "actions") return null;

                  const value = row[column.field];
                  const displayValue = column.renderCell
                    ? column.renderCell({ value, row })
                    : value;

                  return (
                    <Box
                      key={column.field}
                      sx={{ mb: idx !== columns.length - 1 ? 1.5 : 0 }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 0.5, display: "block" }}
                      >
                        {column.headerName}
                      </Typography>
                      <Box>{displayValue}</Box>
                      {idx !== columns.length - 1 &&
                        idx !== columns.length - 2 && (
                          <Divider sx={{ mt: 1.5 }} />
                        )}
                    </Box>
                  );
                })}

                {/* Put actions at the bottom if they exist */}
                {columns.find((col) => col.field === "actions") && (
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    {columns
                      .find((col) => col.field === "actions")
                      .renderCell({ row })}
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  }

  // Traditional table view for tablets and desktops
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table aria-label="responsive table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align={column.align || "left"}
                sx={{
                  fontWeight: "bold",
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const id = row[idField];
            const isSelected = selectedId === id;

            return (
              <TableRow
                key={id}
                hover
                onClick={() => onRowClick && onRowClick(row)}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  backgroundColor: isSelected
                    ? "rgba(0, 0, 0, 0.04)"
                    : "inherit",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "rgba(0, 0, 0, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align || "left"}>
                    {column.renderCell
                      ? column.renderCell({ value: row[column.field], row })
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResponsiveTable;
