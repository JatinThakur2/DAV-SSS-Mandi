import React from "react";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  LocalHospital as MedicalIcon,
  Block as BlockIcon,
} from "@mui/icons-material";

function AdmissionRules() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        General Rules for Admission
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
          Eligibility Conditions
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Documents to be presented at the time of admission:
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Date of birth form from Gram Panchayat / Municipal Committee or transfer certificate of last school attended for migrating students is required." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Admission is given on the basis of entrance test and academic records of previous class." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Provisional Admission to classes of 9th, 11th, 12th will be done until the result of preceding classes is declared. The charges once paid shall not be refundable." />
          </ListItem>
        </List>

        <Typography
          variant="subtitle2"
          color="error"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          NOTE: The school reserves the right to accept or reject the admission.
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Discipline
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="It is mandatory for all the students to be in proper school uniform. Detailed information of the school uniform is given in the school diary." />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Every student is expected to pay due regard to the teachers in and outside the school, whether he/she teaches them or not." />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <WarningIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="It is expected of the parents to respect all the school norms. In case of riotous behavior by any parent, authorities may be constrained to issue the Transfer Certificate to the Child." />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="No student will wear gold jewellery. School authorities will not be held responsible for any kind of loss." />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <MedicalIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="If a child has any INFECTIOUS DISEASE, he/she will not be allowed to attend the Class/Examinations." />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemIcon>
              <BlockIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Use of motor vehicles/motorbikes/mobile phones/cameras, by the students is strictly prohibited." />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default AdmissionRules;
