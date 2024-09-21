import { toast } from "@/components/ui/use-toast";
import { SaleDetailGet } from "@/interfaces/saleDetail";

import axios from "axios";
import { useEffect, useState } from "react";


export default function useSaleDetail() {
    const [ saleDetail, setSaleDetail ] = useState<SaleDetailGet[]|null>(null);
    const getSaleDetail = async () => {
        try {
            const {data, status} = await axios.get("/api/saleDetail")
            if (status==200) {
                setSaleDetail(data)
            }
        } catch (error) {
            toast({
                title: "Error getting saleDetails",
                variant: "destructive",
            });
        }
    }
    useEffect(() => {
      getSaleDetail()
  },[])
  return { saleDetail, getSaleDetail }
}
