import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import serverAPI from "../../api/serverAPI";
import OpEditModal from "./EditOpModal";
import { EditButton } from "./OpButtons";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "Detalle", numeric: false, disablePadding: false, label: "Detalle" },
  { id: "Divisa", numeric: true, disablePadding: false, label: "Divisa" },
  { id: "Monto", numeric: true, disablePadding: false, label: "Monto" },
  {
    id: "TipoCambio",
    numeric: true,
    disablePadding: false,
    label: "Tipo de Cambio",
  },
  {
    id: "MontoTotal",
    numeric: true,
    disablePadding: false,
    label: "Monto Total",
  },
  { id: "Fecha", numeric: false, disablePadding: false, label: "Fecha" },
  { id: "Email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "Comentarios",
    numeric: false,
    disablePadding: false,
    label: "Comentarios",
  },
  { id: "Estado", numeric: false, disablePadding: false, label: "Estado" },
  { id: "_id", numeric: false, disablePadding: false, label: "" },
];

const cellWidths = {
  Detalle: "5%",
  Divisa: "5%",
  Monto: "10%",
  TipoCambio: "16%",
  MontoTotal: "10%",
  Fecha: "22%",
  Email: "20%",
  Comentarios: "20%",
  Estado: "5%",
  _id: "-10%",
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells
          .filter((headCell) => headCell.id !== "_id")
          .map((headCell) => (
            <TableCell
              key={headCell.id}
              align="center"
              style={{
                width: cellWidths[headCell.id],
                marginLeft: 0,
                fontWeight: "bold",
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

function TablaOps({ showEditButton }) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("Fecha");
  const [selected, setSelected] = React.useState([]);
  const [operaciones, setOperaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationToEdit, setOperationToEdit] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleOpenModal = (operation) => {
    setOperationToEdit(operation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchOperacionesData();
  }, []);

  const fetchOperacionesData = async () => {
    try {
      const resp = await serverAPI.get("/op/obtenerOperaciones");
      setOperaciones(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditSuccess = () => {
    handleCloseModal();
    fetchOperacionesData();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    event.preventDefault();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = operaciones.map((n) => n.Email);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    event.preventDefault();
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const visibleRows = React.useMemo(
    () => stableSort(operaciones, getComparator(order, orderBy)),
    [order, orderBy, operaciones]
  );

  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "500px",
        overflow: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "dark",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "lightgray",
          borderRadius: "5px",
        },
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={operaciones.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.Email)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    align="left"
                  >
                    {row.Detalle}
                  </TableCell>
                  <TableCell align="center" className="pe-5">
                    {row.Divisa}
                  </TableCell>
                  <TableCell align="center" className="pe-5">
                    {formatCurrency(row.Monto, row.Divisa)}
                  </TableCell>
                  <TableCell align="center" className="pe-5">
                    {formatCurrency(row.TipoCambio, "ARS")}
                  </TableCell>
                  <TableCell align="left">
                    {formatCurrency(row.MontoTotal, "ARS")}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.Fecha)}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>

                  <TableCell align="center">{row.Comentarios}</TableCell>
                  <TableCell align="left">{row.Estado}</TableCell>
                  <EditButton
                    visible={showEditButton}
                    handleClick={() => {
                      handleOpenModal(row);
                    }}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <OpEditModal
        open={isModalOpen}
        onClose={handleCloseModal}
        operation={operationToEdit}
        onOperationChange={handleEditSuccess}
      />
    </Box>
  );
}

export default TablaOps;
