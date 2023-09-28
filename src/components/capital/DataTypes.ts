interface Data {
  _id: string;
  Detalle: string;
  Divisa: string;
  Monto: number;
  Fecha: string;
  Email: string;
  Comentarios: string;
}

export type NullableData = Data | null;
