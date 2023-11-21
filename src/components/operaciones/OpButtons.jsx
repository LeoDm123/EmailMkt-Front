import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import serverAPI from "../../api/serverAPI";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import ListIcon from "@mui/icons-material/List";
import AddOpList from "./AddOpList";

export function OpOkButton({ handleClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        sx={{ width: 150, borderRadius: 10 }}
        endIcon={<CheckCircleIcon />}
        color="success"
        onClick={handleClick}
      >
        Aceptar
      </Button>
    </Stack>
  );
}

export function OpCancelButton({ handleClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        sx={{ width: 150, borderRadius: 10 }}
        endIcon={<CancelIcon />}
        color="error"
        onClick={handleClick}
      >
        Cancelar
      </Button>
    </Stack>
  );
}

export function AddOp({ handleClick }) {
  return (
    <Grid>
      <Button
        className="AddButton mt-2"
        onClick={handleClick}
        variant="contained"
        startIcon={<AddCircleIcon />}
        size="middle"
      >
        Nuevo Operacion
      </Button>
    </Grid>
  );
}

export function ShowEditButton({ setShowEditButton }) {
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const [userRole, setUserRole] = useState("");

  const [EditState, setEditState] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const resp = await serverAPI.get("/auth/getUserByEmail", {
          params: { email: loggedInUserEmail },
        });
        setUserRole(resp.data.rol);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (loggedInUserEmail) {
      fetchUserRole();
    }
  }, [loggedInUserEmail]);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        style={{
          display: userRole === "admin" ? "flex" : "none",
          marginTop: 17,
          borderRadius: 10,
        }}
        onClick={() => {
          setShowEditButton(EditState);
          setEditState(!EditState);
          console.log(EditState);
        }}
      >
        Editar
      </Button>
    </div>
  );
}

export function EditButton({ visible, handleClick }) {
  return (
    <IconButton
      aria-label="edit"
      style={{
        display: visible ? "flex" : "none",
        marginTop: 5,
      }}
      onClick={handleClick}
    >
      <EditIcon />
    </IconButton>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function UploadButton({ onChange }) {
  const handleFileChange = (e) => {
    onChange(e);
  };

  return (
    <Button
      sx={{ height: "100%" }}
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Seleccionar Archivo
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}

export function AddOpListButton({ onMatSubmit }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <Button
        className="AddButton mt-2"
        onClick={handleClick}
        variant="contained"
        startIcon={<ListIcon />}
        size="middle"
      ></Button>
      <AddOpList
        open={modalOpen}
        onClose={handleCloseModal}
        onMatSubmit={onMatSubmit}
      />
    </Grid>
  );
}
