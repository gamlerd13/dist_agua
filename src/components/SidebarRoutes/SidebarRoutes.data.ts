import {
    BarChart4,
    Building2,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar,
    MapPinned,
    PackageSearch,
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
        href: "/clientes"
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
        icon: Calendar,
        label: "Calendario",
        href: "/calendario"
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
    {
        icon: ShieldCheck,
        label: "Lo que sea xd",
        href: "/xd"
    },
]