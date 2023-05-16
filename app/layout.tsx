import 'regenerator-runtime/runtime'
import SideBar from "@/components/SideBar"
import "./globals.css"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import SessionProvider from "@/components/SessionProvider"
import Login from "@/components/Login"
import ClientProvider from "@/components/ClientProvider"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session= await getServerSession(authOptions)
  return (
    <html lang="en">
      <title>ChatGPT TypeScript</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <link rel="icon" href="/favicon.ico" />
      <body  suppressHydrationWarning={true} >
        <SessionProvider session={session}>
        {!session ? (<Login/>):(
        <div className="flex">
        {/* Sidbar */}
        <div className="bg-[#202123] max-w-xs h-screen overflow-auto md:min-w-[18rem]">
        <SideBar />
       </div>
        {/* ClientProvider -- Notification */}
        <ClientProvider /> 
       <div className="bg-[#343541] flex-1">{children}</div> 
       </div>
      )} 
       </SessionProvider>
      </body>
    </html>
  )
}
