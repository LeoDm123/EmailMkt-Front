import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const DeleteButton = ({ onDelete }) => {
  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default DeleteButton;
