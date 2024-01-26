import React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../../components/dashboard/Header";
import LinkedInCampaignsAdminList from "../../components/dashboard/admin/lists/linkedinCampaigns/LinkedInCampaignAdminList";
import MailCampaignsAdminList from "../../components/dashboard/admin/lists/mailCampaigns/MailCampaignAdminList";

const defaultTheme = createTheme();

const AdminDashboard = () => {
  const [onMailSubmit, setonMailSubmit] = useState(false);
  const [onLinkedInSubmit, setonLinkedInSubmit] = useState(false);

  const handleMailSubmit = () => {
    setonMailSubmit(!onMailSubmit);
  };

  const handleLinkedInSubmit = () => {
    setonLinkedInSubmit(!onLinkedInSubmit);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Grid container maxWidth="xl" sx={{ mt: 1, mb: 2, margin: 0 }}>
            <Grid item xs={12} md={12} lg={12} xl={12} className="p-2">
              <Grid className="d-flex justify-content-between"></Grid>
              <Paper
                sx={{
                  pt: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                }}
              >
                <MailCampaignsAdminList onMailCreation={onMailSubmit} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12} className="p-2">
              <Grid className="d-flex justify-content-between"></Grid>
              <Paper
                sx={{
                  pt: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                }}
              >
                <LinkedInCampaignsAdminList
                  onLinkedInCreation={onLinkedInSubmit}
                />
              </Paper>
            </Grid>
          </Grid>
        }
      />
    </ThemeProvider>
  );
};

export default AdminDashboard;
