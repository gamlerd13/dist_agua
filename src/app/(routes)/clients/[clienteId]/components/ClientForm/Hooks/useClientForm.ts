import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import useLocation from "@/app/(routes)/locations/components/Hooks/useLocations"
import { formSchema } from "./ClientForm.form";
import { ClientEdit } from "@/interfaces/client";

export function useClientForm(client: ClientEdit) {

  const router = useRouter();
  const { location: locations } = useLocation();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: client.nombres,
      apellidos: client.apellidos,
      telefono: client.telefono,
      direccion: client.direccion,
      fechaCumple: client.fechaCumple,
      coordenadaX: client.coordenadaX,
      coordenadaY: client.coordenadaY,
      modeloNegocio: client.modeloNegocio,
      isActive: client.isActive,
      rutaId: client.rutaId,
      pedidoConcurrencia: client.pedidoConcurrencia,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/client/${client.id}`, {
        ...values,
        fechaCumple: new Date(values.fechaCumple),
        coordenadaX: values.coordenadaX,
        coordenadaY: values.coordenadaY,
      });
      toast({
        title: "Cliente actualizado!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit, locations };
}
