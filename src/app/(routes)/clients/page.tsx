'use client'

import { HeaderClients } from './components/HeaderClients'
import useClients from './components/Hooks/useClients'
import { ListClients } from './components/ListClients'
import useDistricts from "../locations/Hooks/useDistricts";

export default function ClientsPage() {
  const { clients, createClient } = useClients()
  const { district } = useDistricts();

  return (
    <div>
      <HeaderClients createClient={createClient} districts={district} />
      <ListClients clients={clients} />
    </div>
  )
}
