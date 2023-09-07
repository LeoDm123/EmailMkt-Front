import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import serverAPI from "../../api/serverAPI";

interface CapButtonProps {
  handleClick: () => void;
}

export const CapButton = ({ handleClick }: CapButtonProps) => {
  return (
    <div className="mt-2 w-100">
      <div className="d-flex justify-content-end">
        <div>
          <Button variant="contained" onClick={handleClick}>
            Agregar / Retirar Capital
          </Button>
        </div>
      </div>
    </div>
  );
};

interface EditCapButtonProps {
  handleOpenModal: () => void;
}

export const EditCapButton = ({ handleOpenModal }: EditCapButtonProps) => {
  const [userRole, setUserRole] = useState("");

  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

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
    <IconButton
      aria-label="edit"
      style={{
        display: userRole === "admin" ? "flex" : "none",
        marginTop: 17,
      }}
      onClick={handleOpenModal}
    >
      <EditIcon />
    </IconButton>
  );
};
