import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "../../css/App.css";
import Skeleton from "@mui/material/Skeleton";
import UserList from "../../components/adminPanel/userList";
import { DividerTitle } from "../../components/Dividers";
import Header from "../../components/dashboard/Header";
import AddUserButton from "../../components/adminPanel/buttons/AddUserButton";
import Title from "../../components/Title";

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
                <Paper
                  sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Grid className="d-flex justify-content-between align-items-center">
                    <Title>Active Users</Title>
                    <AddUserButton />
                  </Grid>

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
            </div>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default AdminPanel;
