import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { DashboardData } from '@/interfaces/dashboard';

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loadingD, setLoadingD] = useState<boolean>(true);

  const getDashboardData = async () => {
    try {
      const { data, status } = await axios.get('/api/dashboard');
      if (status === 200) {
        setDashboardData(data);
      }
    } catch (error) {
      toast({
        title: "Error fetching dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoadingD(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return { dashboardData, loadingD, getDashboardData };
}
