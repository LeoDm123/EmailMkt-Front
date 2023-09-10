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
import serverAPI from "../../api/serverAPI";
import OpEditModal from "./EditOpModal";
import { NullableData } from "./DataTypes";
import { EditButton } from "./OpButtons";

interface Data {
  Detalle: string;
  Divisa: string;
  Monto: number;
  TipoCambio: number;
  MontoTotal: number;
  Fecha: string;
  Email: string;
  Comentarios: string;
  Estado: string;
}

interface ExtendedData extends Data {
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
    id: "Estado",
    numeric: false,
    disablePadding: false,
    label: "Estado",
  },
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

interface TablaOpsProps {
  showEditButton: boolean;
}

export default function TablaOps({ showEditButton }: TablaOpsProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("Fecha");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [operaciones, setOperaciones] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationToEdit, setOperationToEdit] = useState<NullableData>(null);

  const handleOpenModal = (operation: ExtendedData) => {
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
      const newSelected = operaciones.map((n) => n.Email);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, email: string) => {
    const selectedIndex = selected.indexOf(email);
    event.preventDefault();
    let newSelected: readonly string[] = [];

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

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "500px", overflow: "auto" }}>
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
                  <TableCell align="center">{row.Fecha}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>

                  <TableCell align="center">{row.Comentarios}</TableCell>
                  <TableCell align="left">{row.Estado}</TableCell>
                  <EditButton
                    visible={showEditButton}
                    handleClick={() => {
                      const extendedData: ExtendedData = {
                        ...row,
                        _id: "yourDefaultId",
                      };
                      handleOpenModal(extendedData);
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
        onOperationChange={() => {}}
      />
    </Box>
  );
}
