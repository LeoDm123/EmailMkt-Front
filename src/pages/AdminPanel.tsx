import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "../css/App.css";
import Skeleton from "@mui/material/Skeleton";
import UserList from "../components/admin/userList";
import CapitalOp from "../components/capital/CapOpList";
import CapOpsResetButton from "../components/capital/CapButton";
import { DividerTitle } from "../components/Dividers";
import DolarBlue from "../components/Rates";
import Header from "../components/Header";

const defaultTheme = createTheme();

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [operationStatusChanged, setOperationStatusChanged] = useState(false);

  const handleOperationChange = () => {
    setOperationStatusChanged(!operationStatusChanged);
  };

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
            <div className="d-flex w-100">
              <Grid spacing={1} sx={{ width: 600 }}>
                {/* Usuarios */}
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <h2 className="titulo my-3">Usuarios Activos</h2>

                  <DividerTitle />
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <UserList />
                  )}
                </Paper>
              </Grid>
              <Grid spacing={3} marginLeft={5} sx={{ width: 400 }}>
                {/* Divisas Operativas */}
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="titulo my-3">Divisas Operativas</h2>
                    <CapOpsResetButton
                      handleOperationChange={handleOperationChange}
                    />
                  </div>
                  <DividerTitle />
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <CapitalOp operationStatus={handleOperationChange} />
                  )}
                </Paper>
                <DolarBlue />
              </Grid>
            </div>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default AdminPanel;
