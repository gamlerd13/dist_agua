import { toast } from "@/components/ui/use-toast";
import { ExpensePost, ExpenseTypeExpense } from "@/interfaces/expense";

import axios from "axios";
import { useEffect, useState } from "react";


export default function useExpense() {
    const [ expense, setExpense ] = useState<ExpenseTypeExpense[]|null>(null);
    const getExpense = async () => {
        try {
            const {data, status} = await axios.get("/api/expense")
            if (status==200) {
                setExpense(data)
            }
        } catch (error) {
            toast({
                title: "Error getting expenses",
                variant: "destructive",
            });
        }
    }

    const createExpense = async (values: ExpensePost) => {
        try {
            const {data, status} = await axios.post("/api/expense", values)
            if (status==201) {
                getExpense()
                toast({ title: "Gasto creado!" });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getExpense()
    },[])
    return { expense, getExpense, createExpense }
}

