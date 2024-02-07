import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import serverAPI from "../../../../../api/serverAPI";

const InfoLinkedInFilterThreeForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        setFormData({
          Geography: campaignData.linkedInCampaignFilters[11]?.Geography,
          Industry: campaignData.linkedInCampaignFilters[12]?.Industry,
          "First Name": campaignData.linkedInCampaignFilters[13]?.FirstName,
          "Last Name": campaignData.linkedInCampaignFilters[14]?.LastName,
          "Profile Language":
            campaignData.linkedInCampaignFilters[15]?.ProfileLanguage,
          "Years of Experience":
            campaignData.linkedInCampaignFilters[16]?.YearsOfExperience,
          Gropus: campaignData.linkedInCampaignFilters[17]?.Groups,
          School: campaignData.linkedInCampaignFilters[18]?.School,
          "Changed Jobs": campaignData.linkedInCampaignFilters[19]?.ChangedJobs,
          "Posted on LinkedIn":
            campaignData.linkedInCampaignFilters[20]?.PostedOnLinkedIn,
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

export default InfoLinkedInFilterThreeForm;
