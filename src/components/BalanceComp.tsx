import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import serverAPI from "../api/serverAPI";

interface Data {
  Detalle: string;
  Divisa: string;
  Monto: number;
  Fecha: string;
  TipoCambio?: number;
  MontoTotal?: number;
  SaldoPesos: number;
  SaldoDolares: number;
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
    id: "SaldoPesos",
    numeric: false,
    disablePadding: false,
    label: "Saldo Pesos",
  },
  {
    id: "SaldoDolares",
    numeric: false,
    disablePadding: false,
    label: "Saldo Dolares",
  },
];

const cellWidths = {
  Detalle: "5%",
  Divisa: "10%",
  Monto: "15%",
  TipoCambio: "15%",
  MontoTotal: "10%",
  Fecha: "20%",
  SaldoPesos: "15%",
  SaldoDolares: "15%",
};

function EnhancedTableHead() {
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
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function BalanceComp() {
  const [mergedData, setMergedData] = useState<Data[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses son base 0, por eso se suma 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        const movimientosResp = await serverAPI.get("/cap/obtenerMovimientos");
        const operacionesResp = await serverAPI.get("/op/obtenerOperaciones");

        const movimientosData = transformMovimientos(movimientosResp.data);
        const operacionesData = transformOperaciones(operacionesResp.data);

        const mergedData: Data[] = [...movimientosData, ...operacionesData];

        let saldoPesos = 0;
        let saldoDolares = 0;

        mergedData.sort(
          (a, b) => new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime()
        );

        mergedData.forEach((row) => {
          if (row.Divisa === "USD") {
            if (row.Detalle === "Compra") {
              saldoDolares += row.Monto;
              saldoPesos -= row.MontoTotal || 0;
            } else if (row.Detalle === "Venta") {
              saldoDolares -= row.Monto;
              saldoPesos += row.MontoTotal || 0;
            } else if (
              row.Detalle === "Ingreso" ||
              row.Detalle === "Prestamo"
            ) {
              saldoDolares += row.Monto;
            } else if (
              row.Detalle === "Retiro" ||
              row.Detalle === "Devolucion"
            ) {
              saldoDolares += row.Monto;
            }
          } else if (row.Divisa === "ARS") {
            if (row.Detalle === "Compra") {
              saldoPesos -= row.MontoTotal || 0;
            } else if (row.Detalle === "Venta") {
              saldoPesos += row.MontoTotal || 0;
            } else if (
              row.Detalle === "Ingreso" ||
              row.Detalle === "Prestamo"
            ) {
              saldoPesos += row.Monto;
            } else if (
              row.Detalle === "Retiro" ||
              row.Detalle === "Devolucion"
            ) {
              saldoPesos += row.Monto;
            }
          }

          row.SaldoPesos = saldoPesos;
          row.SaldoDolares = saldoDolares;
        });

        setMergedData(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndMergeData();
  }, []);

  const transformMovimientos = (movimientosData: Data[]): Data[] => {
    return movimientosData.map((movimiento) => ({
      Detalle: movimiento.Detalle,
      Divisa: movimiento.Divisa,
      Monto: movimiento.Monto,
      TipoCambio: undefined,
      MontoTotal: undefined,
      Fecha: movimiento.Fecha,
      SaldoPesos: 0, // Initialize to 0
      SaldoDolares: 0, // Initialize to 0
    }));
  };

  const transformOperaciones = (operacionesData: Data[]): Data[] => {
    return operacionesData.map((operacion) => ({
      Detalle: operacion.Detalle,
      Divisa: operacion.Divisa,
      Monto: operacion.Monto,
      TipoCambio: operacion.TipoCambio,
      MontoTotal: operacion.MontoTotal,
      Fecha: operacion.Fecha,
      SaldoPesos: 0, // Initialize to 0
      SaldoDolares: 0, // Initialize to 0
    }));
  };

  const visibleRows = mergedData;

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
          <EnhancedTableHead />
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover sx={{ cursor: "pointer" }} key={row.Detalle}>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    align="center"
                  >
                    {row.Detalle}
                  </TableCell>
                  <TableCell align="center">{row.Divisa}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.Monto, row.Divisa)}
                  </TableCell>
                  <TableCell align="center">
                    {row.TipoCambio !== undefined
                      ? formatCurrency(row.TipoCambio, "ARS")
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    {row.MontoTotal !== undefined
                      ? formatCurrency(row.MontoTotal, "ARS")
                      : ""}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.Fecha)}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.SaldoPesos, "ARS")}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.SaldoDolares, "USD")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
