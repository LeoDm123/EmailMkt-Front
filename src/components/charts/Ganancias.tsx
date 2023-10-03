import React, { useEffect, useState } from "react";
import serverAPI from "../../api/serverAPI";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import dayjs, { Dayjs } from "dayjs";
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

interface Movimiento {
  Detalle: string;
  Monto: number;
  Balance: number;
  Fecha: string;
  Divisa: string;
}

interface Operacion {
  Detalle: string;
  Monto: number;
  MontoTotal: number;
  TipoCambio: number;
  BalanceOp: number;
  Fecha: string;
  Divisa: string;
}

export default function Ganancias() {
  const [mergedData, setMergedData] = useState<Data[]>([]);
  const [CapDolares, setCapDolares] = useState<number[]>([]);
  const [gananciaDolares, setGananciaDolares] = useState<number[]>([]);
  const [gananciaPesos, setGananciaPesos] = useState<number[]>([]);
  const [gananciaDiaria, setGananciaDiaria] = useState<number[]>([]);
  const [tipoCambio, setTipoCambio] = useState<number[]>([]);
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [options, setOptions] = useState(areaChartOptions);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2023-08-24"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const fetchCapitalData = async () => {
    try {
      const movimientosResp = await serverAPI.get("/cap/obtenerMovimientos");

      const movimientosData = transformMovimientos(movimientosResp.data);

      const capitalData = [...movimientosData];

      let CapitalDolares = 0;

      const firstDate = new Date(capitalData[0].Fecha);
      const currentDate = new Date();

      const dailyCapital = {};

      for (
        let date = new Date(firstDate);
        date <= currentDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateKey = date.toISOString().split("T")[0];

        if (!dailyCapital[dateKey]) {
          dailyCapital[dateKey] = {
            CapitalDolares: 0,
          };
        }

        capitalData.forEach((row) => {
          const rowDateKey = new Date(row.Fecha).toISOString().split("T")[0];
          if (
            dateKey === rowDateKey &&
            row.Divisa === "USD" &&
            row.Detalle === "Ingreso"
          ) {
            CapitalDolares += row.Monto;
          }
        });

        dailyCapital[dateKey].CapitalDolares = CapitalDolares;
      }

      const dailyCapitalDolares = Object.values(dailyCapital).map((balance) => {
        return balance.CapitalDolares;
      });

      setCapDolares(dailyCapitalDolares);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAndMergeData = async () => {
    try {
      const movimientosResp = await serverAPI.get("/cap/obtenerMovimientos");
      const operacionesResp = await serverAPI.get("/op/obtenerOperaciones");

      const movimientosData = transformMovimientos(movimientosResp.data);
      const operacionesData = transformOperaciones(operacionesResp.data);

      const mergedData = [...movimientosData, ...operacionesData];
      setMergedData(mergedData);

      let saldoPesos = 0;
      let saldoDolares = 0;

      const firstDate = new Date(mergedData[0].Fecha);
      const currentDate = new Date();

      console.log(firstDate);
      console.log(currentDate);

      const dailyBalances = {};

      for (
        let date = new Date(firstDate);
        date <= currentDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateKey = date.toISOString().split("T")[0];

        if (!dailyBalances[dateKey]) {
          dailyBalances[dateKey] = {
            SaldoPesos: saldoPesos,
            SaldoDolares: saldoDolares,
          };
        }

        mergedData.forEach((row) => {
          const rowDateKey = new Date(row.Fecha).toISOString().split("T")[0];
          if (dateKey === rowDateKey) {
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
          }
        });

        dailyBalances[dateKey].SaldoPesos = saldoPesos;
        dailyBalances[dateKey].SaldoDolares = saldoDolares;
      }

      const lastBalances = Object.values(dailyBalances);

      const dailyProfitsDolares = lastBalances.map((balance) => {
        return balance.SaldoDolares;
      });
      setGananciaDolares(dailyProfitsDolares);

      const dailyProfitsPesos = lastBalances.map((balance) => {
        return balance.SaldoPesos;
      });

      setGananciaPesos(dailyProfitsPesos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformMovimientos = (movimientosData: Data[]): Data[] => {
    return movimientosData.map((movimiento) => ({
      Detalle: movimiento.Detalle,
      Divisa: movimiento.Divisa,
      Monto: movimiento.Monto,
      TipoCambio: undefined,
      MontoTotal: undefined,
      Fecha: movimiento.Fecha,
      SaldoPesos: 0,
      SaldoDolares: 0,
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
      SaldoPesos: 0,
      SaldoDolares: 0,
    }));
  };

  const fetchOperationsData = async () => {
    try {
      const resp = await serverAPI.get("/op/obtenerOperaciones");
      const operaciones: Operacion[] = resp.data;

      const MovCompra = operaciones.filter(
        (compra) => compra.Detalle === "Compra"
      );

      const firstDate = new Date(MovCompra[0].Fecha);
      const currentDate = new Date();

      const lastPurchaseByDay: Record<string, Operacion> = {};

      let lastPurchase = null;

      for (
        let date = new Date(firstDate);
        date <= currentDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateKey = date.toISOString().split("T")[0];

        if (!lastPurchaseByDay[dateKey]) {
          lastPurchaseByDay[dateKey] = lastPurchase;
        }

        MovCompra.forEach((compra) => {
          const compraDate = new Date(compra.Fecha);
          const compraDayKey = new Date(compraDate).toISOString().split("T")[0];

          if (
            compraDayKey === dateKey &&
            (!lastPurchaseByDay[dateKey] ||
              compraDate > new Date(lastPurchaseByDay[dateKey].Fecha))
          ) {
            lastPurchaseByDay[dateKey] = compra;
            lastPurchase = compra;
          }
        });
      }

      const tipoCambioArray = Object.values(lastPurchaseByDay).map(
        (lastPurchase) => {
          if (lastPurchase) {
            return lastPurchase.TipoCambio;
          }
          return null;
        }
      );

      setTipoCambio(tipoCambioArray);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  useEffect(() => {
    fetchCapitalData();
    fetchOperationsData();
    fetchAndMergeData();
  }, []);

  function calcularGananciaDiaria(
    gananciaDolares,
    gananciaPesos,
    tipoCambio,
    CapDolares
  ) {
    if (
      gananciaDolares.length !== gananciaPesos.length ||
      gananciaDolares.length !== tipoCambio.length
    ) {
      throw new Error("Las matrices deben tener la misma longitud.");
    }

    const gananciaDiaria = [];

    for (let i = 0; i < gananciaDolares.length; i++) {
      const gananciaDiariaActual =
        gananciaDolares[i] + gananciaPesos[i] / tipoCambio[i] - CapDolares[i];
      gananciaDiaria.push(gananciaDiariaActual);
    }
    console.log(gananciaDiaria);
    return gananciaDiaria;
  }

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    if (
      gananciaDolares.length > 0 &&
      gananciaPesos.length > 0 &&
      tipoCambio.length > 0
    ) {
      const gananciaDiaria = calcularGananciaDiaria(
        gananciaDolares,
        gananciaPesos,
        tipoCambio,
        CapDolares
      );
      setGananciaDiaria(gananciaDiaria);
    }
  }, [gananciaDolares, gananciaPesos, tipoCambio]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
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
            text: "Ganancia Diaria",
            style: {
              color: primary,
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
      name: "Ganancia Diaria",
      type: "area",
      data: gananciaDiaria,
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
