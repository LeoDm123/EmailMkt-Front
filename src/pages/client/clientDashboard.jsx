import React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../../components/dashboard/Header";
import AddMailButton from "../../components/dashboard/client/buttons/mail/AddMailButton";
import AddLinkedInButton from "../../components/dashboard/client/buttons/linkedin/AddLinkedInButton";
import MailCampaignsList from "../../components/dashboard/client/lists/mailCampaigns/mailCampaignsList";
import LinkedInCampaignsList from "../../components/dashboard/client/lists/linkedInCampaigns/LinkedInCampaignsList";

const defaultTheme = createTheme();

const ClientDashboard = () => {
  const [onMailSubmit, setonMailSubmit] = useState(false);
  const [onLinkedInSubmit, setonLinkedInSubmit] = useState(false);
  const [mailSectionWitdh, setMailSectionWitdh] = useState("50%");
  const [linkedinSectionWitdh, setLinkedInSectionWitdh] = useState("50%");
  const [isZoomed, setIsZoomed] = useState(true);

  const handleMailSubmit = () => {
    setonMailSubmit(!onMailSubmit);
  };

  const handleLinkedInSubmit = () => {
    setonLinkedInSubmit(!onLinkedInSubmit);
  };

  const handleLinkedZoomChange = () => {
    setIsZoomed(!isZoomed);
    console.log(isZoomed);
    handleLinkedSection();
  };

  const handleLinkedSection = () => {
    if (isZoomed) {
      setMailSectionWitdh("3%");
      setLinkedInSectionWitdh("97%");
    } else {
      setMailSectionWitdh("50%");
      setLinkedInSectionWitdh("50%");
    }
  };

  const handleMailZoomChange = () => {
    setIsZoomed(!isZoomed);
    console.log(isZoomed);
    handleMailSection();
  };

  const handleMailSection = () => {
    if (isZoomed) {
      setMailSectionWitdh("97%");
      setLinkedInSectionWitdh("3%");
    } else {
      setMailSectionWitdh("50%");
      setLinkedInSectionWitdh("50%");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Grid container maxWidth="xl" sx={{ mt: 1, mb: 2, margin: 0 }}>
            <Grid className="d-flex px-2 w-100">
              <Grid className="me-1 my-2">
                <AddMailButton onMailCreation={handleMailSubmit} />
              </Grid>
              <Grid className="ms-1 my-2">
                <AddLinkedInButton onLinkedInCreation={handleLinkedInSubmit} />
              </Grid>
            </Grid>
            <Grid xl={12} className="d-flex">
              <Grid
                sx={{
                  width: mailSectionWitdh,
                  transition: "width 0.5s ease",
                }}
                className="p-2"
              >
                <Paper
                  sx={{
                    pt: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: 580,
                  }}
                >
                  <Grid
                    sx={{
                      display: mailSectionWitdh === "3%" ? "none" : "block",
                    }}
                  >
                    <MailCampaignsList
                      onMailCreation={onMailSubmit}
                      zoom={handleMailZoomChange}
                    />
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                sx={{
                  width: linkedinSectionWitdh,
                  transition: "width 0.5s ease",
                }}
                className="p-2"
              >
                <Paper
                  sx={{
                    pt: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: 580,
                  }}
                >
                  <Grid
                    sx={{
                      display: linkedinSectionWitdh === "3%" ? "none" : "block",
                    }}
                  >
                    <LinkedInCampaignsList
                      onLinkedInCreation={onLinkedInSubmit}
                      zoom={handleLinkedZoomChange}
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        }
      />
    </ThemeProvider>
  );
};

export default ClientDashboard;
