import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import serverAPI from "../../../../../api/serverAPI";

const EditMailFilterAdminForm = ({
  CampaignTitle,
  StartDateFilter,
  EmployeesNrFilter,
  JobTitlesFilter,
  IndustriesFilter,
  CompanyNameFilter,
  KeywordsFilter,
  RevenueFilter,
  DepartmentFilter,
  LocationFilter,
  status,
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

        handleFormChange("status", campaignData.status);
        handleFormChange("CampaignTitle", campaignData.mailCampaignName);
        handleFormChange(
          "StartDateFilter",
          campaignData.mailCampaignFilters[0]?.StartDate
        );
        handleFormChange(
          "EmployeesNrFilter",
          campaignData.mailCampaignFilters[1]?.EmployeesNr
        );
        handleFormChange(
          "JobTitlesFilter",
          campaignData.mailCampaignFilters[2]?.JobTitles
        );
        handleFormChange(
          "IndustriesFilter",
          campaignData.mailCampaignFilters[3]?.Industries
        );
        handleFormChange(
          "CompanyNameFilter",
          campaignData.mailCampaignFilters[4]?.CompanyName
        );
        handleFormChange(
          "KeywordsFilter",
          campaignData.mailCampaignFilters[5]?.Keywords
        );
        handleFormChange(
          "RevenueFilter",
          campaignData.mailCampaignFilters[6]?.Revenue
        );
        handleFormChange(
          "DepartmentFilter",
          campaignData.mailCampaignFilters[7]?.Department
        );
        handleFormChange(
          "LocationFilter",
          campaignData.mailCampaignFilters[8]?.Location
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMailCampaignsByID();
  }, [campaignID]);

  return (
    <form id="registerForm" style={{ height: "70%" }}>
      <Grid className="w-100 me-3">
        <TextField
          fullWidth
          label="Campaign Title"
          variant="outlined"
          value={CampaignTitle}
          onChange={(e) => handleFormChange("CampaignTitle", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          variant="outlined"
          className="mt-3 me-2"
          value={StartDateFilter || ""}
          onChange={(e) => handleFormChange("StartDateFilter", e.target.value)}
        />

        <TextField
          fullWidth
          label="# of Employees"
          variant="outlined"
          className="mt-3 ms-2"
          value={EmployeesNrFilter}
          onChange={(e) =>
            handleFormChange("EmployeesNrFilter", e.target.value)
          }
        />
      </Grid>

      <Grid className="d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Job Title"
          variant="outlined"
          className="mt-3 me-2"
          value={JobTitlesFilter}
          onChange={(e) => handleFormChange("JobTitlesFilter", e.target.value)}
        />

        <TextField
          fullWidth
          label="Industries"
          variant="outlined"
          className="mt-3 ms-2"
          value={IndustriesFilter}
          onChange={(e) => handleFormChange("IndustriesFilter", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          className="mt-3 me-2"
          value={CompanyNameFilter}
          onChange={(e) =>
            handleFormChange("CompanyNameFilter", e.target.value)
          }
        />

        <TextField
          fullWidth
          label="Keywords"
          variant="outlined"
          className="mt-3 ms-2"
          value={KeywordsFilter}
          onChange={(e) => handleFormChange("KeywordsFilter", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Revenue"
          variant="outlined"
          className="mt-3 me-2"
          value={RevenueFilter}
          onChange={(e) => handleFormChange("RevenueFilter", e.target.value)}
        />

        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          className="mt-3 ms-2"
          value={DepartmentFilter}
          onChange={(e) => handleFormChange("DepartmentFilter", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          className="mt-3 me-2 w-100"
          value={LocationFilter}
          onChange={(e) => handleFormChange("LocationFilter", e.target.value)}
        />

        <FormControl variant="outlined" fullWidth className="mt-3 me-2">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            className=" ms-2 w-100"
            value={status}
            onChange={(e) => handleFormChange("status", e.target.value)}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Setting Up">Setting Up</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Paused">Paused</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </form>
  );
};

export default EditMailFilterAdminForm;
