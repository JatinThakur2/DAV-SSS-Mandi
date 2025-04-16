// src/components/admin/results/ResultTableComponents.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Chip,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  EmojiEvents as AwardIcon,
} from "@mui/icons-material";

// Component for displaying the results table
export const ResultsTable = ({
  filteredResults,
  expandedRow,
  handleToggleExpand,
  handleOpenDialog,
  handleOpenDeleteDialog,
}) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="5%"></TableCell>
              <TableCell width="15%">Class</TableCell>
              <TableCell width="15%">Year</TableCell>
              <TableCell width="50%">Top Students</TableCell>
              <TableCell width="15%" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.length === 0 ? (
              <EmptyResultsRow />
            ) : (
              filteredResults.map((result) => (
                <ResultTableRow
                  key={result._id}
                  result={result}
                  isExpanded={expandedRow === result._id}
                  onToggleExpand={() => handleToggleExpand(result._id)}
                  onEdit={() => handleOpenDialog("edit", result)}
                  onDelete={() => handleOpenDeleteDialog(result._id, result)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Component for an empty results row
const EmptyResultsRow = () => (
  <TableRow>
    <TableCell colSpan={5} align="center">
      <Typography variant="body1" sx={{ py: 3 }}>
        No results found for this year. Click the "Add Results" button to add
        some.
      </Typography>
    </TableCell>
  </TableRow>
);

// Component for each result row
const ResultTableRow = ({
  result,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
}) => (
  <React.Fragment>
    <TableRow hover>
      <TableCell>
        <IconButton size="small" onClick={onToggleExpand}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </TableCell>
      <TableCell>
        <ClassChip classValue={result.class} />
      </TableCell>
      <TableCell>{result.year}</TableCell>
      <TableCell>
        <TopStudentsChips students={result.data} />
      </TableCell>
      <TableCell align="center">
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
    {isExpanded && <ExpandedResultDetails result={result} />}
  </React.Fragment>
);

// Component for class display with appropriate color
const ClassChip = ({ classValue }) => {
  const getChipColor = (classValue) => {
    if (classValue === "10") return "primary";
    if (classValue.includes("Science")) return "success";
    if (classValue.includes("Arts")) return "warning";
    return "info";
  };

  return (
    <Chip
      label={classValue}
      color={getChipColor(classValue)}
      variant="outlined"
    />
  );
};

// Component for displaying top students as chips
const TopStudentsChips = ({ students }) => (
  <Stack direction="row" spacing={1}>
    {students.slice(0, 3).map((student, index) => (
      <Chip
        key={index}
        icon={<AwardIcon />}
        label={`${student.position}: ${student.name}`}
        variant="outlined"
        size="small"
        sx={{
          bgcolor: index === 0 ? "gold" : index === 1 ? "silver" : "#cd7f32",
          color: "white",
        }}
      />
    ))}
    {students.length > 3 && (
      <Chip
        label={`+${students.length - 3} more`}
        size="small"
        variant="outlined"
      />
    )}
  </Stack>
);

// Component for edit and delete action buttons
const ActionButtons = ({ onEdit, onDelete }) => (
  <Stack direction="row" justifyContent="center" spacing={1}>
    <IconButton color="primary" size="small" onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton color="error" size="small" onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </Stack>
);

// Component for expanded details of a result
const ExpandedResultDetails = ({ result }) => (
  <TableRow>
    <TableCell colSpan={5} sx={{ py: 0 }}>
      <Box sx={{ p: 2, bgcolor: "action.hover" }}>
        <Typography variant="subtitle1" gutterBottom>
          Detailed Results for Class {result.class} ({result.year})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {result.summary && <ResultSummarySection summary={result.summary} />}
          <TopPerformersSection data={result.data} />
        </Grid>
      </Box>
    </TableCell>
  </TableRow>
);

// Component for displaying result summary in the expanded view
const ResultSummarySection = ({ summary }) => (
  <Grid item xs={12} md={4}>
    <Typography variant="subtitle2" gutterBottom>
      Summary
    </Typography>
    <Box component="ul" sx={{ pl: 2 }}>
      <li>
        <Typography variant="body2">
          Total Students: {summary.totalStudents}
        </Typography>
      </li>
      <li>
        <Typography variant="body2">Passed: {summary.passed}</Typography>
      </li>
      <li>
        <Typography variant="body2">
          Pass Percentage: {summary.result}
        </Typography>
      </li>
    </Box>
  </Grid>
);

// Component for displaying top performers in the expanded view
const TopPerformersSection = ({ data }) => (
  <Grid item xs={12} md={8}>
    <Typography variant="subtitle2" gutterBottom>
      Top Performers
    </Typography>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Marks</TableCell>
            {data[0]?.totalMarks && <TableCell>Total</TableCell>}
            {data[0]?.percentage && <TableCell>Percentage</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.position}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.marks}</TableCell>
              {data[0]?.totalMarks && (
                <TableCell>{student.totalMarks}</TableCell>
              )}
              {data[0]?.percentage && (
                <TableCell>{student.percentage}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
);

// Component to display when no years are available yet
export const NoYearsAlert = ({ handleOpenDialog }) => (
  <Alert severity="info" sx={{ mb: 3 }}>
    No results added yet. Click the "Add Results" button to add your first
    results.
  </Alert>
);
