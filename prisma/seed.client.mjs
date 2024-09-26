import { Decimal } from 'decimal.js';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const clientes = [
  {
    nombres: 'Juan',
    apellidos: 'Pérez',
    fechaCumple: new Date('1985-05-12'),
    telefono: '555-1234',
    direccion: 'Calle Falsa 123',
    modeloNegocio: 'Retail',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 4
  },
  {
    nombres: 'María',
    apellidos: 'García',
    fechaCumple: new Date('1990-08-22'),
    telefono: '555-5678',
    direccion: 'Av. Siempre Viva 742',
    modeloNegocio: 'Servicios',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 2

  },
  {
    nombres: 'Carlos',
    apellidos: 'López',
    fechaCumple: new Date('1979-12-18'),
    telefono: '555-9012',
    direccion: 'Av. Principal 456',
    modeloNegocio: 'Consultoría',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 4

  },
  {
    nombres: 'Ana',
    apellidos: 'Martínez',
    fechaCumple: new Date('1988-03-30'),
    telefono: '555-3456',
    direccion: 'Jr. Las Flores 789',
    modeloNegocio: 'Manufactura',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 10
  },
  {
    nombres: 'Luis',
    apellidos: 'Rodríguez',
    fechaCumple: new Date('1981-07-14'),
    telefono: '555-6789',
    direccion: 'Pasaje Los Olivos 101',
    modeloNegocio: 'Distribución',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 4
  },
  {
    nombres: 'Sofía',
    apellidos: 'Ramos',
    fechaCumple: new Date('1993-11-09'),
    telefono: '555-3452',
    direccion: 'Calle Los Pinos 202',
    modeloNegocio: 'Educación',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 8
  },
  {
    nombres: 'Miguel',
    apellidos: 'Gómez',
    fechaCumple: new Date('1984-09-25'),
    telefono: '555-0987',
    direccion: 'Av. El Sol 303',
    modeloNegocio: 'Tecnología',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 5
  },
  {
    nombres: 'Lucía',
    apellidos: 'Torres',
    fechaCumple: new Date('1975-02-02'),
    telefono: '555-2134',
    direccion: 'Jr. El Porvenir 404',
    modeloNegocio: 'Restaurantes',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 6
  },
  {
    nombres: 'Ricardo',
    apellidos: 'Flores',
    fechaCumple: new Date('1995-01-17'),
    telefono: '555-4567',
    direccion: 'Pasaje Las Palmeras 505',
    modeloNegocio: 'Logística',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 7

  },
  {
    nombres: 'Elena',
    apellidos: 'Vega',
    fechaCumple: new Date('1992-06-05'),
    telefono: '555-7890',
    direccion: 'Av. Los Laureles 606',
    modeloNegocio: 'Finanzas',
    coordenadaX: new Decimal(-12.0453),
    coordenadaY: new Decimal(-77.0311),
    rutaId: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    pedidoConcurrencia: 10

  },
];



async function main() {
  console.log("Creating clientes ...")

  try {
    const clientsCreated = await prisma.cliente.createMany({
      data: clientes,
      skipDuplicates: true,
    })

  console.log({clientsCreated} )

  } catch (error) {
  console.log("Hubo un error,", error)
  }


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
