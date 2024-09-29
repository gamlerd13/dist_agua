'use client'

import { ExpenseSummary } from "./components/ExpenseSummary"
import { ListPendingSales } from "./components/ListPendingSales"
import { KPIIndicator } from "./components/KPIIndicator"
import useDashboard from "./components/Hooks/useDashboard"
import { useState, useEffect } from "react"


export default function Home() {

  const { dashboardData, loadingD } = useDashboard()
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (!loadingD) {
      const timer = setTimeout(() => setShowSpinner(false), 700);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(true);
    }
  }, [loadingD]);
  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl">Inicio</h1>
      </header>

      <main className="flex-grow p-6 overflow-auto">
        {showSpinner && (
          <div
            className={`${loadingD ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-700 ease-in-out flex items-center justify-center absolute inset-0`}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          </div>
        )}

        <div
          className={`${loadingD ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            } transition-all duration-700 ease-in-out`}
        >
          {!loadingD && (
            <>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <ExpenseSummary
                  expensesPerCategory={dashboardData?.gastosPorCategoria}
                />
                <KPIIndicator
                  activeClients={dashboardData?.clientesActivos}
                  pendingSales={dashboardData?.pedidosPendientes}
                  totalExpenses={dashboardData?.gastoTotalDelMes}
                />
              </div>
              <ListPendingSales ventasPendientes={dashboardData?.ventasPendientes} />
            </>
          )}
        </div>


      </main>
    </div>
  )
}