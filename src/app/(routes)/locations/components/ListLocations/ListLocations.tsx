"use client";

import { DataTable } from "./data-table"
import { columns } from "./columns"
import { LocationDistrict } from "@/interfaces/location";


export function ListLocations({location}: {location: LocationDistrict[]|null}) {

    if (!location) return <DataTable columns={columns} data={[]} />

    return (
        <DataTable columns={columns} data={location} />
    )
}
