'use client'

import { HeaderClients } from './components/HeaderClients'
import useClients from './components/Hooks/useClients'
import { ListClients } from './components/ListClients'
import useLocations from '../locations/components/Hooks/useLocations'

export default function ClientsPage() {
  const { clients, createClient } = useClients()
  const { location } = useLocations()

  return (
    <div>
      <HeaderClients createClient={createClient} locations={location} />
      <ListClients clients={clients} />
    </div>
  )
}
