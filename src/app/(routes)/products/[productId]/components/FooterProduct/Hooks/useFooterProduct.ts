import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteProduct() {
  const router = useRouter();

  const deleteProduct = async (productId: number) => {
    try {
      const {data, status} = await axios.delete(`/api/product/${productId}`);
      if (status==200) {
        toast({
          title: "Producto eliminado",
        });
      }
      
      router.replace("/products");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { deleteProduct };
}
