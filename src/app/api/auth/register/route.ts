import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import db from "@/lib/db"


export async function POST(request: Request) {
    try {
        const data = await request.json()
        const userFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (userFound) {
            return NextResponse.json({
                message: 'correo ya registrado'
            }, {
                status: 400
            })
        }

        const usernameFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (usernameFound) {
            return NextResponse.json({
                message: 'usuario ya registrado'
            }, {
                status: 400
            })
        }


        const hashedPass = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPass,
                typeUser: data.typeUser
            }
        })

        const { password: _, ...user } = newUser

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            {
                message: (error as Error).message
            },
            {
                status: 500
            }
        )
    }
}