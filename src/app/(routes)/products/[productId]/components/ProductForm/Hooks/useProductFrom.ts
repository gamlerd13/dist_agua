import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

import { formSchema } from "./ProductForm.form";
import { Product, ProductEdit } from "@/interfaces/product";

export function useProductForm(product: ProductEdit) {
  console.log(product)
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      litros: product.litros,
      isReturnable: product.isReturnable,
      botlePrice: parseFloat(product.botlePrice).toString(),
      contentPrice: parseFloat(product.contentPrice).toString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/product/${product.id}`, values);
      toast({
        title: "Producto actualizado!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit };
}
