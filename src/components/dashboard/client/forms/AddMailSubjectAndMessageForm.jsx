import React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const AddMailSubjectAndMessageForm = ({ formData, handleFormChange }) => {
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  return (
    <form id="messageForm" style={{ height: "70%" }}>
      <Grid className="w-100 me-3">
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          value={formData.Subject}
          onChange={(e) => handleFormChange("Subject", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          sx={{ flex: 1 }}
          label="Message"
          variant="outlined"
          className="mt-3"
          multiline
          minRows={16}
          value={formData.Message}
          onChange={(e) => handleFormChange("Message", e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default AddMailSubjectAndMessageForm;
