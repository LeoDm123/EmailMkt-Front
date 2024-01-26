import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Title from "../../../../Title";

const AddLinkedInFilterOneForm = ({ formData, handleFormChange }) => {
  return (
    <form id="registerForm" style={{ height: "70%" }}>
      <Grid className="w-100 me-3 mb-3">
        <TextField
          fullWidth
          label="Campaign Title"
          variant="outlined"
          value={formData.CampaignTitle}
          onChange={(e) => handleFormChange("CampaignTitle", e.target.value)}
        />
      </Grid>

      <Grid>
        <Title>Company</Title>
        <Grid className="w-100 d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Current Company"
            variant="outlined"
            className="mt-2 me-2"
            value={formData.CurrentCompanyNameFilter}
            onChange={(e) =>
              handleFormChange("CurrentCompanyNameFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Company Headcount"
            variant="outlined"
            className="mt-2 ms-2"
            value={formData.CompanyHeadcountFilter}
            onChange={(e) =>
              handleFormChange("CompanyHeadcountFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Past Company"
            variant="outlined"
            className="mt-3 me-2"
            value={formData.PastCompanyNameFilter}
            onChange={(e) =>
              handleFormChange("PastCompanyNameFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Company Type"
            variant="outlined"
            className="mt-3 ms-2"
            value={formData.CompanyTypeFilter}
            onChange={(e) =>
              handleFormChange("CompanyTypeFilter", e.target.value)
            }
          />
        </Grid>

        <Grid>
          <TextField
            fullWidth
            label="Company Headquarters Location"
            variant="outlined"
            className="mt-3 w-100"
            value={formData.CompanyHQLocationFilter}
            onChange={(e) =>
              handleFormChange("CompanyHQLocationFilter", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLinkedInFilterOneForm;
