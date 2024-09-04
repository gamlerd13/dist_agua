-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'carrier', 'assistant');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "typeUser" "UserType" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distrito" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rutas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "distritoId" INTEGER NOT NULL,

    CONSTRAINT "Rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "litros" TEXT NOT NULL,
    "isReturnable" BOOLEAN NOT NULL,
    "botlePrice" DECIMAL(65,30) NOT NULL,
    "contentPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaCumple" TIMESTAMP(3) NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "modeloNegocio" TEXT NOT NULL,
    "coordenadaX" DECIMAL(65,30) NOT NULL,
    "coordenadaY" DECIMAL(65,30) NOT NULL,
    "rutaId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pedidoConcurrencia" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visita" (
    "id" SERIAL NOT NULL,
    "fechaVisita" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visita_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Rutas" ADD CONSTRAINT "Rutas_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "Distrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "Rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
