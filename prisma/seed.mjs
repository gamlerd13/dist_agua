import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

//Exute just only time

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    typeUser: "admin",
    password: "admin",
  },
  {
    username: "conductor",
    email: "conductor@example.com",
    typeUser: "carrier",
    password: "conductor",
  },
  {
    username: "asistente",
    email: "asistente@example.com",
    typeUser: "assistant",
    password: "asistente",
  },
]

const districts = [
  {
    name: "TAMBOGRANDE", //1
  },
  {
    name: "PIURA", //2
  },
  {
    name: "SULLANA", //3
  },
  {
    name: "PAITA", //4
  },
  {
    name: "LA UNION", //5
  },
  {
    name: "CHAPAIRA", //6
  },
]

const rutas = [
  {
    name: "CLAVELES",
    distritoId: 2,
  },
  {
    name: "VILLA JARDIN",
    distritoId: 2,
  },
  {
    name: "LA MOLINA 1 2",
    distritoId: 2,
  },
  {
    name: "LAS DALIAS",
    distritoId: 2,
  },
  {
    name: "ANGELES 2",
    distritoId: 2,
  },
  {
    name: "SANTA MARGARITA 2",
    distritoId: 2,
  },
  {
    name: "LA RINCONADA",
    distritoId: 2,
  },
  {
    name: "NUEVO AMANCENER",
    distritoId: 2,
  },
  {
    name: "ALGARROBOS",
    distritoId: 1,
  },
  {
    name: "INDIO",
    distritoId: 2,
  },
  {
    name: "PAITA",
    distritoId: 4,
  },
]

async function main() {
  // const listUsers = await Promise.all(
  //   users.map(async (user) => ({
  //     ...user,
  //     password: await bcrypt.hash(user.password, 10)
  //   }))
  // )

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  })

  await prisma.distrito.createMany({
    data: districts,
    skipDuplicates: true,
  })

  await prisma.rutas.createMany({
    data: rutas,
    skipDuplicates: true,
  })
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
