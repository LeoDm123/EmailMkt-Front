import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../api/serverAPI";

const InfoMailSubjectAndMessageForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchMailCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/mails/fetchMailCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data[0];
        console.log(campaignData);

        setFormData({
          Subject: campaignData.mailCampaignSubjectAndMessage[0]?.Subject,
          Message: campaignData.mailCampaignSubjectAndMessage[1]?.Message,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  return (
    <form id="messageForm" style={{ height: "70%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={formData.Subject}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            minRows={16}
            value={formData.Message}
            disabled
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default InfoMailSubjectAndMessageForm;
