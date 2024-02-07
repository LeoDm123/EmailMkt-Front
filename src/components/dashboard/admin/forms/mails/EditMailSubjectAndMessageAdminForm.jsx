import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";

const EditMailSubjectAndMessageAdminForm = ({
  Subject,
  Message,
  Variant,
  handleFormChange,
  campaignID,
}) => {
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
        handleFormChange(
          "Variant",
          campaignData.mailCampaignSubjectAndMessage[1]?.Variant
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  return (
    <form id="messageForm" style={{ height: "70%" }}>
      <Grid className="w-100 me-3">
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          value={Subject}
          onChange={(e) => handleFormChange("Subject", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          sx={{ flex: 1 }}
          label="Message"
          variant="outlined"
          className="mt-3 me-2"
          multiline
          minRows={16}
          value={Message}
          onChange={(e) => handleFormChange("Message", e.target.value)}
        />
        <TextField
          fullWidth
          sx={{ flex: 1 }}
          label="Variant"
          variant="outlined"
          className="mt-3 ms-2"
          multiline
          minRows={16}
          value={Variant}
          onChange={(e) => handleFormChange("Variant", e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default EditMailSubjectAndMessageAdminForm;
