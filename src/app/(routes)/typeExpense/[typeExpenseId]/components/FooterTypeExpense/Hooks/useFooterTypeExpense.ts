import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteTypeExpense() {
  const router = useRouter();

  const deleteTypeExpense = async (typeExpenseId: number) => {
    try {
      const {data, status} = await axios.delete(`/api/typeExpense/${typeExpenseId}`);
      if (status==200) {
        toast({
          title: "Tipo de gasto eliminado",
        });
      }
      
      router.replace("/typeExpense");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { deleteTypeExpense };
}
