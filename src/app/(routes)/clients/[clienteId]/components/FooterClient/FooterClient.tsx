'use client'

import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FooterClientProps } from './FooterClient.types'
import { useDeleteClient } from './Hooks/useFooterClient'

export function FooterClient(props: FooterClientProps) {
  const { clientId } = props
  const { deleteClient } = useDeleteClient()

  return (
    <div className="flex justify-end mt-5">
      <Button variant="destructive" onClick={() => deleteClient(clientId)}>
        <Trash className="h-4 w-4 mr-2" />
        Eliminar cliente
      </Button>
    </div>
  )
}
