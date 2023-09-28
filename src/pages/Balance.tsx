import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "../css/App.css";
import BalanceComp from "../components/BalanceComp";
import Skeleton from "@mui/material/Skeleton";
import { DividerTitle } from "../components/Dividers";
import Header from "../components/Header";

const defaultTheme = createTheme();

const Balance = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                  }}
                >
                  <h2 className="titulo my-3">Balance</h2>

                  <DividerTitle />
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={600}
                    />
                  ) : (
                    <BalanceComp />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default Balance;
