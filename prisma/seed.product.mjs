import { Decimal } from 'decimal.js';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const products = [
  {
    name: "Agua Mineral",
    litros: "1.5L",
    isReturnable: true,
    botlePrice: 1.50,  // Puedes usar un número, o una librería como Decimal.js para manejar decimales
    contentPrice: 0.80,
  },
  {
    name: "Refresco de Naranja",
    litros: "2L",
    isReturnable: false,
    botlePrice: 2.00,
    contentPrice: 1.00,
  },
  {
    name: "Jugo de Manzana",
    litros: "1L",
    isReturnable: false,
    botlePrice: 1.75,
    contentPrice: 1.20,
  },
  {
    name: "Agua Purificada",
    litros: "5L",
    isReturnable: true,
    botlePrice: 3.00,
    contentPrice: 2.00,
  },
  {
    name: "Té Frío",
    litros: "1.5L",
    isReturnable: false,
    botlePrice: 2.50,
    contentPrice: 1.50,
  }
];



async function main() {
  console.log("Creating productos ...")

  try {

    const existProduct = await prisma.product.count()
    if(existProduct>0) return console.log("This is a firts time proccess, do not execute in a exist data")

    const productsCreated = await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    })

  console.log({productsCreated} )

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
