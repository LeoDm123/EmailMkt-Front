import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import serverAPI from "../../api/serverAPI";

const Capital = () => {
  const [currencies, setCurrencies] = useState({
    Dolares: 0,
    Euros: 0,
    Pesos: 0,
  });
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const resp = await serverAPI.get("/cap/obtenerDivisas"); // Assuming you're using a GET request here

      setCurrencies(resp.data); // Assuming the response contains Dolares, Euros, and Pesos properties
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

  return (
    <Grid container>
      <div className=" w-100">
        <div className="currencies mt-3 justify-content-between">
          <h3>Dolares:</h3>
          <h3 className="ms-2">{formatCurrency(currencies.Dolares, "USD")}</h3>
        </div>
        <div className="currencies mt-3 justify-content-between">
          <h3>Euros:</h3>
          <h3 className="ms-2">{formatCurrency(currencies.Euros, "EUR")}</h3>
        </div>
        <div className="currencies mt-3 justify-content-between">
          <h3>Pesos:</h3>
          <h3 className="ms-2">{formatCurrency(currencies.Pesos, "ARS")}</h3>
        </div>

        {fetchError && <p>{fetchError}</p>}
      </div>
    </Grid>
  );
};

export default Capital;
