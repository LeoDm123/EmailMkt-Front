import React, { ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import Button from "@mui/material/Button";
import Title from "../../Title";
import { DividerTitle } from "../../Dividers";

const AddUserModal = ({ open, onClose, onUserCreation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const createUser = async (userName, userEmail, userPassword) => {
    try {
      const resp = await serverAPI.post("/auth/createUser", {
        userName,
        userEmail,
        userPassword,
      });

      if (resp.data.msg === "The user is already registered") {
        SwAlertError();
      } else {
        console.log(resp);

        setUserName("");
        setUserEmail("");
        setUserPassword("");

        onClose();
        onUserCreation();

        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Success!",
      text: "User created correctly",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "User is already registered",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userEmail === "" || userName === "" || userPassword === "") {
      console.log("All the fields are mandatory");
      return;
    }

    createUser(userName, userEmail, userPassword);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
        }}
        className="CreateModal"
      >
        <form id="registerForm" onSubmit={handleSubmit}>
          <Grid>
            <Grid className="d-flex justify-content-between align-items-center">
              <Title>Create user</Title>
              <HighlightOffIcon onClick={onClose} fontSize="large" />
            </Grid>
            <DividerTitle />
          </Grid>

          <Grid className="d-flex flex-direction-row">
            <Grid className="w-100 mt-3">
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid className="d-flex flex-direction-row">
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              className="mt-3 me-3"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              label="Password"
              variant="outlined"
              className="mt-3"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-4"
          >
            Create User
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddUserModal;
