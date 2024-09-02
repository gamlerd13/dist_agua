import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteExpense() {
  const router = useRouter();

  const deleteExpense = async (expenseId: number) => {
    try {
      const {data, status} = await axios.delete(`/api/expense/${expenseId}`);
      if (status==200) {
        toast({
          title: "Gasto eliminado",
        });
      }
      
      router.replace("/expenses");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { deleteExpense };
}
