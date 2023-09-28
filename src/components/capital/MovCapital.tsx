import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { EditButton } from "./CapButton";
import serverAPI from "../../api/serverAPI";
import EditMovModal from "./EditMovModal";
import { NullableData } from "./DataTypes";

interface Data {
  Detalle: string;
  Divisa: string;
  Monto: number;
  Fecha: string;
  Email: string;
  Comentarios: string;
  _id: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "Detalle",
    numeric: false,
    disablePadding: false,
    label: "Detalle",
  },
  {
    id: "Divisa",
    numeric: true,
    disablePadding: false,
    label: "Divisa",
  },
  {
    id: "Monto",
    numeric: true,
    disablePadding: false,
    label: "Monto",
  },

  {
    id: "Fecha",
    numeric: false,
    disablePadding: false,
    label: "Fecha",
  },
  {
    id: "Email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "Comentarios",
    numeric: false,
    disablePadding: false,
    label: "Comentarios",
  },
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

const cellWidths = {
  Detalle: "10%",
  Divisa: "10%",
  Monto: "15%",
  Fecha: "20%",
  Email: "20%",
  Comentarios: "30%",
  _id: "-10%",
};

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            style={{ width: cellWidths[headCell.id], fontWeight: "bold" }}
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

interface TablaMovimientos {
  showEditButton: boolean;
}

export default function TablaMovimientos({ showEditButton }: TablaMovimientos) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("Fecha");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [movimientos, setMovimientos] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movimientoToEdit, setMovimientoToEdit] = useState<NullableData | null>(
    null
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses son base 0, por eso se suma 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleOpenModal = (movimiento: Data) => {
    setMovimientoToEdit(movimiento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchMovimientosData();
  }, []);

  const fetchMovimientosData = async () => {
    try {
      const resp = await serverAPI.get("/cap/obtenerMovimientos");
      setMovimientos(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    event.preventDefault();
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = movimientos.map((n) => n.Email);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, Email: string) => {
    const selectedIndex = selected.indexOf(Email);
    let newSelected: readonly string[] = [];
    event.preventDefault();

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Email);
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
    () => stableSort(movimientos, getComparator(order, orderBy)),
    [order, orderBy, movimientos]
  );

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleEditSuccess = () => {
    handleCloseModal();
    fetchMovimientosData();
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
            rowCount={movimientos.length}
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
                    sx={{ paddingLeft: 4 }}
                  >
                    {row.Detalle}
                  </TableCell>
                  <TableCell align="left" sx={{ paddingLeft: 5 }}>
                    {row.Divisa}
                  </TableCell>
                  <TableCell align="center" sx={{ paddingLeft: 0 }}>
                    {formatCurrency(row.Monto, row.Divisa)}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.Fecha)}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>

                  <TableCell align="center">{row.Comentarios}</TableCell>
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
      <EditMovModal
        open={isModalOpen}
        onClose={handleCloseModal}
        movimiento={movimientoToEdit}
        onOperationChange={handleEditSuccess}
      />
    </Box>
  );
}
