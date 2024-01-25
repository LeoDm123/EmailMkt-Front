import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import serverAPI from "../../api/serverAPI";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo.png";

const defaultTheme = createTheme();

export const LogIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("loggedInUserRole");
  }, []);

  const startLogin = async (userEmail, userPassword) => {
    try {
      setIsLoading(true);

      const resp = await serverAPI.post("/auth/userLogin", {
        userEmail,
        userPassword,
      });

      localStorage.setItem("loggedInUserEmail", userEmail);

      if (resp.data.msg === "User logged") {
        console.log(resp.data.user);
        const userRole = resp.data.user.role;
        if (userRole === "admin") {
          localStorage.setItem("loggedInUserRole", userRole);
          navigate("/AdminDashboard");
        } else if (userRole === "user") {
          localStorage.setItem("loggedInUserRole", userRole);
          navigate("/ClientDashboard");
        }
      } else {
        console.log(resp.data.msg);
        setLoginError(resp.data.msg);
      }
    } catch (error) {
      console.log(loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userEmail === "" || userPassword === "") {
      return console.log("Todos los campos son obligatorios");
    }

    startLogin(userEmail, userPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "https://www.dropbox.com/scl/fi/zlps7f1ujw5loo0pj49nq/landing-img.jpg?rlkey=ykfavn9qyro6gsq5nkaiwuet1&dl=0",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              className="w-75 d-flex justify-content-center mb-5"
              alt="Logo"
            />
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember Me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                // onClick={() => navigate("/dashboard")}
              >
                {isLoading && (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden" role="status">
                      Signing In...
                    </span>
                  </>
                )}
                {!isLoading ? "Sign In" : "Signing In..."}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Forgot your password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
