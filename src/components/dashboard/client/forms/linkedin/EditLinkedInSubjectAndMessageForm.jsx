import React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";

const EditLinkedInSubjectAndMessageForm = ({
  Subject,
  Message,
  campaignID,
  handleFormChange,
}) => {
  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        console.log(campaignID);
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
          className="mt-3"
          multiline
          minRows={16}
          value={Message}
          onChange={(e) => handleFormChange("Message", e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default EditLinkedInSubjectAndMessageForm;