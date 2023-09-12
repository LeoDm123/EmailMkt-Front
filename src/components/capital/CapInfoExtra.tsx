import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import serverAPI from "../../api/serverAPI";

interface CapitalProps {
  operationStatus: () => void;
}

interface Movimiento {
  Detalle: string;
  Monto: number;
  Balance: number;
  Fecha: string;
}

interface Operacion {
  Detalle: string;
  Monto: number;
  MontoTotal: number;
  TipoCambio: number;
  BalanceOp: number;
  Fecha: string;
}

const InfoExtraCap = ({ operationStatus }: CapitalProps) => {
  const [, setFechaInicio] = useState<Date | null>(null);
  const [, setFechaFin] = useState<Date | null>(null);
  const [diasLaborales, setDiasLaborales] = useState<number>(0);
  const [prestamos, setPrestamos] = useState<number>(0);
  const [ganancia, setGanancia] = useState<number>(0);
  const [capitalInicial, setCapitalIncial] = useState<number>(0);
  const [porcMensual, setPorcMensual] = useState<number>(0);
  const [fetchError, setFetchError] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado
  //const [promTC, setPromTC] = useState<number>(0);
  const [tipoCambio, setTipoCambio] = useState<number>(0);
  const [GananciaTotal, setGananciaTotal] = useState<number>(0);
  const [GananciaDiaria, setGananciaDiaria] = useState<number>(0);
  const [currency, setCurrency] = useState({
    Dolares: 0,
    Euros: 0,
    Pesos: 0,
  });

  const fetchCapitalData = async () => {
    try {
      const resp = await serverAPI.get("/cap/obtenerMovimientos");
      const movimientos: Movimiento[] = resp.data;

      const prestamoMovimientos = movimientos.filter(
        (prestamo) => prestamo.Detalle === "Prestamo"
      );

      const devolucionesMovimientos = movimientos.filter(
        (devolucion) => devolucion.Detalle === "Devolucion"
      );

      const totalPrestamos = prestamoMovimientos.reduce(
        (total, prestamo) => total + prestamo.Monto,
        0
      );

      const totalDevoluciones = devolucionesMovimientos.reduce(
        (total, devolucion) => total + devolucion.Monto,
        0
      );

      const Balance = totalPrestamos + totalDevoluciones;

      setPrestamos(Balance);

      const MovIngreso = movimientos.filter(
        (ingreso) => ingreso.Detalle === "Ingreso"
      );

      const capInicial = MovIngreso.reduce(
        (primer: Movimiento | null, ingreso) => {
          if (!primer || new Date(ingreso.Fecha) > new Date(primer.Fecha)) {
            return ingreso;
          }
          return primer;
        },
        null
      );

      if (capInicial) {
        setCapitalIncial(capInicial.Monto);
      } else {
        console.log("Capital incial igual a 0");
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
      setFetchError("An error occurred while fetching currency data.");
    }
  };

  function contarDiasLaborables(fechaInicio: Date, fechaFin: Date): number {
    let count = 0;
    const currentDate = new Date(fechaInicio);

    while (currentDate <= fechaFin) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  }

  const fetchOperationsData = async () => {
    try {
      const resp = await serverAPI.get("/op/obtenerOperaciones");
      const operaciones: Operacion[] = resp.data;

      let fechaInicio: Date | null = new Date();
      let fechaFin: Date | null = new Date();

      operaciones.forEach((operacion) => {
        const fechaString = operacion.Fecha;
        const fecha = new Date(fechaString);

        if (!fechaInicio || fecha < fechaInicio) {
          fechaInicio = fecha;
        }

        if (!fechaFin || fecha > fechaFin) {
          fechaFin = fecha;
        }
      });

      setFechaInicio(fechaInicio);
      setFechaFin(fechaFin);

      const diasLaborales = contarDiasLaborables(fechaInicio, fechaFin);

      setDiasLaborales(diasLaborales);

      const MovCompra = operaciones.filter(
        (compra) => compra.Detalle === "Compra"
      );

      const totalCompraUSD = MovCompra.reduce(
        (total, compra) => total + compra.MontoTotal / compra.TipoCambio,
        0
      );

      const MovVenta = operaciones.filter((venta) => venta.Detalle === "Venta");

      const totalVentaUSD = MovVenta.reduce(
        (total, venta) => total + venta.Monto,
        0
      );

      const BalanceOp = totalCompraUSD - totalVentaUSD;

      setGanancia(BalanceOp);

      const ultimaCompra = MovCompra.reduce(
        (ultima: Operacion | null, compra) => {
          if (!ultima || new Date(compra.Fecha) > new Date(ultima.Fecha)) {
            return compra;
          }
          return ultima;
        },
        null
      );

      if (ultimaCompra) {
        setTipoCambio(ultimaCompra.TipoCambio);
      } else {
        console.log("tipo de cambio igual a 0");
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
      setFetchError("An error occurred while fetching currency data.");
    }
  };

  const fetchCurrencyData = async () => {
    try {
      const resp = await serverAPI.get("/cap/obtenerDivisas");
      const capital = resp.data;

      setCurrency(capital);
    } catch (error) {
      console.error("Error fetching currency data:", error);
      setFetchError("An error occurred while fetching currency data.");
    }
  };

  useEffect(() => {
    const ValuedPesos = currency.Pesos / tipoCambio;

    const GananciaTotal = ganancia + ValuedPesos;
    setGananciaTotal(GananciaTotal); //

    const GananciaDiaria =
      diasLaborales > 0 ? GananciaTotal / diasLaborales : 0;
    setGananciaDiaria(GananciaDiaria);

    const PorcentualMensual =
      (GananciaTotal / capitalInicial / diasLaborales) * 20;
    setPorcMensual(PorcentualMensual);
  }, [tipoCambio, currency.Pesos, ganancia, diasLaborales, capitalInicial]);

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchCapitalData(),
          fetchOperationsData(),
          fetchCurrencyData(),
        ]);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [operationStatus]);

  return (
    <Grid container>
      {dataLoaded ? (
        <div className="w-100">
          <div className="currencies mt-3 justify-content-between">
            <h4>Deuda Prestamos:</h4>
            <h4 className="ms-2">{formatCurrency(prestamos, "ARS")}</h4>
          </div>
          <div className="currencies mt-2 justify-content-between">
            <h4>Ganancia:</h4>
            <h4 className="ms-2">{formatCurrency(GananciaTotal, "USD")}</h4>
          </div>
          <div className="currencies mt-2 justify-content-between">
            <h4>Ganancia Diaria:</h4>
            <h4 className="ms-2">{formatCurrency(GananciaDiaria, "USD")}</h4>
          </div>
          <div className="currencies mt-2 justify-content-between">
            <h4>Ganancia Mensual (%):</h4>
            <h4 className="ms-2">
              {porcMensual.toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 2,
              })}
            </h4>
          </div>
          {fetchError && <p>{fetchError}</p>}
        </div>
      ) : (
        <div className="w-100">
          <Skeleton animation="wave" height={60} width="100%">
            <div className="currencies mt-3 justify-content-between">
              <h4>Deuda Prestamos:</h4>
              <h4 className="ms-2">Cargando...</h4>
            </div>
          </Skeleton>
          <Skeleton animation="wave" height={60} width="100%">
            <div className="currencies mt-3 justify-content-between">
              <h4>Ganancia:</h4>
              <h4 className="ms-2">Cargando...</h4>
            </div>
          </Skeleton>
          <Skeleton animation="wave" height={60} width="100%">
            <div className="currencies mt-3 justify-content-between">
              <h4>Ganancia Diaria:</h4>
              <h4 className="ms-2">Cargando...</h4>
            </div>
          </Skeleton>
          <Skeleton animation="wave" height={60} width="100%">
            <div className="currencies mt-3 justify-content-between">
              <h4>Ganancia Mensual (%):</h4>
              <h4 className="ms-2">Cargando...</h4>
            </div>
          </Skeleton>
          {fetchError && <p>{fetchError}</p>}
        </div>
      )}
    </Grid>
  );
};

export default InfoExtraCap;
