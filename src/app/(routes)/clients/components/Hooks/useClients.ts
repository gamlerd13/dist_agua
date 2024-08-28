import { toast } from "@/components/ui/use-toast";
import { Client, ClientPost } from "@/interfaces/client";
import axios from "axios";
import { useEffect, useState } from "react";


export default function useClients() {
  const [clients, setClients] = useState<Client[] | null>(null);
  const getClients = async () => {
    try {
      const { data, status } = await axios.get("/api/client")
      if (status == 200) {
        setClients(data)
      }
    } catch (error) {
      toast({
        title: "Error obteniendo clientes",
        variant: "destructive",
      });
    }
  }

  const createClient = async (values: ClientPost) => {
    try {
      const { data, status } = await axios.post("/api/client", values)
      if (status == 201) {
        getClients()
        toast({ title: "Cliente creado!" });
      }
    } catch (error) {
      toast({
        title: "Algo salió mal",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getClients()
  }, [])
  return { clients, getClients, createClient }
}
