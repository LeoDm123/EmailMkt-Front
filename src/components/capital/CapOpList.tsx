import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import serverAPI from "../../api/serverAPI";

interface CapitalProps {
  operationStatus: () => void;
}

const CapitalOp = ({ operationStatus }: CapitalProps) => {
  const [currencies, setCurrencies] = useState({
    Dolares: 0,
    Euros: 0,
    Pesos: 0,
  });
  const [fetchError, setFetchError] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado

  const fetchCurrencyData = async () => {
    try {
      const resp = await serverAPI.get("/cap/obtenerDivisasOps");
      setCurrencies(resp.data);
      setDataLoaded(true); // Marcar que los datos se han cargado correctamente
    } catch (error) {
      console.error("Error fetching currency data:", error);
      setFetchError("An error occurred while fetching currency data.");
    }
  };

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    fetchCurrencyData();
  }, [operationStatus]);

  return (
    <Grid container>
      <div className="w-100">
        {dataLoaded ? (
          <>
            <div className="currencies mt-3 justify-content-between">
              <h3>Dolares:</h3>
              <h3 className="ms-2">
                {formatCurrency(currencies.Dolares, "USD")}
              </h3>
            </div>
            <div className="currencies mt-3 justify-content-between">
              <h3>Euros:</h3>
              <h3 className="ms-2">
                {formatCurrency(currencies.Euros, "EUR")}
              </h3>
            </div>
            <div className="currencies mt-3 justify-content-between">
              <h3>Pesos:</h3>
              <h3 className="ms-2">
                {formatCurrency(currencies.Pesos, "ARS")}
              </h3>
            </div>
          </>
        ) : (
          <>
            <Skeleton animation="wave" height={60} width="100%">
              <div className="currencies mt-3 justify-content-between">
                <h3>Dolares:</h3>
                <h3 className="ms-2">Cargando...</h3>
              </div>
            </Skeleton>
            <Skeleton animation="wave" height={60} width="100%">
              <div className="currencies mt-3 justify-content-between">
                <h3>Euros:</h3>
                <h3 className="ms-2">Cargando...</h3>
              </div>
            </Skeleton>
            <Skeleton animation="wave" height={60} width="100%">
              <div className="currencies mt-3 justify-content-between">
                <h3>Pesos:</h3>
                <h3 className="ms-2">Cargando...</h3>
              </div>
            </Skeleton>
          </>
        )}
        {fetchError && <p>{fetchError}</p>}
      </div>
    </Grid>
  );
};

export default CapitalOp;
