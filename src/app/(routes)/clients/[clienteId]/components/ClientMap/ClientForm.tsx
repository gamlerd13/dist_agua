"use client"
import { useEffect, useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useClientForm } from "./Hooks/useClientForm"
import { ClientEdit } from "@/interfaces/client"
import MapWithNoSSR from "./components/MapNoSSR"
import { useWatch } from "react-hook-form"

export function ClientMap({ client }: { client: ClientEdit }) {
  const { form, onSubmit } = useClientForm(client)

  const [lat, setLat] = useState<number>(
    parseFloat(client.coordenadaY) || -5.1958333
  )
  const [lng, setLng] = useState<number>(
    parseFloat(client.coordenadaX) || -80.63333333333334
  )
  const [address, setAddress] = useState<string>("")

  const coordenadaX = useWatch({
    control: form.control,
    name: "coordenadaX",
  });
  const coordenadaY = useWatch({
    control: form.control,
    name: "coordenadaY",
  });

  useEffect(() => {
    const parsedX = parseFloat(coordenadaX);
    const parsedY = parseFloat(coordenadaY);
    if (!isNaN(parsedX)) setLng(parsedX);
    if (!isNaN(parsedY)) setLat(parsedY);
  }, [coordenadaX, coordenadaY, form]);

  const handleMapClick = (newLat: number, newLng: number) => {
    setLat(newLat)
    setLng(newLng)
    form.setValue("coordenadaX", newLng.toString())
    form.setValue("coordenadaY", newLat.toString())
  }

  const handleAddressSearch = async () => {
    if (address) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        )
        const data = await response.json()
        if (data && data.length > 0) {
          const { lat: newLat, lon: newLng } = data[0]
          setLat(parseFloat(newLat))
          setLng(parseFloat(newLng))
          form.setValue("coordenadaX", newLng.toString())
          form.setValue("coordenadaY", newLat.toString())
        }
      } catch (error) {
        console.error("Error fetching location", error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="grid grid-cols-1 gap-3">
          <FormLabel>Buscar Dirección</FormLabel>
          <div className="flex space-x-3">
            <Input
              placeholder="Escriba una dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button type="button" onClick={handleAddressSearch}>
              Buscar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="coordenadaX"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordenada X (Longitud)</FormLabel>
                <FormControl>
                  <Input placeholder="Coordenada X" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coordenadaY"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordenada Y (Latitud)</FormLabel>
                <FormControl>
                  <Input placeholder="Coordenada Y" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <MapWithNoSSR
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            onMapClick={handleMapClick}
          />
        </div>
        <Button type="submit">Actualizar coordenadas</Button>
      </form>
    </Form>
  )
}
