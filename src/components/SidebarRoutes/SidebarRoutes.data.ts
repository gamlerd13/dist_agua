import {
    BarChart4,
    Building2,
    PanelsTopLeft,
    Settings,
    CircleHelpIcon,
    HandCoins,
    MapPinned,
    PackageSearch,
    CircleDollarSign,
} from 'lucide-react'

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Inicio",
        href: "/"
    },
    {
        icon: Building2,
        label: "Clientes",
        href: "/clients"
    },
    {
        icon: MapPinned,
        label: "Rutas",
        href: "/locations"
    },
    {
        icon: PackageSearch,
        label: "Productos",
        href: "/products"
    },
    {
        icon: HandCoins,
        label: "Ventas",
        href: "/sales"
    },
]

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Sobre nosotros",
        href: "/about"
    },
    {
        icon: BarChart4,
        label: "Reportes",
        href: "/reportes"
    },
]

export const dataSupportSidebar = [
    {
        icon: Settings,
        label: "Configuración",
        href: "/configuracion"
    },
]

export const dataSidebarExpenses = [
    {
        title: "Gastos",
        icon: CircleDollarSign,
        children : [
            {
                label: "Tipo de gasto",
                href: "/typeExpense",
            },
            {
                label: "Gastos",
                href: "/expenses",
            },
        ]
    }
]