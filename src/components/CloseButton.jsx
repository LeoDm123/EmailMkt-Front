import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClick }) => {
  return (
    <IconButton
      sx={{
        color: "#fff",
        backgroundColor: "#6a6a6a",
        width: "30px",
        height: "30px",
      }}
      onClick={handleClick}
      size="small"
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
