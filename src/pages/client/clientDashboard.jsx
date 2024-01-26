import React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../../components/dashboard/Header";
import Title from "../../components/Title";
import AddMailButton from "../../components/dashboard/client/buttons/AddMailButton";
import MailCampaignsList from "../../components/dashboard/client/lists/mailCampaigns/mailCampaignsList";

const defaultTheme = createTheme();

const ClientDashboard = () => {
  const [onMailSubmit, setonMailSubmit] = useState(false);

  const handleMailSubmit = () => {
    setonMailSubmit(!onMailSubmit);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Grid container maxWidth="xl" sx={{ mt: 1, mb: 2, margin: 0 }}>
            <Grid item xs={12} md={12} lg={12} xl={6} className="p-2">
              <Grid className="d-flex justify-content-between">
                <AddMailButton onMailCreation={handleMailSubmit} />
              </Grid>
              <Paper
                sx={{
                  pt: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: 580,
                }}
              >
                <MailCampaignsList onMailCreation={onMailSubmit} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={6} className="p-2">
              <Grid className="d-flex justify-content-between">
                <AddMailButton onMailCreation={handleMailSubmit} />
              </Grid>
              <Paper
                sx={{
                  pt: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: 580,
                }}
              >
                <MailCampaignsList onMailCreation={onMailSubmit} />
              </Paper>
            </Grid>
          </Grid>
        }
      />
    </ThemeProvider>
  );
};

export default ClientDashboard;
