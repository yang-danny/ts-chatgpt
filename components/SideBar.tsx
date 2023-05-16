'use client'
import { collection, orderBy, query } from "firebase/firestore";
import NewChat from "./NewChat"
import { useSession,signOut } from "next-auth/react"
import { db } from "@/firebase";
import {useCollection} from "react-firebase-hooks/firestore"
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  const {data:session} = useSession();
  const [chats, loading, error]=useCollection(
    session && query(collection(db,"users",session?.user?.email!,"chats",),
    orderBy("createdAt","asc")
  )
  )
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/'  })
  }
  return (
    <div className="p-2 flex flex-col h-screen ">
        <div className="flex-1 ">
        <div><NewChat />
        <div className="hidden sm:inline">
          <ModelSelection />
        </div>
        <div className="flex flex-col space-y-2 my-2">
          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
            </div>
          )}
        </div>
        {chats?.docs.map(chat=>(
          <ChatRow key={chat.id} id={chat.id} />
        ))}
         </div>       
        </div>
        {session && (
          <>
          <div className="flex rounded-md justify-between items-center p-2 hover:bg-[#343541]">
          <img src={session.user?.image!} alt={session.user?.name!} 
          className="h-8 w-8 rounded-md cursor-pointer hover: opacity-50" />
          <p className="text-white hidden md:inline-flex truncate">{session.user?.name}</p>
          <button onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="w-6 h-6 text-gray-400 hover:text-white hover:animate-pulse hover:scale-110" />
          </button>
          </div>
          </>
        )}
    </div>
  )
}

export default SideBar