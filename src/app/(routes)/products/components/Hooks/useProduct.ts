import { toast } from "@/components/ui/use-toast";
import { Product, ProductPost } from "@/interfaces/product";
import axios from "axios";
import { useEffect, useState } from "react";


export default function useProducts() {
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

    const createProduct = async (values: ProductPost) => {
        try {
            const {data, status} = await axios.post("/api/product", values)
            if (status==201) {
                getProduct()
                toast({ title: "Producto creado!" });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        getProduct()
    },[])
    return {product, getProduct, createProduct}
}

