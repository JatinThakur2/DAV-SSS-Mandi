// src/components/admin/gallery/EventsList.jsx
import React from "react";
import {
  Typography,
  Divider,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
} from "@mui/icons-material";

function EventsList({
  events,
  selectedEventId,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Events
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {events.length === 0 ? (
        <Alert severity="info">
          No gallery events found. Click the "Add New Event" button to create
          your first event.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {events.map((event) => (
            <Card
              key={event._id}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
                border: selectedEventId === event._id ? "2px solid" : "none",
                borderColor: "primary.main",
              }}
              onClick={() => onSelectEvent(event._id)}
            >
              <CardMedia
                component="img"
                height="140"
                image={event.thumbnail || "/api/placeholder/400/300"}
                alt={event.title}
              />
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="h6" noWrap>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <EventIcon
                    sx={{
                      fontSize: 14,
                      mr: 0.5,
                      verticalAlign: "middle",
                    }}
                  />
                  {event.date}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditEvent(event);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(event._id, event.title);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}

export default EventsList;
