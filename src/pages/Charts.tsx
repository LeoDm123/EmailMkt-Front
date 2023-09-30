import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { DividerTitle } from "../components/Dividers";
import "../css/App.css";
import Header from "../components/menu/Header";
import CashFlow from "../components/charts/CashFlow";

const defaultTheme = createTheme();

const Charts = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 1, mb: 2 }}>
            <Grid container spacing={3}>
              {/* Operaciones */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 600,
                    borderRadius: 5,
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <h2 className="titulo my-3">Flujo de Caja</h2>
                  </div>
                  <DividerTitle />
                  <CashFlow />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default Charts;
