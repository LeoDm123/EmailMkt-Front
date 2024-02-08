import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteButton from "../../../../DeleteButton";
import { DividerTitle } from "../../../../Dividers";

const AddMailSubjectAndMessageForm = ({ formData, handleFormChange }) => {
  const [extraVariants, setExtraVariants] = useState([]);

  const handleAddField = () => {
    setExtraVariants([
      ...extraVariants,
      { Subject: "", Message: "", DaysToStart: "" },
    ]);
  };

  const handleVariantsChange = (index, variant, value) => {
    const newExtraVariants = [...extraVariants];
    newExtraVariants[index][variant] = value;
    setExtraVariants(newExtraVariants);

    handleFormChange("Variant", newExtraVariants);
  };

  const handleDeleteField = (index) => {
    const newExtraVariants = [...extraVariants];
    newExtraVariants.splice(index, 1);
    setExtraVariants(newExtraVariants);
    handleFormChange("Variant", newExtraVariants);
  };

  return (
    <form id="messageForm" style={{ height: "70%" }}>
      <Grid
        spacing={2}
        sx={{
          marginBottom: 2,
          height: 500,
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "dark",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "lightgray",
            borderRadius: "5px",
          },
        }}
      >
        <Grid xs={12} sx={{ marginY: 1 }}>
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={formData.Subject}
            onChange={(e) => handleFormChange("Subject", e.target.value)}
          />
        </Grid>

        <Grid xs={12} sx={{ marginY: 1 }}>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            minRows={5}
            value={formData.Message}
            onChange={(e) => handleFormChange("Message", e.target.value)}
          />
        </Grid>

        {extraVariants.map((variant, index) => (
          <React.Fragment key={index}>
            <Grid container sx={{ padding: 2 }}>
              <Grid xs={12}>
                <DividerTitle />
              </Grid>
            </Grid>
            <Grid className="d-flex justify-content-between align-items-center, my-1">
              <TextField
                fullWidth
                label={`Variant ${index + 1}  - Subject`}
                variant="outlined"
                value={variant.Subject}
                onChange={(e) =>
                  handleVariantsChange(index, "Subject", e.target.value)
                }
              />
              <TextField
                className="mx-2 w-25"
                fullWidth
                label={`Days To Start`}
                variant="outlined"
                value={variant.DaysToStart}
                onChange={(e) =>
                  handleVariantsChange(index, "DaysToStart", e.target.value)
                }
              />
              <Grid>
                <DeleteButton onDelete={() => handleDeleteField(index)} />
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ marginY: 1 }}>
              <TextField
                fullWidth
                label={`Variant ${index + 1} - Message`}
                variant="outlined"
                multiline
                minRows={5}
                value={variant.Message}
                onChange={(e) =>
                  handleVariantsChange(index, "Message", e.target.value)
                }
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddField}>
          Add Variant
        </Button>
      </Grid>
    </form>
  );
};

export default AddMailSubjectAndMessageForm;
