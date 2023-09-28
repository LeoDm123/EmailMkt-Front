import { useState, useEffect } from "react";

type DolarData = {
  compra: number;
  venta: number;
};

function DolarOficial() {
  const [dolarData, setDolarData] = useState<DolarData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://dolarapi.com/v1/dolares/oficial";
      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data: DolarData = await response.json();
        setDolarData(data); // Store the data in the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The second argument [] ensures it only runs once when the component mounts

  return (
    <div className="d-flex align-items-center w-100 ">
      {dolarData ? (
        <div className="ms-2 w-100">
          <div className="d-flex">
            <div className="me-2 ms-5 fw-bold">
              <p>Precio del Dólar Oficial: </p>
            </div>
            <div>
              <p>Compra: ARS {dolarData.compra}</p>
            </div>
            <div className="ms-3">
              <p>Venta: ARS {dolarData.venta}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default DolarOficial;
