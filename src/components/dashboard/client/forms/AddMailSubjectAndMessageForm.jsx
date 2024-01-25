import React, { ChangeEvent } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import serverAPI from "../../../../api/serverAPI";
import TextField from "@mui/material/TextField";

const AddMailSubjectAndMessageForm = ({ open, onClose, onMailCreation }) => {
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  const crearCliente = async (Subject, Message) => {
    try {
      const resp = await serverAPI.post("/clients/crearCliente", {
        Subject,
        Message,
      });

      if (
        resp.data.msg ===
        "El DNI que intenta registrar ya se encuentra registrado"
      ) {
        SwAlertError();
      } else {
        console.log(resp);
        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "El cliente se agregó correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El cliente ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (KeywordsFilter === "" || Subject === "" || EmployeesNrFilter === "") {
      return console.log("todos los campos son obligatorios");
    }

    console.log(Subject, Message);

    crearCliente(Subject, Message);

    setSubject("");
    setMessage("");

    onMailCreation();
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit} style={{ height: "70%" }}>
      <Grid className="w-100 me-3">
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          value={Subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          sx={{ flex: 1 }}
          label="Message"
          variant="outlined"
          className="mt-3"
          multiline
          minRows={16}
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default AddMailSubjectAndMessageForm;
