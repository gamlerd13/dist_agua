import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

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
  console.log("Creating data ...")

  try {

    const existData = await prisma.user.count()
    if(existData>0) return console.log("This is a firts time proccess, do not execute in a exist data")

    const usersHashPassword = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    )
    const userCreated = await prisma.user.createMany({
      data: usersHashPassword,
      skipDuplicates: true,
    })
    const distritosCreated = await prisma.distrito.createMany({
      data: districts,
      skipDuplicates: true,
    })
    const rutasCreated =await prisma.rutas.createMany({
      data: rutas,
      skipDuplicates: true,
    })

  console.log({userCreated}, {distritosCreated} ,{rutasCreated})

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
