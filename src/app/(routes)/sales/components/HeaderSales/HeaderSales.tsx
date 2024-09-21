import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { FormCreateSale } from "../FormCreateSale"
import { SalePost } from "@/interfaces/sale"
import { GetClient } from "@/interfaces/client"
import { FileSpreadsheet } from "lucide-react"
import { exportSalesDetails } from "./utils/exportSalesDetails"
import { FormExportSale } from "../FormExportSale"
import { FormExportSaleDetail } from "../FormExportSaleDetail"

export function HeaderSales({
  createSale,
  client,
  sale,
  saleDetail,
}: {
  createSale: (values: SalePost) => void
  client: GetClient[] | null
  sale: any[] | null
  saleDetail: any[] | null
}) {
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [openModalExportSale, setOpenModalExportSale] = useState(false)
  const [openModalExportSaleDetail, setOpenModalExportSaleDetail] =
    useState(false)

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl">Lista de ventas</h2>
      <div className="flex items-center space-x-2">
        <Dialog
          open={openModalExportSaleDetail}
          onOpenChange={setOpenModalExportSaleDetail}
        >
          <DialogTrigger asChild>
            <Button>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar detalles de ventas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Exportar Detalles de Ventas</DialogTitle>
              <DialogDescription>
                Filtrar y exportar sus detalles de ventas
              </DialogDescription>
            </DialogHeader>
            <FormExportSaleDetail
              saleDetail={saleDetail}
              client={client}
              setOpenModalExportSaleDetail={setOpenModalExportSaleDetail}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openModalExportSale}
          onOpenChange={setOpenModalExportSale}
        >
          <DialogTrigger asChild>
            <Button>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Exportar ventas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Exportar Ventas</DialogTitle>
              <DialogDescription>
                Filtrar y exportar sus ventas
              </DialogDescription>
            </DialogHeader>
            <FormExportSale
              sale={sale}
              client={client}
              setOpenModalExportSale={setOpenModalExportSale}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
          <DialogTrigger asChild>
            <Button>Crear Venta</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Crear Venta</DialogTitle>
              <DialogDescription>Crear y configurar su venta</DialogDescription>
            </DialogHeader>
            <FormCreateSale
              createSale={createSale}
              setOpenModalCreate={setOpenModalCreate}
              client={client}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
