import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    const districts = await db.distrito.findMany()

    return NextResponse.json(districts)
  } catch (error) {
    console.error("Error getting districts:", error)
    return NextResponse.json(
      { error: "Error getting districts" },
      { status: 500 }
    )
  }
}

interface Districts {
  districts: { name: string }[]
}
//To create many districts
export async function POST(req: Request) {
  try {
    const data: Districts = await req.json()
    const { districts } = data

    const distrito = await db.distrito.createMany({
      data: districts,
    })

    return NextResponse.json(distrito)
  } catch (error) {
    console.error("Error createing districts:", error)
    return NextResponse.json(
      { error: "Error creating districts" },
      { status: 500 }
    )
  }
}
