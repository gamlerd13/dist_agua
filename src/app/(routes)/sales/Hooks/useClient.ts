import { toast } from "@/components/ui/use-toast";
import { GetClient } from "@/interfaces/client";

import axios from "axios";
import { useEffect, useState } from "react";


export default function useClient() {
    const [client, setClient] = useState<GetClient[] | null>(null);
    const getClient = async () => {
        try {
            const { data, status } = await axios.get("/api/client")
            if (status == 200) {
                setClient(data)
            }
        } catch (error) {
            toast({
                title: "Error getting client",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getClient()
    }, [])
    return { client, getClient }
}