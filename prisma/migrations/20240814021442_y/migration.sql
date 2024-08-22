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

-- AddForeignKey
ALTER TABLE "Rutas" ADD CONSTRAINT "Rutas_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "Distrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
