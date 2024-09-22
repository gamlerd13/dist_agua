"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FooterLocationsProps } from "./FooterLocation.types";
import { useDeleteLocation } from "./Hooks/useFooterLocation";

export function FooterLocation(props: FooterLocationsProps) {
  const { locationId } = props;
  const { deleteLocation } = useDeleteLocation();

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={() => deleteLocation(locationId)}>
        <Trash className="h-4 w-4 mr-2" />
        Eliminar ruta
      </Button>
    </div>
  );
}
