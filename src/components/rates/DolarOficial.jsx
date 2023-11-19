import { useState, useEffect } from "react";

function DolarOficial() {
  const [dolarData, setDolarData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://dolarapi.com/v1/dolares/oficial";
      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setDolarData(data); // Almacena los datos en el estado
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Llama a la función fetchData cuando el componente se monta
  }, []); // El segundo argumento [] asegura que solo se ejecute una vez cuando el componente se monta

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
