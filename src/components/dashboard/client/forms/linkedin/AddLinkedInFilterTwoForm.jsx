import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Title from "../../../../Title";

const AddLinkedInFilterTwoForm = ({ formData, handleFormChange }) => {
  const handleYearsInCurrentCompanyChange = (value) => {
    const yearsInCurrentPosition = formData.YearsInCurrentPositionFilter;
    if (value >= yearsInCurrentPosition) {
      handleFormChange("YearsInCurrentCompanyFilter", value);
    } else {
      SwAlertError();
    }
  };

  const handleYearsInCurrentPositionChange = (value) => {
    const yearsInCurrentCompany = formData.YearsInCurrentCompanyFilter;
    if (value <= yearsInCurrentCompany) {
      handleFormChange("YearsInCurrentPositionFilter", value);
    } else {
      SwAlertError();
    }
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "Years in current position can't be higher than years in current company",
      icon: "error",
    });
  };

  return (
    <form id="registerForm" style={{ height: "70%" }}>
      <Grid>
        <Title>Role</Title>
        <Grid className="w-100 d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Function"
            variant="outlined"
            className="mt-2 me-2"
            value={formData.RoleFunctionFilter}
            onChange={(e) =>
              handleFormChange("RoleFunctionFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Current Job Title"
            variant="outlined"
            className="mt-2 ms-2"
            value={formData.CurrentJobTitleFilter}
            onChange={(e) =>
              handleFormChange("CurrentJobTitleFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Seniority Level"
            variant="outlined"
            className="mt-3 me-2"
            value={formData.SeniorityLevelFilter}
            onChange={(e) =>
              handleFormChange("SeniorityLevelFilter", e.target.value)
            }
          />

          <TextField
            fullWidth
            label="Past Job Title"
            variant="outlined"
            className="mt-3 ms-2"
            value={formData.PastJobTitleFilter}
            onChange={(e) =>
              handleFormChange("PastJobTitleFilter", e.target.value)
            }
          />
        </Grid>

        <Grid className="d-flex flex-direction-row">
          <TextField
            fullWidth
            label="Years in Current Company"
            variant="outlined"
            className="mt-3 me-2"
            value={formData.YearsInCurrentCompanyFilter}
            onChange={(e) => handleYearsInCurrentCompanyChange(e.target.value)}
          />

          <TextField
            fullWidth
            label="Years in Current Position"
            variant="outlined"
            className="mt-3 ms-2"
            value={formData.YearsInCurrentPositionFilter}
            onChange={(e) => handleYearsInCurrentPositionChange(e.target.value)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLinkedInFilterTwoForm;
