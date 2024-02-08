import React, { useEffect, useState } from "react";
import serverAPI from "../../../../../api/serverAPI";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteButton from "../../../../DeleteButton";
import { DividerTitle } from "../../../../Dividers";

const EditMailSubjectAndMessageForm = ({
  Subject,
  Message,
  handleFormChange,
  campaignID,
}) => {
  const [variantData, setVariantData] = useState([]);

  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        handleFormChange(
          "Subject",
          campaignData.mailCampaignSubjectAndMessage[0]?.Subject
        );
        handleFormChange(
          "Message",
          campaignData.mailCampaignSubjectAndMessage[1]?.Message
        );

        const variantData =
          campaignData.mailCampaignSubjectAndMessage[2]?.Variant || [];
        setVariantData(variantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  const handleVariantChange = (index, field, value) => {
    const newVariantData = [...variantData];
    newVariantData[index] = { ...newVariantData[index], [field]: value };
    setVariantData(newVariantData);
    handleFormChange("Variant", newVariantData);
  };

  const handleAddField = () => {
    setVariantData([
      ...variantData,
      { Subject: "", Message: "", DaysToStart: "" },
    ]);
    handleFormChange("Variant", [
      ...variantData,
      { Subject: "", Message: "", DaysToStart: "" },
    ]);
  };

  const handleDeleteField = (index) => {
    const newVariantData = [...variantData];
    newVariantData.splice(index, 1);
    setVariantData(newVariantData);
    handleFormChange("Variant", newVariantData);
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
            value={Subject}
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
            value={Message}
            onChange={(e) => handleFormChange("Message", e.target.value)}
          />
        </Grid>

        {variantData.map((variant, index) => (
          <React.Fragment key={index}>
            <Grid sx={{ padding: 2 }}>
              <DividerTitle />
            </Grid>
            <Grid className="d-flex justify-content-between align-items-center my-1">
              <TextField
                fullWidth
                label={`Variant ${index + 1}  - Subject`}
                variant="outlined"
                value={variant.Subject}
                onChange={(e) =>
                  handleVariantChange(index, "Subject", e.target.value)
                }
              />
              <TextField
                className="mx-2 w-25"
                fullWidth
                label={`Days To Start`}
                variant="outlined"
                value={variant.DaysToStart}
                onChange={(e) =>
                  handleVariantChange(index, "DaysToStart", e.target.value)
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
                  handleVariantChange(index, "Message", e.target.value)
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

export default EditMailSubjectAndMessageForm;
