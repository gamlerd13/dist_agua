"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { FormCreateLocation } from "../FormCreateLocation";

import { LocationPost } from "@/interfaces/location";
import { District } from "@/interfaces/district";

export function HeaderLocations({
  createLocation,
  districts,
}: {
  createLocation: (values: LocationPost) => void;
  districts: District[] | null;
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de rutas</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Crear Ruta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear Ruta</DialogTitle>
            <DialogDescription>Crear y configurar su ruta</DialogDescription>
          </DialogHeader>

          <FormCreateLocation
            createLocation={createLocation}
            setOpenModalCreate={setOpenModalCreate}
            districts={districts}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
