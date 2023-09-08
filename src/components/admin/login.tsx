import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import serverAPI from "../../api/serverAPI";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga
  const navigate = useNavigate();

  const startLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true); // Mostrar el spinner cuando se inicia sesión

      const resp = await serverAPI.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("loggedInUserEmail", email);

      navigate("/dashboard");

      console.log(resp);
      setLoginError(resp.data.msg);
    } catch (error) {
      console.log(loginError);
    } finally {
      setIsLoading(false); // Ocultar el spinner cuando se completa la solicitud
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "" || password === "") {
      return console.log("todos los campos son obligatorios");
    }

    startLogin(email, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 80, height: 80 }}>
            <PublishedWithChangesIcon sx={{ width: 50, height: 50 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // Desactiva el botón mientras isLoading sea true
            >
              {isLoading && (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden" role="status">
                    Loading...
                  </span>
                </>
              )}
              {!isLoading ? "Iniciar sesión" : "Iniciando sesión..."}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidó la contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
