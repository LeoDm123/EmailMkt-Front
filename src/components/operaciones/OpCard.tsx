import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import serverAPI from "../../api/serverAPI";
import { OpCancelButton, OpOkButton } from "./OpButtons";
import swal from "sweetalert";

interface Operation {
  _id: string;
  Detalle: string;
  Divisa: string;
  Monto: number;
  TipoCambio: number;
  Estado: string;
}

interface OpCardProps {
  onOperationChange: () => void;
}

const OpCard = ({ onOperationChange }: OpCardProps) => {
  const [operaciones, setOperaciones] = useState<Operation[]>([]);

  const fetchOperacionesData = async () => {
    try {
      const resp = await serverAPI.get("/op/obtenerOperaciones");
      setOperaciones(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const AcceptOp = async (
    _id: string,
    Detalle: string,
    Divisa: string,
    Monto: number,
    MontoTotal: number
  ) => {
    try {
      const resp = await serverAPI.post("/op/AcceptOp", {
        Detalle,
        Divisa,
        Monto,
        MontoTotal,
        _id,
      });

      console.log(_id);
      console.log(resp);
      SwAlertOk();
      onOperationChange();
    } catch (error) {
      console.log(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Exito!",
      text: "Operación Acceptada",
      icon: "success",
    });
  };

  const CancelOp = async (
    _id: string,
    Detalle: string,
    Divisa: string,
    Monto: number,
    MontoTotal: number
  ) => {
    try {
      const cancelResp = await serverAPI.post("/op/CancelOp", {
        Detalle,
        Divisa,
        Monto,
        MontoTotal,
        _id,
      });

      console.log(cancelResp.data);
      console.log(_id);

      if (cancelResp.data.message === "Operation canceled successfully") {
        const deleteResp = await serverAPI.delete(`/op/DeleteOp/${_id}`);

        console.log(deleteResp);
      } else {
        console.log("Cancel operation failed.");
      }
      onOperationChange();
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertCancel = (
    _id: string,
    Detalle: string,
    Divisa: string,
    Monto: number,
    MontoTotal: number
  ) => {
    swal({
      title: "¿Desea cancelar la operación?",
      text: "Una vez cancelada, esta se borrará y no podrá ser recuperada",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Operación cancelada con éxito!", {
          icon: "success",
        });
        CancelOp(_id, Detalle, Divisa, Monto, MontoTotal);
      }
    });
  };

  useEffect(() => {
    fetchOperacionesData();
  }, [AcceptOp, CancelOp]);

  return (
    <div className="mt-2" style={{ height: 150 }}>
      {operaciones.map((operacion, index) => {
        const MontoTotal = operacion.TipoCambio * operacion.Monto;

        if (
          operacion.Estado === "Realizada" ||
          operacion.Estado === "Cancelada"
        ) {
          return null;
        }

        return (
          <Card key={index} sx={{ backgroundColor: "#fafafa", marginTop: 1 }}>
            <CardContent>
              <div className="d-flex">
                <div className="w-75 me-5">
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  ></Typography>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                        {operacion.Detalle}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {formatCurrency(operacion.Monto, operacion.Divisa)}
                      </Typography>
                    </div>
                  </div>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Tipo de Cambio: ARS {operacion.TipoCambio}
                  </Typography>
                  <Typography color="text.secondary">
                    Monto total de la opreación:{" "}
                    {formatCurrency(MontoTotal, "ARS")}
                  </Typography>
                </div>
                <div className="w-25">
                  <div className="align-items-center">
                    <div className="mt-3">
                      <OpOkButton
                        handleClick={() =>
                          AcceptOp(
                            operacion._id,
                            operacion.Detalle,
                            operacion.Divisa,
                            operacion.Monto,
                            MontoTotal
                          )
                        }
                      />
                    </div>
                    <div className="mt-2">
                      <OpCancelButton
                        handleClick={() =>
                          SwAlertCancel(
                            operacion._id,
                            operacion.Detalle,
                            operacion.Divisa,
                            operacion.Monto,
                            MontoTotal
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OpCard;
