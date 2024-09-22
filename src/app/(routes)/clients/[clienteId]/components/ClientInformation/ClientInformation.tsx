import { ClientForm } from "../ClientForm"
import { ClientMap } from "../ClientMap"
import { ClientInformationProps } from "./ClientInformation.types"
import { MapPinned } from "lucide-react"

export function ClientInformation(props: ClientInformationProps) {
  const { client } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 mt-2 gap-y-4">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <ClientForm client={client} />
      </div>
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2">
            <MapPinned className="w-5 h-5" />
            Mapa del cliente
          </div>
        </div>
        <ClientMap client={client} />
      </div>
    </div>
  )
}
