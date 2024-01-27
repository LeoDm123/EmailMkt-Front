import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onDelete }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={handleLogout}>
          <PowerSettingsNewIcon sx={{ color: "#fff" }} />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default LogoutButton;
