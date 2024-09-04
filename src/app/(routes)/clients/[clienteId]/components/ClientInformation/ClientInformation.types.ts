export type ClientInformationProps = {
  client: {
    id: number;
    nombres: string;
    apellidos: string;
    fechaCumple: Date | undefined;
    telefono: string;
    direccion: string;
    modeloNegocio: string;
    coordenadaX: string;
    coordenadaY: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    pedidoConcurrencia: number;
    rutaId: number;
  };
}
