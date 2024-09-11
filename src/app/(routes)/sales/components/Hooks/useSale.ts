import { toast } from "@/components/ui/use-toast";
import { SaleClient, SalePost } from "@/interfaces/sale";

import axios from "axios";
import { useEffect, useState } from "react";


export default function useSale() {
    const [ sale, setSale ] = useState<SaleClient[]|null>(null);
    const getSale = async () => {
        try {
            const {data, status} = await axios.get("/api/sale")
            if (status==200) {
                setSale(data)
            }
        } catch (error) {
            toast({
                title: "Error getting sales",
                variant: "destructive",
            });
        }
    }

    const createSale = async (values: SalePost) => {
        try {
            const {data, status} = await axios.post("/api/sale", values)
            if (status==201) {
                getSale()
                toast({ title: "Venta creada!" });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getSale()
    },[])
    return { sale, getSale, createSale }
}

