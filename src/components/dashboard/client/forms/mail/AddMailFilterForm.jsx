import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import getCurrentDate from "../../../../functions/getCurrentDate";

const AddMailFilterForm = ({ formData, handleFormChange }) => {
  return (
    <form id="registerForm" style={{ height: "70%" }}>
      <Grid className="w-100 me-3">
        <TextField
          fullWidth
          label="Campaign Title"
          variant="outlined"
          value={formData.CampaignTitle}
          onChange={(e) => handleFormChange("CampaignTitle", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          variant="outlined"
          className="mt-3 me-2"
          value={formData.StartDateFilter}
          onChange={(e) => handleFormChange("StartDateFilter", e.target.value)}
        />

        <TextField
          fullWidth
          label="# of Employees"
          variant="outlined"
          className="mt-3 ms-2"
          value={formData.EmployeesNrFilter}
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
          value={formData.JobTitlesFilter}
          onChange={(e) => handleFormChange("JobTitlesFilter", e.target.value)}
        />

        <TextField
          fullWidth
          label="Industries"
          variant="outlined"
          className="mt-3 ms-2"
          value={formData.IndustriesFilter}
          onChange={(e) => handleFormChange("IndustriesFilter", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          className="mt-3 me-2"
          value={formData.CompanyNameFilter}
          onChange={(e) =>
            handleFormChange("CompanyNameFilter", e.target.value)
          }
        />

        <TextField
          fullWidth
          label="Keywords"
          variant="outlined"
          className="mt-3 ms-2"
          value={formData.KeywordsFilter}
          onChange={(e) => handleFormChange("KeywordsFilter", e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Revenue"
          variant="outlined"
          className="mt-3 me-2"
          value={formData.RevenueFilter}
          onChange={(e) => handleFormChange("RevenueFilter", e.target.value)}
        />

        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          className="mt-3 ms-2"
          value={formData.DepartmentFilter}
          onChange={(e) => handleFormChange("DepartmentFilter", e.target.value)}
        />
      </Grid>

      <Grid className="w-50">
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          className="mt-3 pe-2"
          value={formData.LocationFilter}
          onChange={(e) => handleFormChange("LocationFilter", e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default AddMailFilterForm;
