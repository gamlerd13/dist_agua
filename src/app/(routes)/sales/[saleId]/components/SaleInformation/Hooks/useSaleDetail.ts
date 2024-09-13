import { useEffect, useState } from "react";
import axios from "axios";
import { SaleDetailPost, SaleDetailSale } from "@/interfaces/saleDetail";
import { toast } from "@/components/ui/use-toast";

export default function useSaleDetail(saleId: number) {
  const [saleDetail, setSaleDetail] = useState<SaleDetailSale[] | null>(null);

    const getSaleDetail = async () => {
        try {
            const { data, status } = await axios.get(`/api/sale/details?saleId=${saleId}`);
            if (status === 200) {
                setSaleDetail(data);
            }
        } catch (error) {
            toast({
                title: "Error getting salesDetail",
                variant: "destructive",
            });
        }
    };

    const createSaleDetail = async (values: SaleDetailPost) => {
        try {
            const {data, status} = await axios.post("/api/saleDetail", values)
            if (status==201) {
                getSaleDetail()
                toast({ title: "Producto agregado!" });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    };

  useEffect(() => {
    if (saleId) {
      getSaleDetail();
    }
  }, [saleId]);

  return { saleDetail, getSaleDetail, createSaleDetail };
}

