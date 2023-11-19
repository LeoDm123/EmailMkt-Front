import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import serverAPI from "../../api/serverAPI";

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
    <div className="mt-2 w-100">
      <div className="d-flex justify-content-end">
        <div>
          <Button
            variant="contained"
            onClick={handleClick}
            endIcon={<AddCircleIcon />}
            style={{ borderRadius: 10 }}
          >
            Nueva Operación
          </Button>
        </div>
      </div>
    </div>
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
