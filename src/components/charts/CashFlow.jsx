import { useEffect, useState } from "react";
import serverAPI from "../../api/serverAPI";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../css/App.css";

const areaChartOptions = {
  grid: {
    strokeDashArray: 0,
  },
};

export default function CashFlow() {
  const [mergedData, setMergedData] = useState([]);
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [options, setOptions] = useState(areaChartOptions);
  const [startDate, setStartDate] = React.useState(dayjs("2023-08-24"));
  const [endDate, setEndDate] = React.useState(dayjs());

  const transformMovimientos = (movimientosData) => {
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

  const transformOperaciones = (operacionesData) => {
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

  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        const movimientosResp = await serverAPI.get("/cap/obtenerMovimientos");
        const operacionesResp = await serverAPI.get("/op/obtenerOperaciones");

        const movimientosData = transformMovimientos(movimientosResp.data);
        const operacionesData = transformOperaciones(operacionesResp.data);
        const mergedData = [...movimientosData, ...operacionesData];

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

        const filteredData = mergedData.filter((row) => {
          const rowDate = dayjs(row.Fecha);
          return (
            rowDate.isSame(startDate, "day") || rowDate.isBefore(endDate, "day")
          );
        });

        setMergedData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndMergeData();
  }, [startDate, endDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      xaxis: {
        categories: mergedData.map((row) => formatDate(row.Fecha)),
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: 20,
      },
      yaxis: [
        {
          labels: {
            style: {
              colors: [secondary],
            },
          },
          title: {
            text: "Saldo Pesos",
            style: {
              color: primary,
            },
          },
        },
        {
          opposite: true,
          labels: {
            style: {
              colors: [secondary],
            },
          },
          title: {
            text: "Saldo Dólares",
            style: {
              color: [secondary],
            },
          },
        },
      ],
      grid: {
        ...prevState.grid,
        borderColor: line,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [primary, secondary, line, theme, mergedData]);

  const series = [
    {
      name: "Saldo Pesos",
      type: "area",
      data: mergedData.map((row) => row.SaldoPesos),
      fillOpacity: 0,
    },
    {
      name: "Saldo Dólares",
      type: "area",
      data: mergedData.map((row) => row.SaldoDolares),
      yAxisIndex: 1,
      fillOpacity: 0,
    },
  ];

  return (
    <div className="mt-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            label="Fecha Inicial"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="Fecha Final"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <ReactApexChart
        options={options}
        series={series}
        height={430}
        className="transparent-area"
      />
    </div>
  );
}
