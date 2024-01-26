import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";
import serverAPI from "../../../../../api/serverAPI";

const InfoLinkedInFilterTwoForm = ({ campaignID }) => {
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
          "Role Function":
            campaignData.linkedInCampaignFilters[5]?.RoleFunction,
          "Current Job Title":
            campaignData.linkedInCampaignFilters[6]?.CurrentJobTitle,
          "Seniority Level":
            campaignData.linkedInCampaignFilters[7]?.SeniorityLevel,
          "Past Job Title":
            campaignData.linkedInCampaignFilters[8]?.PastJobTitle,
          "Years in Current Company":
            campaignData.linkedInCampaignFilters[9]?.YearsInCurrentCompany,
          "Years in Current Position":
            campaignData.linkedInCampaignFilters[10]?.YearsInCurrentPosition,
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

export default InfoLinkedInFilterTwoForm;
