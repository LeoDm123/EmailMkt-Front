import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";

const InfoLinkedInSubjectAndMessageForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        console.log(campaignID);
        const resp = await serverAPI.get(
          `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        setFormData({
          Subject: campaignData.linkedInCampaignSubjectAndMessage[0]?.Subject,
          Message: campaignData.linkedInCampaignSubjectAndMessage[1]?.Message,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLinkedInCampaignsByID();
  }, [campaignID]);

  return (
    <Grid sx={{ height: "70%" }}>
      <Grid container spacing={2}>
        {Object.entries(formData).map(([key, value], index) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField fullWidth label={key} variant="outlined" value={value} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default InfoLinkedInSubjectAndMessageForm;
