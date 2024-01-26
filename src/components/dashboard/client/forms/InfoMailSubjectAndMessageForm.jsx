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
        const campaignData = resp.data;

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
    <Grid sx={{ height: "70%" }}>
      <Grid container spacing={2}>
        {Object.entries(formData).map(([key, value], index) => (
          <Grid item xs={12} sm={12} key={key}>
            <TextField fullWidth label={key} variant="outlined" value={value} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default InfoMailSubjectAndMessageForm;
