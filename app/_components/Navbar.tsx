import Link from "next/link"
// import { getServerSession } from "next-auth/next"
// import { options } from "../api/auth/[...nextauth]/options"

export default async function Navbar() {
    const session: any = {}//await getServerSession(options)
    console.log({ session })
    return (
        <nav className="bg-green-800 p-4" >
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {
                    session ?
                        <li><Link href="/api/auth/signout">Sign Out</Link></li>
                        :
                        <li><Link href="/api/auth/signin">Sign In</Link></li>
                }
                <li><Link href="/server">Server</Link></li>
                <li><Link href="/client">Client</Link></li>
                <li><Link href="/extra">Extra</Link></li>
            </ul>
        </nav >
    )
}
