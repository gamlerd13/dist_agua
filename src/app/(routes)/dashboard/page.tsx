"use client"
import { Options } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

function DashboardPage() {

    //const session = await getServerSession(Options)
    //console.log(session)

    return (
       <div>dasboard</div>
    )
}
export default DashboardPage