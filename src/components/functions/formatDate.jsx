const formatDate = (fecha) => {
  const date = new Date(fecha);
  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default formatDate;
