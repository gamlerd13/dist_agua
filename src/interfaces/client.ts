// interfaces/client.ts

export interface Client {
  id: number
  nombres: string
  apellidos: string
  fechaCumple: string
  telefono: string
  direccion: string
  distritoId: number
  modeloNegocio: string
  coordenadaX: number
  coordenadaY: number
  rutasId: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ClientPost {
  nombres: string
  apellidos: string
  fechaCumple: string
  telefono: string
  direccion: string
  distritoId: number
  modeloNegocio: string
  coordenadaX: number
  coordenadaY: number
  isActive: boolean
  rutasId: number
}

// interfaces/client.ts

export interface ClientEdit {
  id: number
  nombres: string
  apellidos: string
  fechaCumple: string
  telefono: string
  direccion: string
  distritoId: number
  modeloNegocio: string
  coordenadaX: number
  coordenadaY: number
  rutasId: number
  isActive: boolean
  updatedAt: Date
}
