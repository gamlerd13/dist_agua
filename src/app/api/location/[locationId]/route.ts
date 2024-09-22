import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params } : { params: {locationId: string}}
) {
    try {
        const locationId = parseInt(params.locationId);
        const values = await req.json()

        const updatedData = {
            ...values,
            distritoId: Number(values.distritoId),
          };

        const location = await db.rutas.update({
            where: {
                id: locationId,
            },
            data: updatedData,
        })

        return NextResponse.json(location)
    } catch (error) {
        console.log("[LOCATION ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, {params}: {params: {locationId: string}}) {
    try {
        const locationId = parseInt(params.locationId);

        const deletedLocation = await db.rutas.delete({
            where: {
                id: locationId,
            }
        })

        return NextResponse.json(deletedLocation);
    } catch (error) {
        console.log("[DELETE LOCATION ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}