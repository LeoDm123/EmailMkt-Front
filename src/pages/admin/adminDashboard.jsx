import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../../components/dashboard/Header";
import LinkedInCampaignsAdminList from "../../components/dashboard/admin/lists/linkedinCampaigns/LinkedInCampaignAdminList";
import MailCampaignsAdminList from "../../components/dashboard/admin/lists/mailCampaigns/MailCampaignAdminList";

const defaultTheme = createTheme();

const AdminDashboard = () => {
  const [onMailSubmit, setOnMailSubmit] = useState(false);
  const [onLinkedInSubmit, setOnLinkedInSubmit] = useState(false);
  const [mailSectionHeight, setMailSectionHeight] = useState(310);
  const [linkedinSectionHeight, setLinkedInSectionHeight] = useState(310);
  const [isLinkedZoomed, setIsLinkedZoomed] = useState(true);
  const [isMailZoomed, setIsMailZoomed] = useState(true);

  const handleLinkedZoomChange = () => {
    if (isMailZoomed === "true") {
      setIsMailZoomed(!isMailZoomed);
    } else {
      setIsLinkedZoomed(!isLinkedZoomed);
      handleLinkedSection();
    }
  };

  const handleLinkedSection = () => {
    if (isLinkedZoomed) {
      setMailSectionHeight(50);
      setLinkedInSectionHeight(570);
    } else {
      setMailSectionHeight(310);
      setLinkedInSectionHeight(310);
    }
  };

  const handleMailZoomChange = () => {
    if (isLinkedZoomed === "true") {
      setIsLinkedZoomed(!isLinkedZoomed);
    } else {
      setIsMailZoomed(!isMailZoomed);
      handleMailSection();
    }
  };

  const handleMailSection = () => {
    if (isMailZoomed) {
      setMailSectionHeight(570);
      setLinkedInSectionHeight(50);
    } else {
      setMailSectionHeight(310);
      setLinkedInSectionHeight(310);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Grid container maxWidth="xl" sx={{ mt: 1, mb: 2, margin: 0 }}>
            <Grid item xs={12} md={12} lg={12} xl={12} className="p-2">
              <Paper
                sx={{
                  pt: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: mailSectionHeight,
                  transition: "height 0.5s ease",
                }}
              >
                <MailCampaignsAdminList
                  onMailCreation={onMailSubmit}
                  zoom={handleMailZoomChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12} className="p-2">
              <Grid className="d-flex justify-content-between"></Grid>
              <Paper
                sx={{
                  pt: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: linkedinSectionHeight,
                  transition: "height 0.5s ease",
                }}
              >
                <LinkedInCampaignsAdminList
                  onLinkedInCreation={onLinkedInSubmit}
                  zoom={handleLinkedZoomChange}
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
