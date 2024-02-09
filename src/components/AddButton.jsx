import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

const AddButton = ({ onClick }) => {
  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={onClick}>
          <AddCircleIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default AddButton;
