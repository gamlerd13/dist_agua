import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteLocation() {
  const router = useRouter();

  const deleteLocation = async (locationId: number) => {
    try {
      const {data, status} = await axios.delete(`/api/location/${locationId}`);
      if (status==200) {
        toast({
          title: "Ruta eliminada",
        });
      }
      
      router.replace("/locations");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { deleteLocation };
}
