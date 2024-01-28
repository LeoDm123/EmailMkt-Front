const formatStatus = (status) => {
  let color = "";

  if (status === "Pending") {
    color = "#F1C40F";
  } else if (status === "Setting Up") {
    color = "#3498DB";
  } else if (status === "Active") {
    color = "#2ECC71";
  } else if (status === "Paused") {
    color = "#AF7AC5";
  } else if (status === "Closed") {
    color = "#99A3A4";
  }

  return color;
};

export default formatStatus;
