import React, { ChangeEvent } from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import serverAPI from "../../../../api/serverAPI";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const AddMailFilterForm = ({ open, onClose, onMailCreation }) => {
  const [CampaignTitle, setCampaignTitle] = useState("");
  const [NameFilter, setNameFilter] = useState("");
  const [EmployeesNrFilter, setEmployeesNrFilter] = useState("");
  const [JobTitlesFilter, setJobTitlesFilter] = useState("");
  const [IndustriesFilter, setIndustriesFilter] = useState("");
  const [CompanyNameFilter, setCompanyNameFilter] = useState("");
  const [KeywordsFilter, setKeywordsFilter] = useState("");
  const [RevenueFilter, setRevenueFilter] = useState("");
  const [DepartmentFilter, setDepartmentFilter] = useState("");
  const [LocationFilter, setLocationFilter] = useState("");

  const crearCliente = async (
    CampaignTitle,
    NameFilter,
    EmployeesNrFilter,
    JobTitlesFilter,
    ClientCUIT,
    IndustriesFilter,
    CompanyNameFilter,
    KeywordsFilter,
    RevenueFilter,
    DepartmentFilter,
    LocationFilter
  ) => {
    try {
      const resp = await serverAPI.post("/clients/crearCliente", {
        CampaignTitle,
        NameFilter,
        EmployeesNrFilter,
        JobTitlesFilter,
        ClientCUIT,
        IndustriesFilter,
        CompanyNameFilter,
        KeywordsFilter,
        RevenueFilter,
        DepartmentFilter,
        LocationFilter,
      });

      if (
        resp.data.msg ===
        "El DNI que intenta registrar ya se encuentra registrado"
      ) {
        SwAlertError();
      } else {
        console.log(resp);
        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "El cliente se agregó correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El cliente ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      KeywordsFilter === "" ||
      CampaignTitle === "" ||
      EmployeesNrFilter === ""
    ) {
      return console.log("todos los campos son obligatorios");
    }

    console.log(
      CampaignTitle,
      NameFilter,
      EmployeesNrFilter,
      JobTitlesFilter,
      IndustriesFilter,
      CompanyNameFilter,
      KeywordsFilter,
      RevenueFilter,
      DepartmentFilter,
      LocationFilter
    );

    crearCliente(
      CampaignTitle,
      NameFilter,
      EmployeesNrFilter,
      JobTitlesFilter,
      IndustriesFilter,
      CompanyNameFilter,
      KeywordsFilter,
      RevenueFilter,
      DepartmentFilter,
      LocationFilter
    );

    setCampaignTitle("");
    setNameFilter("");
    setEmployeesNrFilter("");
    setJobTitlesFilter("");
    setKeywordsFilter("");
    setIndustriesFilter("");
    setCompanyNameFilter("");
    setRevenueFilter("");
    setDepartmentFilter("");
    setLocationFilter("");

    onMailCreation();
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit} style={{ height: "70%" }}>
      <Grid className="w-100 me-3">
        <TextField
          fullWidth
          label="Campaign Title"
          variant="outlined"
          value={CampaignTitle}
          onChange={(e) => setCampaignTitle(e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          className="mt-3 me-2"
          value={NameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <TextField
          fullWidth
          label="# of Employees"
          variant="outlined"
          className="mt-3 ms-2"
          value={EmployeesNrFilter}
          onChange={(e) => setEmployeesNrFilter(e.target.value)}
        />
      </Grid>

      <Grid className="d-flex flex-direction-row">
        <FormControl variant="outlined" fullWidth className="mt-3">
          <InputLabel>Job Title</InputLabel>
          <Select
            label="Job Title"
            className="me-2"
            value={JobTitlesFilter}
            onChange={(e) => setJobTitlesFilter(e.target.value)}
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
            value={IndustriesFilter}
            onChange={(e) => setIndustriesFilter(e.target.value)}
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
          value={CompanyNameFilter}
          onChange={(e) => setCompanyNameFilter(e.target.value)}
        />

        <TextField
          fullWidth
          label="Keywords"
          variant="outlined"
          className="mt-3 ms-2"
          value={KeywordsFilter}
          onChange={(e) => setKeywordsFilter(e.target.value)}
        />
      </Grid>

      <Grid className="w-100 d-flex flex-direction-row">
        <TextField
          fullWidth
          label="Revenue"
          variant="outlined"
          className="mt-3 me-2"
          value={RevenueFilter}
          onChange={(e) => setRevenueFilter(e.target.value)}
        />

        <TextField
          fullWidth
          label="Department"
          variant="outlined"
          className="mt-3 ms-2"
          value={DepartmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        />
      </Grid>

      <Grid>
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          className="mt-3 w-50"
          value={LocationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </Grid>
    </form>
  );
};

export default AddMailFilterForm;
