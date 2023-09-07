interface Data {
  _id: string;
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

export type NullableData = Data | null;
