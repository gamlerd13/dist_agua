import { toast } from "@/components/ui/use-toast";
import { Product } from "@/interfaces/product";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useProduct() {
    const [ product, setProduct ] = useState<Product[]|null>(null);
    const getProduct = async () => {
        try {
            const {data, status} = await axios.get("/api/product")
            if (status==200) {
                setProduct(data)
            }
        } catch (error) {
            toast({
                title: "Error getting products",
                variant: "destructive",
            });
        }
    }
    useEffect(() => {
      getProduct()
  },[])
  return {product, getProduct}
}