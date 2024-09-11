import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteSale() {
  const router = useRouter();

  const deleteSale = async (saleId: number) => {
    try {
      const {data, status} = await axios.delete(`/api/sale/${saleId}`);
      if (status==200) {
        toast({
          title: "Venta eliminada",
        });
      }
      
      router.replace("/sales");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { deleteSale };
}
