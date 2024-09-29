interface ClientBase {
  nombres?: string
  apellidos?: string
  fechaCumple?: Date | undefined
  telefono?: string
  direccion?: string
  modeloNegocio?: string
  isActive?: boolean
  pedidoConcurrencia?: number
  rutaId?: number
}

export interface Client extends ClientBase {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface ClientPost extends ClientBase { }

export interface ClientEdit extends ClientBase {
  id: number
  coordenadaX: string
  coordenadaY: string
  updatedAt: Date
}

export interface ClientMain {
  id?: number,
  nombres: string,
  apellidos: string,
  fechaCumple: Date,
  telefono: string,
  direccion: string,
  modeloNegocio: string,
  coordenadaX: string,
  coordenadaY: string,
  rutaId: number,
  ruta: string,
  distrito: string,
  pedidoConcurrencia: number,
  isActive: boolean,
}

export type GetClient = Required<ClientMain>
