export type ClientInformationProps = {
  client: {
    id: number;
    nombres: string;
    apellidos: string;
    fechaCumple: string;
    telefono: string;
    direccion: string;
    distritoId: number;
    modeloNegocio: string;
    coordenadaX: number;
    coordenadaY: number;
    isActive: boolean;
    rutasId: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
