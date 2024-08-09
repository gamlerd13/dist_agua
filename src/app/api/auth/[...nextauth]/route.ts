import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/lib/db'
import bcrypt from 'bcrypt'

export const Options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "juanperez" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"username" | "password", string> | undefined, req): Promise<any> {
                console.log(credentials)

                const userFound = await db.user.findUnique({
                    where: {
                        username: credentials?.username
                    }
                })

                if (!userFound) throw new Error('No se encuentra el usuario')

                console.log(userFound)

                const matchPassword = await bcrypt.compare(credentials?.password ?? '', userFound.password)
                if (!matchPassword) throw new Error('Contraseña')

                return {
                    id: userFound.id,
                    username: userFound.username,
                    email: userFound.email,
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    }
};

const handler = NextAuth(Options)

export { handler as GET, handler as POST }