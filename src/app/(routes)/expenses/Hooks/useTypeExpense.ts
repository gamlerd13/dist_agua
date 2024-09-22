import { toast } from "@/components/ui/use-toast";
import { TypeExpense } from "@/interfaces/typeExpense";

import axios from "axios";
import { useEffect, useState } from "react";


export default function useTypeExpense() {
    const [typeExpense, setTypeExpense] = useState<TypeExpense[]|null>(null);
    const getTypeExpense = async () => {
        try {
            const {data, status} = await axios.get("/api/typeExpense")
            if (status==200) {
                setTypeExpense(data)
            }
        } catch (error) {
            toast({
                title: "Error getting typeExpense",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getTypeExpense()
    },[])
    return {typeExpense, getTypeExpense}
}