import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../../components/dashboard/Header";
import Title from "../../components/Title";
import AddMailButton from "../../components/dashboard/client/buttons/AddMailButton";

const defaultTheme = createTheme();

const ClientDashboard = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 500,
                }}
              >
                <Grid className="d-flex justify-content-between">
                  <Title>Client Dashboard</Title>
                  <AddMailButton />
                </Grid>
              </Paper>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default ClientDashboard;
