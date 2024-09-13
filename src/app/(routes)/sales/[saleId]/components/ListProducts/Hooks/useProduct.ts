"use client"

import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function useDeleteProduct(getSaleDetail: () => Promise<void>) {
  const deleteProduct = async (saleDetailId: number) => {
    try {
      const { data, status } = await axios.delete(`/api/saleDetail/${saleDetailId}`);
      if (status === 200) {
        toast({
          title: "Producto eliminado",
        });
        await getSaleDetail();
      }
    } catch (error) {
      toast({
        title: "Algo salió mal",
        variant: "destructive",
      });
    }
  };

  return { deleteProduct };
}