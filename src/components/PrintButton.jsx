import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";
import exportToPDF from "./functions/exportToPDF";

const PrintButton = ({ campaignID }) => {
  const handlePrint = () => {
    exportToPDF(campaignID);
  };

  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={handlePrint}>
          <PrintIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default PrintButton;
