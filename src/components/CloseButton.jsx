import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClick }) => {
  return (
    <IconButton
      sx={{ color: "#fff", backgroundColor: "#01662b" }}
      onClick={handleClick}
      size="small"
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
