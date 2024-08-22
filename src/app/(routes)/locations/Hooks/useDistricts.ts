import { toast } from "@/components/ui/use-toast";
import { District } from "@/interfaces/district";
import axios from "axios";
import { useEffect, useState } from "react";


export default function useDistricts() {
    const [district, setDistrict] = useState<District[]|null>(null);
    const getDistrict = async () => {
        try {
            const {data, status} = await axios.get("/api/district")
            if (status==200) {
                setDistrict(data)
            }
        } catch (error) {
            toast({
                title: "Error getting districts",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getDistrict()
    },[])
    return {district, getDistrict}
}