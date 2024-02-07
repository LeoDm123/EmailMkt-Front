import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";

const EditLinkedInSubjectAndMessageForm = ({
  Subject,
  Message,
  Variant,
  campaignID,
  handleFormChange,
}) => {
  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        handleFormChange(
          "Subject",
          campaignData.linkedInCampaignSubjectAndMessage[0]?.Subject
        );
        handleFormChange(
          "Message",
          campaignData.linkedInCampaignSubjectAndMessage[1]?.Message
        );
        handleFormChange(
          "Variant",
          campaignData.linkedInCampaignSubjectAndMessage[2]?.Variant
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLinkedInCampaignsByID();
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

export default EditLinkedInSubjectAndMessageForm;
