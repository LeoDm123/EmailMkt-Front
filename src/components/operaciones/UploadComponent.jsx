import React, { useState } from "react";
import * as XLSX from "xlsx";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, TextField, Grid } from "@mui/material";
import { UploadButton } from "./OpButtons";

const UploadComponent = ({ onFileUpload, onClose }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File", selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 1,
        });
        onFileUpload(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Grid>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Agregar Listado de Materiales</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>
      <Grid display={"Flex"} sx={{ width: "100%", alignItems: "center" }}>
        <UploadButton onChange={handleFileChange} />
        <TextField
          value={fileName}
          sx={{ width: "48%", marginX: 2 }}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "100%" }}
          onClick={handleFileUpload}
        >
          Cargar Archivo
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadComponent;
