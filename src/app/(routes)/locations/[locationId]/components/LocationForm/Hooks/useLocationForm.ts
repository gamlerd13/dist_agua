import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

import { formSchema } from "./LocationForm.form";
import useDistricts from "../../../../Hooks/useDistricts";
import { Location } from "@/interfaces/location";

export function useLocationForm(location: Location) {
  const router = useRouter();
  const { district: districts } = useDistricts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: location.name,
      distritoId: location.distritoId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/location/${location.id}`, values);
      toast({
        title: "Ruta actualizada!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit, districts };
}
