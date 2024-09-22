import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import useClient from "../../../../Hooks/useClient"
import { Sale } from "@/interfaces/sale";
import { formSchema } from "./SaleForm.form";

export function useSaleForm(sale: Sale) {
  const router = useRouter();
  const { client: clients } = useClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: sale.clientId,
      saleDate: sale.saleDate,
      totalRevenue: parseFloat(sale.totalRevenue).toString(),
      status: sale.status,
      paymentMethod: sale.paymentMethod,
      notes: sale.notes,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/sale/${sale.id}`, values);
      toast({
        title: "Venta actualizada!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit, clients };
}
