import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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
          label="Name"
          variant="outlined"
          className="mt-3 me-2"
          value={formData.NameFilter}
          onChange={(e) => handleFormChange("NameFilter", e.target.value)}
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
        <FormControl variant="outlined" fullWidth className="mt-3">
          <InputLabel>Job Title</InputLabel>
          <Select
            label="Job Title"
            className="me-2"
            value={formData.JobTitlesFilter}
            onChange={(e) =>
              handleFormChange("JobTitlesFilter", e.target.value)
            }
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="Chief Excutive Officer">
              Chief Excutive Officer
            </MenuItem>
            <MenuItem value="Chief Financial Officer">
              Chief Financial Officer
            </MenuItem>
            <MenuItem value="Chief Operations Officer">
              Chief Operations Officer
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth className="mt-3">
          <InputLabel>Industries</InputLabel>
          <Select
            label="Industries"
            className="ms-2"
            value={formData.IndustriesFilter}
            onChange={(e) =>
              handleFormChange("IndustriesFilter", e.target.value)
            }
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="Construction">Construction</MenuItem>
            <MenuItem value="Health Services">Health Services</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
          </Select>
        </FormControl>
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

      <Grid>
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          className="mt-3 w-50"
          value={formData.LocationFilter}
          onChange={(e) => handleFormChange("LocationFilter", e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default AddMailFilterForm;
