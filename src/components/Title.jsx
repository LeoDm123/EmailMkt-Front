import React from "react";
import Typography from "@mui/material/Typography";

function Title(props) {
  return (
    <Typography
      sx={{ overflow: "hidden" }}
      component="h2"
      variant="h5"
      color="primary"
    >
      {props.children}
    </Typography>
  );
}

export default Title;
