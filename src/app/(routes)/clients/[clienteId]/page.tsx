import db from '@/lib/db'
import { redirect } from 'next/navigation'

import { Header } from './components/Header'
import { ClientInformation } from './components/ClientInformation'
import { FooterClient } from './components/FooterClient/FooterClient'

export default async function ClientIdPage({
  params,
}: {
  params: { clienteId: string }
}) {
  console.log("cliente:", params.clienteId)
  const client = await db.cliente.findUnique({
    where: {
      id: parseInt(params.clienteId),
    },
  })
  if (!client) {
    return redirect('/')
  }

  const clientForClient = {
    ...client,
    createdAt: new Date(client.createdAt),
    updatedAt: new Date(client.updatedAt),
    coordenadaX: client.coordenadaX.toString(),
    coordenadaY: client.coordenadaY.toString(),
  }

  return (
    <div>
      <Header />
      <ClientInformation client={clientForClient} />
      <FooterClient clientId={client.id} />
    </div>
  )
}
