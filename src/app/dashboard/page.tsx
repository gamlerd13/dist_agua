"use client"
import { signOut } from 'next-auth/react'
import { Options } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

function DashboardPage() {

    //const session = await getServerSession(Options)
    //console.log(session)

    return (
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <div>
                <h1 className="text-5xl">Dashboard</h1>
                <button className="bg-black text-white px-4 py-2 rounded-md mt-4"
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </div>
        </section>
    )
}
export default DashboardPage