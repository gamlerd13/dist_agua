import { ClientForm } from '../ClientForm'
import { ClientInformationProps } from './ClientInformation.types'

export function ClientInformation(props: ClientInformationProps) {
  const { client } = props
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 mt-2">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <ClientForm client={client} />
      </div>
    </div>
  )
}
