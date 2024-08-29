import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteClient() {
  const router = useRouter();

  const deleteClient = async (clientId: number) => {
    try {
      const { data, status } = await axios.delete(`/api/client/${clientId}`);
      if (status === 200) {
        toast({
          title: "Cliente eliminado",
        });
      }
      router.replace("/clients");
    } catch (error) {
      toast({
        title: "Algo salió mal",
        variant: "destructive",
      });
    }
  };

  return { deleteClient };
}
