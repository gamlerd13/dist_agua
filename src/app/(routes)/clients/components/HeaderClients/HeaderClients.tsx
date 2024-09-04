'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormCreateClient } from '../FormCreateClient'
import { ClientPost } from '@/interfaces/client'
import { LocationDistrict } from '@/interfaces/location'
import { useState } from 'react'

export function HeaderClients({
  createClient,
  locations,
}: {
  createClient: (values: ClientPost) => void
  locations: LocationDistrict[] | null
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de clientes</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Crear Cliente</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Crear cliente</DialogTitle>
            <DialogDescription>
              Ingrese la información necesaria para crear el cliente.
            </DialogDescription>
          </DialogHeader>
          <FormCreateClient
            createClient={createClient}
            setOpenModalCreate={setOpenModalCreate}
            locations={locations}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
