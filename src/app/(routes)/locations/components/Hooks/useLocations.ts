import { toast } from "@/components/ui/use-toast";
import { LocationDistrict, LocationPost } from "@/interfaces/location";
import axios from "axios";
import { useEffect, useState } from "react";


export default function useLocations() {
    const [location, setLocation] = useState<LocationDistrict[]|null>(null);
    const getLocation = async () => {
        try {
            const {data, status} = await axios.get("/api/location")
            if (status==200) {
                setLocation(data)
            }
        } catch (error) {
            toast({
                title: "Error getting locations",
                variant: "destructive",
            });
        }
    }

    const createLocation = async (values: LocationPost) => {
        try {
            const {data, status} = await axios.post("/api/location", values)
            if (status==201) {
                getLocation()
                toast({ title: "Ruta creada!" });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getLocation()
    },[])
    return {location, getLocation, createLocation}
}

