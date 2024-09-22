import { toast } from "@/components/ui/use-toast";

import { TypeExpense, TypeExpensePost } from "@/interfaces/typeExpense";

import axios from "axios";
import { useEffect, useState } from "react";


export default function useTypeExpense() {
    const [ typeExpense, setTypeExpense ] = useState<TypeExpense[]|null>(null);
    const getTypeExpense = async () => {
        try {
            const {data, status} = await axios.get("/api/typeExpense")
            if (status==200) {
                setTypeExpense(data)
            }
        } catch (error) {
            toast({
                title: "Error getting TypeExpense",
                variant: "destructive",
            });
        }
    }

    const createTypeExpense = async (values: TypeExpensePost) => {
        try {
            const {data, status} = await axios.post("/api/typeExpense", values)
            if (status==201) {
                getTypeExpense()
                toast({ title: "Tipo de gasto creado!" });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getTypeExpense()
    },[])
    return {typeExpense, getTypeExpense, createTypeExpense}
}

