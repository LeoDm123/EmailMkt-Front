import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";
import serverAPI from "../../../../../api/serverAPI";

const InfoLinkedInFilterOneForm = ({ campaignID }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchLinkedInCampaignsByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/linkedin/fetchLinkedInCampaignsByID/${campaignID}`
        );
        const campaignData = resp.data;

        setFormData({
          "Campaign Name": campaignData.linkedInCampaignName,
          "Current Company Name":
            campaignData.linkedInCampaignFilters[0]?.CurrentCompanyName,
          "Company Head Count":
            campaignData.linkedInCampaignFilters[1]?.CompanyHeadcount,
          "Past Company Name":
            campaignData.linkedInCampaignFilters[2]?.PastCompanyName,
          "Company Type": campaignData.linkedInCampaignFilters[3]?.CompanyType,
          "Company Headquarters Location":
            campaignData.linkedInCampaignFilters[4]?.CompanyHQLocation,
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

export default InfoLinkedInFilterOneForm;
